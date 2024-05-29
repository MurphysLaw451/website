import abi from '@dappabis/degenAtm.json'
import { ATM_ADDRESS } from '@dappconstants'
import { AtmStatsLoading } from '@dapptypes'
import { useReadContract } from 'wagmi'

export type DngxAtmStatsForQualifier = {
    isWhitelisted: boolean
    hasClaimed: boolean
    hasLocked: boolean
    tokenBalance: bigint
    lockedAmount: bigint
    claimedAmount: bigint
    totalDeposited: bigint
    currentRewardAmount: bigint
    currentPenaltyAmount: bigint
    currentRewardAmountNet: bigint
    estimatedTotalRewardAmount: bigint
    estimatedTotalClaimAmount: bigint
    loading: 'no'
}

export const useAtmStatsForQualifier = (
    address: string
): DngxAtmStatsForQualifier | AtmStatsLoading => {
    const { data } = useReadContract({
        address: ATM_ADDRESS,
        abi,
        functionName: 'getStatsForQualifier',
        args: [address],
        query: {
            select: (data: any) =>
                ({
                    ...data,
                    loading: 'no',
                } as DngxAtmStatsForQualifier),
        },
    })

    return !data ? ({ loading: 'yes' } as AtmStatsLoading) : data
}
