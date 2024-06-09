import erc20Abi from '@dappabis/erc20.json'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

export const useGetERC20TotalSupply = (token: Address, chainId = 43114) =>
    useReadContract({
        address: token,
        chainId,
        abi: erc20Abi,
        functionName: 'totalSupply',
        query: {
            select: (data: bigint) => data,
        },
    })
