import abi from '@dappabis/stakex/abi-ui.json'
import { RewardEstimation } from '@dapptypes'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

type StakingData = {
    staked: RewardEstimation
    stakedBurned: RewardEstimation
    injected: RewardEstimation[]
    rewarded: RewardEstimation[]
    avgLock: bigint
    stakes: bigint
    totalSupply: bigint
    stakesBurned: bigint
}

export const useGetStakingData = (address: Address) =>
    useReadContract({
        address,
        abi,
        functionName: 'getStakingData',
        query: {
            select: (data: StakingData) => data,
        },
    })
