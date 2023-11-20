import { BigNumber } from 'ethers'
import { Address, WalletClient } from 'wagmi'
import {
  readControllerContract,
  readTokenContract,
  readVaultContract,
  simulateControllerContract,
  writeControllerContract,
  writeTokenContract,
} from './contracts'
import { debounce } from './debounce'

const getWantTokenData = async (
  walletClient: WalletClient,
  index: number
): Promise<{ info: any; address: Address; decimals: any }> => {
  const address: Address = (await readControllerContract({
    functionName: 'allWantTokens',
    args: [index],
    account: walletClient.account,
  })) as Address

  const [decimals, info] = await Promise.all([
    await readTokenContract({
      address,
      functionName: 'decimals',
    }),
    await readControllerContract({
      functionName: 'wantTokens',
      args: [address],
    }),
  ])
  return { info, address, decimals }
}

const getWantTokens = async (
  walletClient: WalletClient,
  wantTokenCount: number
) => {
  const indices = Array.from(Array(wantTokenCount).keys())
  const wantTokenData = (
    await Promise.all(
      indices.map(async (index) => {
        const data = await getWantTokenData(walletClient, index)
        return data
      })
    )
  ).filter((token) => token.info[1])
  return wantTokenData
}

/**
 * Get token information and balance of every token in a vault
 *
 * @param provider
 * @param controller
 * @param vaultIndex
 * @returns Array of { tokenAddress, balance } for every token in the vault
 */
const getVaultData = async (walletClient: WalletClient, vaultIndex: number) => {
  // Get vault
  const address = (await readControllerContract({
    functionName: 'allVaults',
    args: [vaultIndex],
    account: walletClient.account,
  })) as Address

  const amountOfTokensInVault = (await readVaultContract({
    address,
    functionName: 'countAssets',
  })) as bigint

  const tokensIndices = Array.from(
    Array(parseInt(amountOfTokensInVault.toString())).keys()
  )

  const tokenInfo = await Promise.all(
    tokensIndices.map(async (index) => {
      const tokenAddress = (await readVaultContract({
        address,
        functionName: 'allAssets',
        args: [index],
      })) as string
      const balance = (await readVaultContract({
        address,
        functionName: 'balanceOf',
        args: [tokenAddress],
      })) as bigint
      return { tokenAddress, balance }
    })
  )

  return tokenInfo
}

/**
 * Get token information and balance of all vaults. When vaults have overlapping tokens,
 * sum them up and return the aggregate
 *
 * @param provider
 * @param controller
 * @param vaultCount
 * @returns
 */
const getVaultsData = async (
  walletClient: WalletClient,
  vaultCount: number
) => {
  const vaultsIndices = Array.from(Array(vaultCount).keys())

  const vaultData = (
    await Promise.all(
      vaultsIndices.map(async (index) => {
        const data = await getVaultData(walletClient, index)
        return data
      })
    )
  )
    .flat()
    .reduce((acc, val) => {
      if (!acc[val.tokenAddress]) {
        acc[val.tokenAddress] = 0n
      }

      acc[val.tokenAddress] += val.balance
      return acc
    }, {} as Record<string, bigint>)

  // Now add the vault name for all tokens
  const vaultDataIncNames = await Promise.all(
    Object.entries(vaultData).map(async (tokenInfo) => {
      const [name, decimals] = await Promise.all([
        await readTokenContract({
          address: tokenInfo[0] as Address,
          functionName: 'name',
        }),
        await readTokenContract({
          address: tokenInfo[0] as Address,
          functionName: 'decimals',
        }),
      ])
      return {
        tokenAddress: tokenInfo[0],
        balance: tokenInfo[1],
        name,
        decimals,
      }
    })
  )
  return vaultDataIncNames
}

/**
 * Return statistics necessary to render the liquidity backing stats page
 *
 * @param provider
 */
export const getStats = async (walletClient: WalletClient) => {
  const [countVaults, , , , countWantTokens] = (await readControllerContract({
    functionName: 'counts',
  })) as any

  const [vaultData, wantTokenData] = await Promise.all([
    getVaultsData(walletClient, Number(countVaults)),
    getWantTokens(walletClient, Number(countWantTokens)),
  ])
  return { vaultData, wantTokenData }
}

export const getTotalValue = async (wantToken: string) =>
  (await readControllerContract({
    functionName: 'getTotalValue',
    args: [wantToken],
  })) as any

export const getBackingPerDGNX = async (wantToken: string) =>
  (await readControllerContract({
    functionName: 'getValueOfTokensForOneBaseToken',
    args: [wantToken],
  })) as any

export const getBackingForAddress = async (
  wantToken: string,
  amount: BigNumber
) =>
  (await readControllerContract({
    functionName: 'getValueOfTokensForBaseToken',
    args: [wantToken, amount],
  })) as any

export const getBaseTokenBalance = async (address: string) => {
  const tokenAddress = (await readControllerContract({
    functionName: 'baseToken',
  })) as Address

  const [balance, decimals] = await Promise.all([
    await readTokenContract({
      address: tokenAddress,
      functionName: 'balanceOf',
      args: [address],
    }),
    await readTokenContract({
      address: tokenAddress,
      functionName: 'decimals',
    }),
  ])
  return { balance, decimals }
}

export const getExpectedWantTokensByBurningBaseTokens = async (
  wantToken: string,
  amount: BigNumber
) =>
  (await readControllerContract({
    functionName: 'getValueOfTokensForBaseToken',
    args: [wantToken, amount],
  })) as any

export const approveBaseToken = async (amountToApprove: BigNumber) => {
  try {
    const tokenAddress = (await readControllerContract({
      functionName: 'baseToken',
    })) as Address

    await writeTokenContract({
      address: tokenAddress,
      functionName: 'approve',
      args: [process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS!, amountToApprove],
    })
  } catch (e) {
    console.log('error', e)
    return false
  }
  return new Promise((resolve) =>
    debounce(() => {
      resolve(true)
    }, 5000)
  )
}

export const getControllerAllowance = async (address: string) => {
  const tokenAddress = (await readControllerContract({
    functionName: 'baseToken',
  })) as Address

  return await readTokenContract({
    address: tokenAddress,
    functionName: 'allowance',
    args: [address, process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS!],
  })
}

export const burnForBacking = async (
  walletClient: WalletClient,
  wantToken: string,
  amountToBurn: BigNumber,
  minimumOutputAmount: BigNumber,
  makeStaticCall?: boolean
) => {
  try {
    if (makeStaticCall) {
      const result = await simulateControllerContract({
        functionName: 'payout',
        args: [wantToken, amountToBurn, minimumOutputAmount],
        account: walletClient.account,
      })
      return result.result
    } else {
      const result = await writeControllerContract({
        functionName: 'payout',
        args: [wantToken, amountToBurn, minimumOutputAmount],
        account: walletClient.account,
      })
      return result.hash
    }
  } catch (e) {
    console.log('error', e)
  }
}
