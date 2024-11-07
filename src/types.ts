import { Address } from 'viem'

export enum BACKING_TYPE {
    TOTAL = 'TOTAL',
    ONE = 'ONE',
}

export enum CHART_PRICE_MODE {
    USD = 'USD',
    AVAX = 'AVAX',
}

export type AtmStatsLoading = {
    loading: 'yes'
}

// STAKING
export type TokenInfoResponse = {
    source: Address
    name: string
    symbol: string
    decimals: bigint
    exists: boolean
    isReward: boolean
    isTarget: boolean
    injected: bigint
    rewarded: bigint
}

export type StakingBaseProps = {
    stakingTokenInfo: TokenInfoResponse
}

export type TokenInfo = {
    name: string
    symbol: string
    decimals: bigint
    source: Address
}

export type StakeResponse = {
    burned: boolean
    bucketId: string
    lock: bigint
    locked: boolean
    lockStart: bigint
    release: bigint
    tokenId: bigint
    amount: bigint
}

export type StakeBucketDataResponse = {
    active: boolean
    burn: boolean
    id: Address
    share: bigint
    lock: bigint
    staked: bigint
    stakes: bigint
}

export type StakeBucket = {
    id: Address
    duration: number
    burn: boolean
    active: boolean
    multiplier: number
    share: number
    staked: bigint
    stakes: bigint
}

export type BucketParams = {
    burn: boolean
    lock: number
    share: number
}
export type StakeBucketUpdateShareParams = {
    id: Address
    share: number
}

export type RewardEstimation = {
    tokenInfo: TokenInfo
    amount: bigint
}

export type TokenURI = {
    name: string
    description: string
    image: string
}

export type AnnualPercentageType = {
    bucketId: string
    apr: number
    apy: number
    fromBlock: number
    toBlock: number
}

export type AnnualPercentageDataType = {
    [bucketId: string]: AnnualPercentageType
}

export type StakingMetrics = {
    annualPercentageData: AnnualPercentageDataType
    protocolInformation: {
        blockNumberAPUpdate: number
        blockNumberStakesUpdate: number
        blockNumberAPUpdateIntervall: number
    }
    stakeLogs: {
        timestamp: number
        staked: number
    }[]
}

type Swap = {
    calleeSwap: Address
    calleeAmountOut: Address
    path: Address[]
}

type SwapGroup = {
    token: Address
    swaps: Swap[]
}

export type TokenAddParams = {
    token: Address
    isReward: boolean
    isTarget: boolean
    swapGroup: SwapGroup[]
}

export enum AddTokenType {
    REWARD,
    PAYOUT,
    BOTH,
}
// type GetSwapResponse = {
//     from: Address
//     to: Address
//     swaps: SwapCandidate[]
// }
// export type GetSwapsResponse = GetSwapResponse[]

//
// STAKEX Creator Types
//
export type STAKEXCreatorDataInitParams = {
    stakingToken: Address | null
    stableToken: Address | null
    bucketsToAdd: BucketParams[] | null
    swaps: any
    rewards: { token: Address }[] | null
    manager: Address | null
    excludeStakingTokenFromRewards: boolean
}

export type STAKEXDeployArgs = {
    referral: Address
    initContract: Address
    initFn: string
    initParams: STAKEXCreatorDataInitParams
}

export type STAKEXCreatorData = {
    chainId: number
    deployArgs: STAKEXDeployArgs
}
