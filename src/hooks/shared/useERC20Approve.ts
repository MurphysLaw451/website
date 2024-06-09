import abi from '@dappabis/erc20.json'
import { useCallback } from 'react'
import { Address } from 'viem'
import { useSimulateContract, useWriteContract } from 'wagmi'

export const useERC20Approve = (
    address: Address,
    spender: Address,
    amount: bigint,
    chainId = 43114
) => {
    const { data, isError, error } = useSimulateContract({
        address,
        chainId,
        abi,
        functionName: 'approve',
        args: [spender, amount],
    })

    const {
        writeContract,
        data: hash,
        isPending,
        isSuccess,
        reset,
    } = useWriteContract()

    const write = useCallback(() => {
        data && writeContract && writeContract(data.request)
    }, [data, writeContract])

    return {
        write,
        reset,
        error,
        isError,
        isPending,
        isSuccess,
        hash,
    }
}
