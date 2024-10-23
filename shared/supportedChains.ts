import { get } from 'lodash'
import { Address, defineChain } from 'viem'
import {
    Chain,
    arbitrum as arbitrumOriginal,
    avalancheFuji,
    avalanche as avalancheOriginal,
    base as baseOriginal,
    bsc as bscOriginal,
    goerli,
    localhost,
    mainnet as mainnetOriginal,
    polygon as polygonOriginal,
    polygonAmoy as polygonTestnetOriginal,
} from 'viem/chains'

const avalanche = defineChain({
    ...avalancheOriginal,
    rpcUrls: {
        ...avalancheOriginal.rpcUrls,
        default: {
            ...avalancheOriginal.rpcUrls.default,
            http: [
                process.env.USE_LOCALFORK_INSTEAD !== 'true' &&
                process.env.NEXT_PUBLIC_USE_LOCALFORK_INSTEAD !== 'true'
                    ? `https://avalanche-mainnet.infura.io/v3/${
                          process.env.NEXT_PUBLIC_INFURA_ID ||
                          process.env.INFURA_ID
                      }`
                    : 'http://127.0.0.1:8545',
                // 'http://localhost:9650/ext/bc/C/rpc',
                // ...avalancheOriginal.rpcUrls.default.http,
            ],
        },
    },
})
const mainnet = defineChain({
    ...mainnetOriginal,
    rpcUrls: {
        ...mainnetOriginal.rpcUrls,
        default: {
            ...mainnetOriginal.rpcUrls.default,
            http: [
                process.env.USE_LOCALFORK_INSTEAD !== 'true' &&
                process.env.NEXT_PUBLIC_USE_LOCALFORK_INSTEAD !== 'true'
                    ? `https://mainnet.infura.io/v3/${
                          process.env.NEXT_PUBLIC_INFURA_ID ||
                          process.env.INFURA_ID
                      }`
                    : 'http://127.0.0.1:8546',
                // 'http://localhost:9650/ext/bc/C/rpc',
                // ...mainnetOriginal.rpcUrls.default.http,
            ],
        },
    },
})

const polygon = defineChain({
    ...polygonOriginal,
    rpcUrls: {
        ...polygonOriginal.rpcUrls,
        default: {
            ...polygonOriginal.rpcUrls.default,
            http: [
                `https://polygon-mainnet.infura.io/v3/${
                    process.env.NEXT_PUBLIC_INFURA_ID || process.env.INFURA_ID
                }`,
            ],
        },
    },
})
const polygonAmoy = defineChain({
    ...polygonTestnetOriginal,
    rpcUrls: {
        ...polygonTestnetOriginal.rpcUrls,
        default: {
            ...polygonTestnetOriginal.rpcUrls.default,
            http: [
                `https://polygon-amoy.infura.io/v3/${
                    process.env.NEXT_PUBLIC_INFURA_ID || process.env.INFURA_ID
                }`,
            ],
        },
    },
})
const bsc = defineChain({
    ...bscOriginal,
    rpcUrls: {
        ...bscOriginal.rpcUrls,
        default: {
            ...bscOriginal.rpcUrls.default,
            http: [
                // `https://bsc-mainnet.infura.io/v3/${
                //     process.env.NEXT_PUBLIC_INFURA_ID || process.env.INFURA_ID
                // }`,
                `https://rpc.ankr.com/bsc/${
                    process.env.NEXT_PUBLIC_ANKR_API_KEY ||
                    process.env.ANKR_API_KEY
                }`,
            ],
        },
    },
})
const arbitrum = defineChain({
    ...arbitrumOriginal,
    rpcUrls: {
        ...arbitrumOriginal.rpcUrls,
        default: {
            ...arbitrumOriginal.rpcUrls.default,
            http: [
                `https://arbitrum-mainnet.infura.io/v3/${
                    process.env.NEXT_PUBLIC_INFURA_ID || process.env.INFURA_ID
                }`,
            ],
        },
    },
})
// const optimism = defineChain({
//     ...optimismOriginal,
//     rpcUrls: {
//         ...optimismOriginal.rpcUrls,
//         default: {
//             ...optimismOriginal.rpcUrls.default,
//             http: [
//                 `https://optimism-mainnet.infura.io/v3/${
//                     process.env.NEXT_PUBLIC_INFURA_ID || process.env.INFURA_ID
//                 }`,
//             ],
//         },
//     },
// })
const base = defineChain({
    ...baseOriginal,
    rpcUrls: {
        ...baseOriginal.rpcUrls,
        default: {
            ...baseOriginal.rpcUrls.default,
            http: [
                `https://base-mainnet.g.alchemy.com/v2/${
                    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ||
                    process.env.ALCHEMY_API_KEY
                }`,
            ],
        },
    },
})

