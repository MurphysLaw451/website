import {
    useSimulateContract,
    useWatchContractEvent,
    useWriteContract,
} from 'wagmi'

import { useCallback, useEffect, useState } from 'react'
import abi from '../../abi/degenAtm.json'
import { ATM_ADDRESS } from '../../constants'

export const useAtmLockJoin = () => {
    const [logs, setLogs] = useState<any[]>()
    const [isLoading, setIsLoading] = useState<boolean>()

    const {
        data,
        isError: isErrorSimulate,
        error: errorSimulate,
    } = useSimulateContract({
        address: ATM_ADDRESS,
        abi,
        functionName: 'lockJoin',
    })

    const {
        writeContract,
        data: hash,
        reset,
        error: errorWrite,
        isError: isErrorWrite,
        isSuccess,
    } = useWriteContract()

    const write = useCallback(() => {
        setIsLoading(true)
        data && writeContract && writeContract(data.request)
    }, [data, writeContract])

    useWatchContractEvent({
        address: ATM_ADDRESS,
        abi,
        eventName: 'LockJoin',
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
