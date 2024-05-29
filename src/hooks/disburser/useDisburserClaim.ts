import abi from '@dappabis/disburser.json'
import { useCallback, useEffect, useState } from 'react'
import { Address } from 'viem'
import {
    useAccount,
    useSimulateContract,
    useWatchContractEvent,
    useWriteContract,
} from 'wagmi'

export const useDisburserClaim = (disburserAddress: Address) => {
    const { address } = useAccount()

    const [logs, setLogs] = useState<any[]>()
    const [isLoading, setIsLoading] = useState<boolean>()
    const [claimedAmount, setClaimedAmount] = useState<bigint>()

    const {
        data,
        isError: isErrorSimulate,
        error: errorSimulate,
    } = useSimulateContract({
        address: disburserAddress,
        abi,
        functionName: 'claim',
    })

    const {
        writeContract,
        data: hash,
        reset,
        error: errorWrite,
        isError: isErrorWrite,
    } = useWriteContract()

    const write = useCallback(() => {
        setIsLoading(true)
        data && writeContract && writeContract(data.request)
    }, [data, writeContract])

    useWatchContractEvent({
        address: disburserAddress,
        abi,
        args: {
            sender: address,
        },
        eventName: 'RecurringClaim',
        batch: true,
        onLogs: (_logs) => setLogs(_logs),
    })

    useEffect(() => {
        if (reset && hash && logs && logs.length > 0) {
            logs.forEach((log) => {
                if (hash && log.transactionHash == hash) {
                    setClaimedAmount(log.args.amount)
                    setIsLoading(false)
                    reset()
                }
            })
        }
    }, [logs, hash, reset])

    useEffect(() => {
        if (isErrorWrite) setIsLoading(false)
    }, [isErrorWrite])

    return {
        write,
        reset,
        error: errorSimulate || errorWrite,
        isError: isErrorSimulate || isErrorWrite,
        isLoading,
        isSuccess: Boolean(!isLoading && claimedAmount),
        claimedAmount,
        hash,
    }
}
