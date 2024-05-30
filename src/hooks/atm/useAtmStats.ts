import BigNumber from 'bignumber.js'
import { useReadContract } from 'wagmi'
import abi from '../../abi/degenAtm.json'
import { ATM_ADDRESS } from '../../constants'
import { AtmStatsLoading } from '../../types'

export type DgnxAtmStats = {
    collecting: boolean
    claiming: boolean
    lockPeriodActive: boolean
    token: string
    tokenBalance: bigint
    allocationLimit: bigint
    tokensPerOneNative: bigint
    totalDeposits: bigint
    totalLockedTokens: bigint
    totalClaimedTokens: bigint
    estimatedTotalLockedTokensRewards: bigint
    estimatedTotalLockedTokensPayouts: bigint
    estimatedTotalTokensPayout: bigint
    lockPeriodStarts: bigint
    lockPeriodEnds: bigint
    lockPeriodInSeconds: bigint
    rewardPenaltyBps: bigint
    totalRewardBps: bigint
    loading: 'no'
}

export const useAtmStats = (): DgnxAtmStats | AtmStatsLoading => {
    const { data } = useReadContract({
        address: ATM_ADDRESS,
        abi,
        functionName: 'getStats',
        query: {
            select: (data: any) =>
                ({
                    ...data,
                    loading: 'no',
                } as DgnxAtmStats),
        },
    })

    return !data ? ({ loading: 'yes' } as AtmStatsLoading) : data
}
