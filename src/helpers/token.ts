import abi from '@dappabis/erc20.json'
import { readContract } from '@wagmi/core'
import { Address } from 'viem'
import { Config } from 'wagmi'

const cachedTokenData: Record<
    string,
    Promise<[string, string, bigint]> | [string, string, bigint]
> = {}

export const getTokenData = async (config: Config, address: Address) => {
    if (cachedTokenData[address]) {
        return cachedTokenData[address]
    }

    cachedTokenData[address] = Promise.all([
        readContract(config, {
            address,
            abi,
            functionName: 'name',
        }) as Promise<string>,
        readContract(config, {
            address,
            abi,
            functionName: 'symbol',
        }) as Promise<string>,
        readContract(config, {
            address,
            abi,
            functionName: 'decimals',
        }) as Promise<bigint>,
    ])

    return cachedTokenData[address]
}
