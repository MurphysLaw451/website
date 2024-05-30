import erc20Abi from '@dappabis/erc20.json'
import { Address } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export const useHasERC20Allowance = (token: Address, spender: Address) =>
    useReadContract({
        address: token,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [useAccount().address, spender],
        query: {
            select: (data: bigint) => data,
            refetchInterval: 2000,
        },
    })
