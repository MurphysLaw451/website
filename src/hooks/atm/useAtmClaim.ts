import { useCallback, useEffect, useState } from 'react'
import {
    useAccount,
    useSimulateContract,
    useWatchContractEvent,
    useWriteContract,
} from 'wagmi'
import abi from '@dappabis/degenAtm.json'
import { ATM_ADDRESS } from '@dappconstants'

export const useAtmClaim = () => {
    const { address } = useAccount()
    const [logs, setLogs] = useState<any[]>()
    const [isLoading, setIsLoading] = useState<boolean>()
    const [claimedAmount, setClaimedAmount] = useState<bigint>()

    const {
        data,
        isError: isErrorSimulate,
        error: errorSimulate,
    } = useSimulateContract({
        address: ATM_ADDRESS,
        abi,
        functionName: 'claimTokens',
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
        args: {
            claimer: address,
        },
        eventName: 'Claimed',
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
