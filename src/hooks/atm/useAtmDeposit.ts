import abi from '@dappabis/degenAtm.json'
import { ATM_ADDRESS } from '@dappconstants'
import { useCallback, useEffect, useState } from 'react'
import {
    useSimulateContract,
    useWatchContractEvent,
    useWriteContract,
} from 'wagmi'

export const useAtmDeposit = (value: bigint) => {
    const [logs, setLogs] = useState<any[]>()
    const [isLoading, setIsLoading] = useState<boolean>()
    const [depositAmount, setDepositAmount] = useState<bigint>()

    const {
        data,
        isError: isErrorSimulate,
        error: errorSimulate,
    } = useSimulateContract({
        address: ATM_ADDRESS,
        abi,
        functionName: 'deposit',
        value,
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
        address: ATM_ADDRESS,
        abi,
        eventName: 'Deposit',
        batch: true,
        onLogs: (_logs) => setLogs(_logs),
    })

    useEffect(() => {
        if (reset && hash && logs && logs.length > 0) {
            logs.forEach((log) => {
                if (hash && log.transactionHash == hash) {
                    setDepositAmount(log.args.amount)
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
        isSuccess: Boolean(!isLoading && depositAmount),
        depositAmount,
        hash,
    }
}
