export enum Chain {
    ETH = 'ETH',
    GOERLI = 'GOERLI',
    BSC = 'BSC',
    AVAX = 'AVAX',
    LOCALHOST = 'LOCALHOST',
}

type ChainInfo = {
    chain: Chain | 'unsupported'
    id: number
    name: string
    symbol: string
    logo: string
}

const chainsInfo: { [chainName in Chain]?: ChainInfo } = {
    [Chain.ETH]: {
        chain: Chain.ETH,
        id: 1,
        name: 'Ethereum',
        symbol: 'eth',
        logo: 'eth.svg',
    },
    [Chain.GOERLI]: {
        chain: Chain.ETH,
        id: 5,
        name: 'Ethereum',
        symbol: 'eth',
        logo: 'eth.svg',
    },
    [Chain.BSC]: {
        chain: Chain.BSC,
        id: 56,
        name: 'Binance Smart Chain',
        symbol: 'bsc',
        logo: 'bnb.svg',
    },
    [Chain.AVAX]: {
        chain: Chain.AVAX,
        id: 43114,
        name: 'Avalanche',
        symbol: 'avax',
        logo: 'avalanche.svg',
    },
    [Chain.LOCALHOST]: {
        chain: Chain.LOCALHOST,
        id: 1337,
        name: 'Localfork',
        symbol: 'localforkSymbol',
        logo: 'avalanche.svg',
    },
}

export const chainFromChainId = (id: number): ChainInfo => {
    const chain = Object.values(chainsInfo).find((info) => info.id === id)
    if (!chain) {
        return {
            id,
            chain: 'unsupported',
            name: 'Unsupported Network',
            symbol: 'N/A',
            logo: 'unsupported.svg',
        }
    }
    return chain
}
