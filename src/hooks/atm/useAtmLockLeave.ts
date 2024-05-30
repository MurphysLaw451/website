import { useCallback, useEffect, useState } from 'react'
import {
    useSimulateContract,
    useWatchContractEvent,
    useWriteContract,
} from 'wagmi'
import abi from '../../abi/degenAtm.json'
import { ATM_ADDRESS } from '../../constants'

export const useAtmLockLeave = () => {
    const [logs, setLogs] = useState<any[]>()
    const [isLoading, setIsLoading] = useState<boolean>()

    const {
        data,
        isError: isErrorSimulate,
        error: errorSimulate,
    } = useSimulateContract({
        address: ATM_ADDRESS,
        abi,
        functionName: 'lockLeave',
    })

    const {
        writeContract,
        data: hash,
        reset,
        isSuccess,
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
        eventName: 'LockLeave',
        batch: true,
        onLogs: (_logs) => setLogs(_logs),
    })

    useEffect(() => {
        if (reset && hash && logs && logs.length > 0) {
            logs.forEach((log) => {
                if (hash && log.transactionHash == hash) {
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
        isSuccess: Boolean(!isLoading && isSuccess),
        hash,
    }
}
