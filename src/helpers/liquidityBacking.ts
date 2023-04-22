import { ethers } from "ethers";
import { Controller__factory } from "../../types/factories/Controller__factory";
import { Controller } from "../../types/Controller";
import { Vault__factory } from "../../types/factories/Vault__factory";
import { Erc20, Erc20__factory } from "../../types";

const getWantTokenData = async (provider: ethers.Provider, controller: Controller, index: number) => {
    const address = await controller.allWantTokens(index);

    const token = Erc20__factory.connect(address, provider);
    const [decimals, info] = await Promise.all([
        token.decimals(),
        controller.wantTokens(address),
    ])
    return { info, address, decimals }
}

const getWanttokens = async (provider: ethers.Provider, controller: Controller, wantTokenCount: number) => {
    const indices = Array.from(Array(wantTokenCount).keys());
    const wantTokenData = (await Promise.all(indices.map(async (index) => {
        const data = await getWantTokenData(provider, controller, index)
        console.log(data)
        return data
    }))).filter(token => token.info.enabled)

    return wantTokenData;
}

/**
 * Get token information and balance of every token in a vault
 * 
 * @param provider 
 * @param controller 
 * @param vaultIndex 
 * @returns Array of { tokenAddress, balance } for every token in the vault
 */
const getVaultData = async (provider: ethers.Provider, controller: Controller, vaultIndex: number) => {
    // Get vault
    const vaultAddress = await controller.allVaults(vaultIndex);
    const vault = Vault__factory.connect(vaultAddress, provider);

    // Get token info and amount of tokens in the vault
    const amountOfTokensInVault = vault.countAssets;
    const tokensIndices = Array.from(Array(amountOfTokensInVault).keys());
    const tokenInfo = await Promise.all(tokensIndices.map(async (index) => {
        const tokenAddress: string = await vault.allAssets(index);
        const balance: bigint = await vault.balanceOf(tokenAddress);
        return { tokenAddress, balance }
    }))

    return tokenInfo;
};

/**
 * Get token information and balance of all vaults. When vaults have overlapping tokens,
 * sum them up and return the aggregate
 * 
 * @param provider 
 * @param controller 
 * @param vaultCount 
 * @returns 
 */
const getVaultsData = async (provider: ethers.Provider, controller: Controller, vaultCount: number) => {
    const vaultsIndices = Array.from(Array(vaultCount).keys());
    const vaultData = (await Promise.all(vaultsIndices.map(async (index) => {
        return getVaultData(provider, controller, index)
    }))).flat().reduce((acc, val) => {
        if (!acc[val.tokenAddress]) {
            acc[val.tokenAddress] = 0n;
        }

        acc[val.tokenAddress] += val.balance;
        return acc;
    }, {} as Record<string, bigint>)

    // Now add the vault name for all tokens
    const vaultDataIncNames = await Promise.all(Object.entries(vaultData).map(async (tokenInfo) => {
        const token = Erc20__factory.connect(tokenInfo[0], provider);
        const [name, decimals] = await Promise.all([
            token.name(),
            token.decimals(),
        ])

        return {
            tokenAddress: tokenInfo[0],
            balance: tokenInfo[1],
            name,
            decimals,
        }
    }))

    return vaultDataIncNames;
};

/**
 * Return statistics necessary to render the liquidity backing stats page
 * 
 * @param provider 
 */
export const getStats = async (provider: ethers.Provider) => {
    const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, provider);
    const counts = await controller.counts();

    const [vaultData, wantTokenData] = await Promise.all([
        getVaultsData(provider, controller, Number(counts.countVaults)),
        getWanttokens(provider, controller, Number(counts.countWantTokens)),
    ]);

    console.log(wantTokenData)

    return { vaultData, wantTokenData }
}

export const getTotalValue = async (provider: ethers.Provider, wantToken: string) => {
    const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, provider);
    return controller.getTotalValue(wantToken);
}

export const getBackingPerDGNX = async (provider: ethers.Provider, wantToken: string) => {
    const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, provider);
    return controller.getValueOfTokensForOneBaseToken(wantToken);
}
