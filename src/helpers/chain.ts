export enum Chain {
  ETH = 'ETH',
  BSC = 'BSC',
  AVAX = 'AVAX',
}

const chainsInfo = {
  [Chain.ETH]: {
    chain: Chain.ETH,
    id: 1,
    name: 'Ethereum',
    symbol: 'eth',
    logo: 'eth.svg',
    rubicName: 'ethereum',
    explorer: 'https://etherscan.io/',
    bitqueryChainName: 'ethereum',
  },
  [Chain.BSC]: {
    chain: Chain.BSC,
    id: 56,
    name: 'Binance Smart Chain',
    symbol: 'bsc',
    logo: 'bnb.svg',
    rubicName: 'binance-smart-chain',
    explorer: 'https://bscscan.com/',
    bitqueryChainName: 'bsc',
  },
  [Chain.AVAX]: {
    chain: Chain.AVAX,
    id: 43114,
    name: 'Avalanche',
    symbol: 'avax',
    logo: 'avalanche.svg',
    rubicName: 'avalanche',
    explorer: 'https://snowtrace.io/',
    bitqueryChainName: 'avalanche',
  },
}

export const chainFromChainId = (id?: number) => {
  const chain = Object.values(chainsInfo).find((info) => info.id === id)

  if (!chain) {
    throw Error('Could not find chain')
  }

  return chain
}
