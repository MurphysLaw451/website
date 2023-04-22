import { ethers } from "ethers";
import { Controller__factory } from "../../types/factories/Controller__factory";
import { Controller } from "../../types/Controller";
import { Vault__factory } from "../../types";

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
        const tokenAddress = await vault.allAssets(index);
        const balance = await vault.balanceOf(tokenAddress);
        return { tokenAddress, balance }
    }))

    return tokenInfo;
};

/**
 * Get token information and balance of all vaults
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
            acc[val.tokenAddress] = 0;
        }

        acc[val.tokenAddress] += val.balance;
        return acc;
    })

    return vaultData;
};

/**
 * Return statistics necessary to render the liquidity backing stats page
 * 
 * @param provider 
 */
export const getStats = async (provider: ethers.Provider) => {
    const controller = Controller__factory.connect(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS, provider);
    const counts = await controller.counts();

    const [vaultData] = await Promise.all([
        getVaultsData(provider, controller, Number(counts.countVaults)),
    ]);

    console.log(vaultData)
}