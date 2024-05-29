import erc20Abi from '@dappabis/erc20.json'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

export const useGetERC20Decimals = (token: Address) =>
    useReadContract({
        address: token,
        abi: erc20Abi,
        functionName: 'decimals',
        query: {
            select: (data: bigint) => data,
        },
    })
