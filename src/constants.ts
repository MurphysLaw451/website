import {
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  goerli,
  mainnet,
} from '@wagmi/chains'
import { Address } from 'viem'

export const ATM_ADDRESS = '0x49784E16ada48325Cf0537F26726C316bd3d6d51'
export const TOKEN_ADDRESS = '0x51e48670098173025c477d9aa3f0eff7bf9f7812'
export const CELER_OTV2_ADDRESS = '0xb51541df05DE07be38dcfc4a80c05389A54502BB'
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD'
export const MONITOR_MAINNET = false

export const DIAMONDS: { [key: number]: Address } = {
  [mainnet.id]: '0x0000000000000000000000000000000000000000',
  [goerli.id]: '0xe67E23EB191c2771ce3E766cab48dfc3dDa7ee6B',
  [bsc.id]: '0x0000000000000000000000000000000000000000',
  [bscTestnet.id]: '0x0000000000000000000000000000000000000000',
  [avalancheFuji.id]: '0x14854f848AFd5373C94223b4F59811E9ce0d27E5',
  [avalanche.id]: '0x0000000000000000000000000000000000000000',
}