export const chains: Chain[] = [
    avalanche,
    mainnet,
    bsc,
    base,
    arbitrum,
    polygon,
    polygonAmoy,
    // optimism,
    Boolean(process.env.NEXT_PUBLIC_ENABLE_LOCALFORK) ||
    process.env.NODE_ENV != 'production'
        ? localhost
        : null,
    ...(Boolean(process.env.NEXT_PUBLIC_ENABLE_TESTNETS)
        ? [avalancheFuji, goerli]
        : []),
].filter((chain) => chain) as Chain[]

export const getChainById = (chainId: number) => {
    for (const chain of Object.values(chains))
        if ('id' in chain) if (chain.id === chainId) return chain

    throw new Error(`Chain with id ${chainId} not found`)
}

export const getExplorerByChainId = (chainId: number) =>
    get(
        {
            [avalanche.id]: {
                name: 'snowscan.xyz',
                getTxUrl: (txHash: Address) =>
                    `https://snowscan.xyz/tx/${txHash}`,
                getTokenUrl: (token: Address) =>
                    `https://snowscan.xyz/token/${token}`,
                getAddressUrl: (token: Address) =>
                    `https://snowscan.xyz/address/${token}`,
            },
            [bsc.id]: {
                name: 'bscscan.com',
                getTxUrl: (txHash: Address) =>
                    `${bsc.blockExplorers.default.url}/tx/${txHash}`,
                getTokenUrl: (token: Address) =>
                    `${bsc.blockExplorers.default.url}/token/${token}`,
                getAddressUrl: (token: Address) =>
                    `${bsc.blockExplorers.default.url}/address/${token}`,
            },
            [arbitrum.id]: {
                name: 'arbiscan.io',
                getTxUrl: (txHash: Address) =>
                    `${arbitrum.blockExplorers.default.url}/tx/${txHash}`,
                getTokenUrl: (token: Address) =>
                    `${arbitrum.blockExplorers.default.url}/token/${token}`,
                getAddressUrl: (token: Address) =>
                    `${arbitrum.blockExplorers.default.url}/address/${token}`,
            },
            [polygon.id]: {
                name: 'polygonscan.com',
                getTxUrl: (txHash: Address) =>
                    `${polygon.blockExplorers.default.url}/tx/${txHash}`,
                getTokenUrl: (token: Address) =>
                    `${polygon.blockExplorers.default.url}/token/${token}`,
                getAddressUrl: (token: Address) =>
                    `${polygon.blockExplorers.default.url}/address/${token}`,
            },
            [base.id]: {
                name: 'basescan.org',
                getTxUrl: (txHash: Address) =>
                    `${base.blockExplorers.default.url}/tx/${txHash}`,
                getTokenUrl: (token: Address) =>
                    `${base.blockExplorers.default.url}/token/${token}`,
                getAddressUrl: (token: Address) =>
                    `${base.blockExplorers.default.url}/address/${token}`,
            },
            [mainnet.id]: {
                name: 'etherscan.io',
                getTxUrl: (txHash: Address) =>
                    `${mainnet.blockExplorers.default.url}/tx/${txHash}`,
                getTokenUrl: (token: Address) =>
                    `${mainnet.blockExplorers.default.url}/token/${token}`,
                getAddressUrl: (token: Address) =>
                    `${mainnet.blockExplorers.default.url}/address/${token}`,
            },
        },
        chainId,
        null
    )
