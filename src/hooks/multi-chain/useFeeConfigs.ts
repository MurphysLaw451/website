import { avalanche, avalancheFuji, goerli, mainnet } from '@wagmi/chains'
import { Abi } from 'viem'
import { erc20ABI, useContractReads } from 'wagmi'
import {
  CELER_OTV2_ADDRESS,
  DEAD_ADDRESS,
  DIAMONDS,
  MONITOR_MAINNET,
  TOKEN_ADDRESS,
  ZERO_ADDRESS,
} from '../../constants'
import { FeeConfigState, Loading } from '../../types'
import diamondHomeAbi from './../../abi/abi-home.json'
import diamondTargetAbi from './../../abi/abi-target.json'

export type DgnxMultiChainFeeMonitoring = {
  avalanche: {
    totalSupply: bigint
    feesCollected?: bigint
  }
  ethereum: {
    totalSupply: bigint
    feesCollected?: bigint
  }
  feeConfigs: {
    id: string
    fee: bigint
    receiver: bigint
    deploymentStatus: {
      avalanche: FeeConfigState
      ethereum: FeeConfigState
    }
    revenue: {
      avalanche: bigint
      ethereum: bigint
    }
  }[]
  loading: 'no'
}

const avalancheChainId = MONITOR_MAINNET ? avalanche.id : avalancheFuji.id
const ethereumChainId = MONITOR_MAINNET ? mainnet.id : goerli.id

