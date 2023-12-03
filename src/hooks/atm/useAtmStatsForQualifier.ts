import { useContractRead } from 'wagmi'

import BigNumber from 'bignumber.js'
import abi from '../../abi/degenAtm.json'
import { ATM_ADDRESS } from '../../constants'
import { AtmStatsLoading } from '../../types'

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
    const { data } = <{ data: DngxAtmStatsForQualifier }>useContractRead({
        address: ATM_ADDRESS,
        abi,
        functionName: 'getStatsForQualifier',
        args: [address],
        watch: true,
    })
    return !data ? { loading: 'yes' } : { ...data, loading: 'no' }
}
