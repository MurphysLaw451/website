import { useContractRead } from 'wagmi'

import BigNumber from 'bignumber.js'
import abi from '../../abi/degenAtm.json'
import { ATM_ADDRESS } from '../../constants'
import { AtmStatsLoading } from '../../types'

export type DgnxAtmStats = {
    collecting: boolean
    claiming: boolean
    lockPeriodActive: boolean
    token: string
    tokenBalance: BigNumber
    allocationLimit: BigNumber
    tokensPerOneNative: BigNumber
    totalDeposits: BigNumber
    totalLockedTokens: BigNumber
    totalClaimedTokens: BigNumber
    estimatedTotalLockedTokensRewards: BigNumber
    estimatedTotalLockedTokensPayouts: BigNumber
    estimatedTotalTokensPayout: BigNumber
    lockPeriodStarts: BigNumber
    lockPeriodEnds: BigNumber
    lockPeriodInSeconds: BigNumber
    rewardPenaltyBps: BigNumber
    totalRewardBps: BigNumber
    loading: 'no'
}

export const useAtmStats = (): DgnxAtmStats | AtmStatsLoading => {
    const { data } = useContractRead({
        address: ATM_ADDRESS,
        abi,
        functionName: 'getStats',
        args: [],
        watch: true,
    })

    if (!data) {
        return { loading: 'yes' }
    }

    return {
        collecting: data[0],
        claiming: data[1],
        lockPeriodActive: data[2],
        token: data[3],
        tokenBalance: new BigNumber(data[4].toString()),
        allocationLimit: new BigNumber(data[5].toString()),
        tokensPerOneNative: new BigNumber(data[6].toString()),
        totalDeposits: new BigNumber(data[7].toString()),
        totalLockedTokens: new BigNumber(data[8].toString()),
        totalClaimedTokens: new BigNumber(data[9].toString()),
        estimatedTotalLockedTokensRewards: new BigNumber(data[10].toString()),
        estimatedTotalLockedTokensPayouts: new BigNumber(data[11].toString()),
        estimatedTotalTokensPayout: new BigNumber(data[12].toString()),
        lockPeriodStarts: new BigNumber(data[13].toString()),
        lockPeriodEnds: new BigNumber(data[14].toString()),
        lockPeriodInSeconds: new BigNumber(data[15].toString()),
        rewardPenaltyBps: new BigNumber(data[16].toString()),
        totalRewardBps: new BigNumber(data[17].toString()),
        loading: 'no',
    }

    // return data;
}
