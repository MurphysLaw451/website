import { erc20ABI, readContracts, useContractReads } from 'wagmi'
import { FeeConfigState, Loading } from '../../types'
import {
  CELER_OTV2_ADDRESS,
  DEAD_ADDRESS,
  DIAMONDS,
  MONITOR_MAINNET,
  TOKEN_ADDRESS,
  ZERO_ADDRESS,
} from '../../constants'
import { avalanche, avalancheFuji, goerli, mainnet } from '@wagmi/chains'
import diamondHomeAbi from './../../abi/abi-home.json'
import diamondTargetAbi from './../../abi/abi-target.json'
import { Abi, MulticallContracts } from 'viem'

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

  let contractsFeeConfigDetailsHome = []
  let contractsFeeConfigDetailsTarget = []

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
      totalSupplyEthereum,
      collectedFeesTotalEthereum,
      feeConfigIdsEthereum,
    ] = Object.keys(metaData).map((k: string) => metaData[k]?.result)

    console.log({
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
      totalSupplyEthereum,
      collectedFeesTotalEthereum,
      feeConfigIdsEthereum,
    })

    contractsFeeConfigDetailsHome = feeConfigIdsHome?.map((feeConfigId) => ({
      chainId: avalancheChainId,
      address: DIAMONDS[avalancheChainId],
      abi: diamondHomeAbi as Abi,
      functionName: 'getFeeConfig',
      args: [feeConfigId],
    }))

    contractsFeeConfigDetailsTarget = feeConfigIdsHome?.map((feeConfigId) => ({
      chainId: ethereumChainId,
      address: DIAMONDS[ethereumChainId],
      abi: diamondTargetAbi as Abi,
      functionName: 'getCollectedFeesByConfigId',
      args: [feeConfigId],
    }))

    console.log({ contractsFeeConfigDetailsHome })
  }

  // get all fee configs home chain
  const {
    data: feeConfigDetailsHome,
    isLoading: isLoadingFeeConfigDetailsHome,
  } = useContractReads({
    contracts: contractsFeeConfigDetailsHome,
  })

  if (!isLoadingFeeConfigDetailsHome) {
    console.log({ feeConfigDetailsHome })

    // ID is missing in output, so need to add into map
    // const [] = Object.keys(feeConfigDetailsHome).map(
    //   (k: string) => feeConfigDetailsHome[k]?.result
    // )
  }

  // get all fee configs target chain

  const {
    data: feeConfigDetailsTarget,
    isLoading: isLoadingFeeConfigDetailsTarget,
  } = useContractReads({
    contracts: contractsFeeConfigDetailsTarget,
  })

  if (!isLoadingFeeConfigDetailsTarget) {
    console.log({ feeConfigDetailsTarget })
    // ID is missing in output, so need to add into map
    // const [] = Object.keys(feeConfigDetailsTarget).map(
    //   (k: string) => feeConfigDetailsTarget[k]?.result
    // )
  }

  return isLoadingMetaData ||
    isLoadingFeeConfigDetailsHome ||
    isLoadingFeeConfigDetailsTarget
    ? { loading: 'yes' }
    : {
        ...metaData,
        ...feeConfigDetailsHome,
        ...feeConfigDetailsTarget,
        loading: 'no',
      }
}
