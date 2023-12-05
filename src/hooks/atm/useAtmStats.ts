import { useContractRead } from 'wagmi'

import abi from '../../abi/degenAtm.json'
import { ATM_ADDRESS } from '../../constants'
import { Loading } from '../../types'

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
  lockPeriodStarts: number
  lockPeriodEnds: number
  lockPeriodInSeconds: number
  rewardPenaltyBps: number
  totalRewardBps: number
  loading: 'no'
}

export const useAtmStats = (): DgnxAtmStats | Loading => {
  const { data } = <{ data: DgnxAtmStats }>useContractRead({
    address: ATM_ADDRESS,
    abi,
    functionName: 'getStats',
    args: [],
    watch: true,
  })
  return !data
    ? { loading: 'yes' }
    : {
        ...data,
        lockPeriodStarts: Number(data.lockPeriodStarts),
        lockPeriodEnds: Number(data.lockPeriodEnds),
        lockPeriodInSeconds: Number(data.lockPeriodInSeconds),
        rewardPenaltyBps: Number(data.rewardPenaltyBps),
        totalRewardBps: Number(data.totalRewardBps),
        loading: 'no',
      }
}