export const useFeeConfigs = (): any | Loading => {
  let result: any

  // Initial data
  const { data: metaData, isLoading: isLoadingMetaData } = useContractReads({
    contracts: [
      {
        chainId: 43114,
        address: TOKEN_ADDRESS,
        abi: erc20ABI,
        functionName: 'totalSupply',
      },
      {
        chainId: 43114,
        address: TOKEN_ADDRESS,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [ZERO_ADDRESS],
      },
      {
        chainId: 43114,
        address: TOKEN_ADDRESS,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [DEAD_ADDRESS],
      },
      {
        chainId: 43114,
        address: TOKEN_ADDRESS,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [CELER_OTV2_ADDRESS],
      },
      {
        chainId: avalancheChainId,
        address: DIAMONDS[avalancheChainId],
        abi: diamondHomeAbi as Abi,
        functionName: 'getDeployStatesForChain',
        args: [ethereumChainId],
      },
      {
        chainId: avalancheChainId,
        address: DIAMONDS[avalancheChainId],
        abi: diamondHomeAbi as Abi,
        functionName: 'getFeeConfigIds',
      },
      {
        chainId: avalancheChainId,
        address: DIAMONDS[avalancheChainId],
        abi: diamondHomeAbi as Abi,
        functionName: 'isFeeDistributorBountyActive',
      },
      {
        chainId: avalancheChainId,
        address: DIAMONDS[avalancheChainId],
        abi: diamondHomeAbi as Abi,
        functionName: 'isFeeDistributorBountyInToken',
      },
      {
        chainId: avalancheChainId,
        address: DIAMONDS[avalancheChainId],
        abi: diamondHomeAbi as Abi,
        functionName: 'isFeeDistributorRunning',
      },
      {
        chainId: avalancheChainId,
        address: DIAMONDS[avalancheChainId],
        abi: diamondHomeAbi as Abi,
        functionName: 'getFeeDistributorTotalBounties',
      },
      {
        chainId: avalancheChainId,
        address: DIAMONDS[avalancheChainId],
        abi: diamondHomeAbi as Abi,
        functionName: 'getFeeDistributorLastBounty',
      },
      {
        chainId: avalancheChainId,
        address: DIAMONDS[avalancheChainId],
        abi: diamondHomeAbi as Abi,
        functionName: 'getFeeDistributorReceivers',
      },
      {
        chainId: avalancheChainId,
        address: DIAMONDS[avalancheChainId],
        abi: diamondHomeAbi as Abi,
        functionName: 'getFeeDistributorTotalPoints',
      },
      {
        chainId: ethereumChainId,
        address: DIAMONDS[ethereumChainId],
        abi: erc20ABI,
        functionName: 'totalSupply',
      },
      {
        chainId: ethereumChainId,
        address: DIAMONDS[ethereumChainId],
        abi: diamondTargetAbi as Abi,
        functionName: 'getCollectedFeesTotal',
      },
      {
        chainId: ethereumChainId,
        address: DIAMONDS[ethereumChainId],
        abi: diamondTargetAbi as Abi,
        functionName: 'getFeeConfigIds',
      },
    ],
  })

  let contractsFeeConfigsHome = []
  let contractsFeeStoreConfigsTarget = []
  let contractsFeeStoreCollectedFeesByConfig = []
  let contractsFeeDistributorTargetAssetNames = []
  let contractsFeeDistributorTargetAssetSymbols = []
  let feeConfigIds = []
  let feeConfigs = []

  if (!isLoadingMetaData) {
    const [
      totalSupplyAvalanche,
      amountOnZero,
      amountOnDead,
      amountOnVault,
      feeConfigDeployStatesForEthereum,
      feeConfigIdsHome,
      isFeeDistributorBountyActive,
      isFeeDistributorBountyInToken,
      isFeeDistributorRunning,
      getFeeDistributorTotalBounties,
      getFeeDistributorLastBounty,
      getFeeDistributorReceivers,
      getFeeDistributorTotalPoints,
      totalSupplyEthereum,
      collectedFeesTotalEthereum,
      feeConfigIdsEthereum,
    ] = Object.keys(metaData).map((k: string) => metaData[k]?.result)

    result = {
      ...result,
      totalSupplyAvalanche,
      amountOnZero,
      amountOnDead,
      amountOnVault,
      feeConfigDeployStatesForEthereum,
      feeConfigIdsHome,
      isFeeDistributorBountyActive,
      isFeeDistributorBountyInToken,
      isFeeDistributorRunning,
      getFeeDistributorTotalBounties,
      getFeeDistributorLastBounty,
      getFeeDistributorReceivers,
      getFeeDistributorTotalPoints,
      totalSupplyEthereum,
      collectedFeesTotalEthereum,
      feeConfigIdsEthereum,
      totalSupplyAvalancheNet:
        totalSupplyAvalanche - amountOnZero - amountOnDead - amountOnVault,
    }

    contractsFeeConfigsHome = feeConfigIdsHome?.map((feeConfigId: string) => ({
      chainId: avalancheChainId,
      address: DIAMONDS[avalancheChainId],
      abi: diamondHomeAbi as Abi,
      functionName: 'getFeeConfig',
      args: [feeConfigId],
    }))

    contractsFeeStoreConfigsTarget = feeConfigIdsHome?.map(
      (feeConfigId: string) => ({
        chainId: ethereumChainId,
        address: DIAMONDS[ethereumChainId],
        abi: diamondTargetAbi as Abi,
        functionName: 'getFeeStoreConfig',
        args: [feeConfigId],
      })
    )

    contractsFeeStoreCollectedFeesByConfig = feeConfigIdsHome?.map(
      (feeConfigId: string) => ({
        chainId: ethereumChainId,
        address: DIAMONDS[ethereumChainId],
        abi: diamondTargetAbi as Abi,
        functionName: 'getCollectedFeesByConfigId',
        args: [feeConfigId],
      })
    )

    contractsFeeDistributorTargetAssetNames = getFeeDistributorReceivers?.map(
      (distribution: any) => ({
        chainId: avalancheChainId,
        address:
          distribution.swap.length >= 2
            ? distribution.swap[distribution.swap.length - 1]
            : TOKEN_ADDRESS,
        abi: erc20ABI,
        functionName: 'name',
      })
    )

    contractsFeeDistributorTargetAssetSymbols = getFeeDistributorReceivers?.map(
      (distribution: any) => ({
        chainId: avalancheChainId,
        address:
          distribution.swap.length >= 2
            ? distribution.swap[distribution.swap.length - 1]
            : TOKEN_ADDRESS,
        abi: erc20ABI,
        functionName: 'symbol',
      })
    )

    feeConfigIds = [...feeConfigIdsHome]
  }

  if (feeConfigIds.length > 0) {
    feeConfigs = Object.keys(feeConfigIds).map((k: string) => ({
      id: feeConfigIds[k] as string,
    }))
  }

  // get all fee configs home chain
  const { data: feeConfigsHomeData, isLoading: isLoadingFeeConfigDetailsHome } =
    useContractReads({
      contracts: contractsFeeConfigsHome,
    })

  if (!isLoadingFeeConfigDetailsHome && feeConfigIds.length > 0) {
    feeConfigs = Object.keys(feeConfigsHomeData).map((k: string) => ({
      ...feeConfigs[k],
      ...feeConfigsHomeData[k]?.result,
      id: feeConfigIds[k] as string,
    }))
  }

  // get all fee configs target chain

  const {
    data: feeStoreConfigsData,
    isLoading: isLoadingFeeConfigDetailsTarget,
  } = useContractReads({
    contracts: contractsFeeStoreConfigsTarget,
  })

  if (!isLoadingFeeConfigDetailsTarget && feeConfigIds.length > 0) {
    feeConfigs = Object.keys(feeStoreConfigsData).map((k: string) => ({
      ...feeConfigs[k],
      ...feeStoreConfigsData[k]?.result,
      id: feeConfigIds[k] as string,
    }))
  }

  // collected fees on target chain
  const { data: collectedFeesData, isLoading: isLoadingCollectedFeesData } =
    useContractReads({
      contracts: contractsFeeStoreCollectedFeesByConfig,
    })

  if (!isLoadingCollectedFeesData && feeConfigIds.length > 0) {
    feeConfigs = Object.keys(collectedFeesData).map((k: string) => ({
      ...feeConfigs[k],
      amount: collectedFeesData[k]?.result as bigint,
      id: feeConfigIds[k] as string,
    }))
  }

  // gets names of distribution assets
  const {
    data: feeDistributorTargetAssetNames,
    isLoading: isLoadingFeeDistributorTargetAssetNames,
  } = useContractReads({
    contracts: contractsFeeDistributorTargetAssetNames,
  })

  if (
    !isLoadingFeeDistributorTargetAssetNames &&
    result &&
    result.getFeeDistributorReceivers
  ) {
    result = {
      ...result,
      getFeeDistributorReceivers: result.getFeeDistributorReceivers.map(
        (item, k) => ({
          ...item,
          assetName: feeDistributorTargetAssetNames[k]?.result,
        })
      ),
    }
    feeDistributorTargetAssetNames
  }

  // gets symbols of distribution assets
  const {
    data: feeDistributorTargetAssetSymbols,
    isLoading: isLoadingFeeDistributorTargetAssetSymbols,
  } = useContractReads({
    contracts: contractsFeeDistributorTargetAssetSymbols,
  })

  if (
    !isLoadingFeeDistributorTargetAssetSymbols &&
    result &&
    result.getFeeDistributorReceivers
  ) {
    result = {
      ...result,
      getFeeDistributorReceivers: result.getFeeDistributorReceivers.map(
        (item, k) => ({
          ...item,
          assetSymbol: feeDistributorTargetAssetSymbols[k]?.result,
        })
      ),
    }
    feeDistributorTargetAssetNames
  }

  result = {
    ...result,
    feeConfigs,
  }

  return isLoadingMetaData ||
    isLoadingFeeConfigDetailsHome ||
    isLoadingFeeConfigDetailsTarget ||
    isLoadingCollectedFeesData
    ? { loading: 'yes' }
    : {
        ...result,
        loading: 'no',
      }
}
