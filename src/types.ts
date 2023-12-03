import {
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  goerli,
  mainnet,
} from '@wagmi/chains'
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

export type FeeDistributionReceiver = {
  name: string
  points: bigint
  receiver: Address
  swap: Address[]
}

export type FeeConfig = {
  id: Address
  idShort: Address
  fee: bigint
  receiver: Address
  receiverShort: Address
  ftype: bigint
  currency: bigint
  states: {
    [mainnet.id]: FeeConfigState
    [goerli.id]: FeeConfigState
    [bsc.id]: FeeConfigState
    [bscTestnet.id]: FeeConfigState
    [avalancheFuji.id]: FeeConfigState
    [avalanche.id]: FeeConfigState
  }
}

export enum FeeConfigState {
  NEW,
  UPDATED,
  SYNC,
  DEPLOYED,
}
