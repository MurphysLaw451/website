import { BigNumber, ethers } from "ethers";
import { Erc20__factory } from "../../types";
import { Controller } from "../../types/Controller";
import { Controller__factory } from "../../types/factories/Controller__factory";
import { Vault__factory } from "../../types/factories/Vault__factory";

const getWantTokenData = async (provider: ethers.providers.Provider, controller: Controller, index: number) => {
    const address = await controller.allWantTokens(index);

    const token = Erc20__factory.connect(address, provider);
    const [decimals, info] = await Promise.all([
        token.decimals(),
        controller.wantTokens(address),
    ])
    return { info, address, decimals }
}

const getWantTokens = async (provider: ethers.providers.Provider, controller: Controller, wantTokenCount: number) => {
    const indices = Array.from(Array(wantTokenCount).keys());
    const wantTokenData = (await Promise.all(indices.map(async (index) => {
        const data = await getWantTokenData(provider, controller, index)
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
const getVaultData = async (provider: ethers.providers.Provider, controller: Controller, vaultIndex: number) => {
    // Get vault
    const vaultAddress = await controller.allVaults(vaultIndex);
    const vault = Vault__factory.connect(vaultAddress, provider);

    // Get token info and amount of tokens in the vault
    const amountOfTokensInVault: BigNumber = await vault.countAssets();
    const tokensIndices = Array.from(Array(amountOfTokensInVault.toNumber()).keys());
    const tokenInfo = await Promise.all(tokensIndices.map(async (index) => {
        const tokenAddress: string = await vault.allAssets(index);
        const balance: BigNumber = await vault.balanceOf(tokenAddress);
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
const getVaultsData = async (provider: ethers.providers.Provider, controller: Controller, vaultCount: number) => {
    const vaultsIndices = Array.from(Array(vaultCount).keys());
    const vaultData = (await Promise.all(vaultsIndices.map(async (index) => {
        const data = await getVaultData(provider, controller, index);
        return data;
    }))).flat().reduce((acc, val) => {
        if (!acc[val.tokenAddress]) {
            acc[val.tokenAddress] = 0n;
        }

        acc[val.tokenAddress] += val.balance.toBigInt();
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
export const getStats = async (provider: ethers.providers.Provider) => {
    const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, provider);
    const counts = await controller.counts();

    const supply = await controller.totalSupplyBaseToken()

    const [vaultData, wantTokenData] = await Promise.all([
        getVaultsData(provider, controller, Number(counts.countVaults)),
        getWantTokens(provider, controller, Number(counts.countWantTokens)),
    ]);

    return { vaultData, wantTokenData }
}

export const getTotalValue = async (provider: ethers.providers.Provider, wantToken: string) => {
    const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, provider);
    return controller.getTotalValue(wantToken);
}

export const getBackingPerDGNX = async (provider: ethers.providers.Provider, wantToken: string) => {
    const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, provider);
    return controller.getValueOfTokensForOneBaseToken(wantToken);
}

export const getBackingForAddress = async (provider: ethers.providers.Provider, wantToken: string, amount: BigNumber) => {
    const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, provider);
    return controller.getValueOfTokensForBaseToken(wantToken, amount)
}

export const getBaseTokenBalance = async (provider: ethers.providers.Provider, address: string) => {
    const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, provider);
    const tokenAddress = await controller.baseToken();
    const token = Erc20__factory.connect(tokenAddress, provider);

    const [balance, decimals] = await Promise.all([
        token.balanceOf(address),
        token.decimals(),
    ])

    return { balance, decimals }
}

export const getExpectedWantTokensByBurningBaseTokens = async (provider: ethers.providers.Provider, wantToken: string, amount: BigNumber) => {
    const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, provider);
    const expectedOutput = await controller.getValueOfTokensForBaseToken(wantToken, amount)
    return expectedOutput
}

export const approveBaseToken = async (signer: ethers.Signer, amountToApprove: BigNumber) => {
    try {
        const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, signer);
        const tokenAddress = await controller.baseToken();
        const token = Erc20__factory.connect(tokenAddress, signer);
        const result = await token.approve(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS!, amountToApprove)
        await result.wait()
        // Wait another sec just to be sure
        await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (e) {
        console.log('error',e)
    }

    return true;
}

export const getControllerAllowance = async (provider: ethers.providers.Provider, address: string) => {
    const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, provider);
    const tokenAddress = await controller.baseToken();
    const token = Erc20__factory.connect(tokenAddress, provider);
    return token.allowance(address, process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS!);
}

export const burnForBacking = async (signer: ethers.Signer, wantToken: string, amountToBurn: BigNumber, minimumOutputAmount: BigNumber, makeStaticCall?: boolean) => {
    try {
        const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, signer);
        if (makeStaticCall) {
            const result = await controller.callStatic.payout(wantToken, amountToBurn, minimumOutputAmount);
            return result;
        } else {
            const result = await controller.payout(wantToken, amountToBurn, minimumOutputAmount);
            await result.wait();
            return result.hash;
        }
        
    } catch (e) {
        console.log('error',e)
    }
}
