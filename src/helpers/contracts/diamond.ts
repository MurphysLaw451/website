import {
  Address,
  useAccount,
  useConnect,
  useContractRead,
  useWalletClient,
} from 'wagmi'
import diamondHomeAbi from './../../abi/abi-home.json'
import diamondTargetAbi from './../../abi/abi-target.json'
import {
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  goerli,
  mainnet,
} from '@wagmi/chains'

// @todo remove testnet diamonds and configure correct ones
const diamonds: { [key: number]: Address } = {
  [mainnet.id]: '0x0000000000000000000000000000000000000000',
  [goerli.id]: '0x0A509a6a51a5572DEe9130626f257D815AbB62e9',
  [bsc.id]: '0x0000000000000000000000000000000000000000',
  [bscTestnet.id]: '0x0000000000000000000000000000000000000000',
  [avalancheFuji.id]: '0x3900A626Dd925bdfE6Ee3292091517Fd07176647',
  [avalanche.id]: '0x0000000000000000000000000000000000000000',
}

const useDiamondRead = (
  abi: any,
  data: {
    functionName: string
    args?: any[]
    account?: Address
  }
) => {
  const {
    data: {
      chain: { id: chainId },
    },
  } = useConnect()

  return useContractRead({
    address: diamonds[chainId],
    abi,
    functionName: data.functionName,
    args: data.args,
    account: data.account,
  })
}

const useHomeDiamondRead = (data: {
  functionName: string
  args?: any[]
  account?: Address
}) => {
  return useDiamondRead(diamondHomeAbi, data)
}

const useTargetDiamondRead = (data: {
  functionName: string
  args?: any[]
  account?: Address
}) => {
  return useDiamondRead(diamondHomeAbi, data)
}
