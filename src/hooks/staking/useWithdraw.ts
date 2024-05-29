import abi from '@dappabis/stakex/abi-ui.json'
import { useCallback, useEffect, useState } from 'react'
import { Address } from 'viem'
import {
    useBlockNumber,
    usePublicClient,
    useSimulateContract,
    useWriteContract,
} from 'wagmi'

export const useWithdraw = (
    enabled: boolean,
    address: Address,
    tokenId: bigint,
    target: Address
) => {
    const [logs, setLogs] = useState<any[]>()
    const [isLoading, setIsLoading] = useState<boolean>()

    const [claimedAmount, setClaimedAmount] = useState<bigint>()
    const [withdrawnAmount, setWithdrawnAmount] = useState<bigint>()
    const [feeAmount, setFeeAmount] = useState<bigint>()
    const {
        data,
        isError: isErrorSimulate,
        error: errorSimulate,
    } = useSimulateContract({
        address,
        abi,
        functionName: 'unstake',
        args: [tokenId, target],
        query: {
            enabled,
        },
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

    const publicClient = usePublicClient()

    const { data: dataBlockNumber } = useBlockNumber({
        watch: Boolean(isLoading),
    })

    useEffect(() => {
        if (publicClient && dataBlockNumber)
            publicClient
                .getContractEvents({
                    address,
                    abi,
                    eventName: 'Unstaked',
                    fromBlock: dataBlockNumber - 1n,
                })
                .then((_logs) => setLogs(_logs))
                .catch((reason) => console.log('[ERROR]', { reason }))
    }, [publicClient, dataBlockNumber, address])

    useEffect(() => {
        if (reset && hash && logs && logs.length > 0) {
            logs.forEach((log) => {
                if (hash && log.transactionHash == hash) {
                    setClaimedAmount(log.args.rewardAmount)
                    setWithdrawnAmount(log.args.unstakeAmount)
                    setFeeAmount(log.args.fee)
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
        isSuccess: Boolean(!isLoading && claimedAmount && withdrawnAmount),
        claimedAmount,
        withdrawnAmount,
        feeAmount,
        hash,
    }
}
