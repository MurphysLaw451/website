import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { RouteObject } from 'react-router-dom'
import { useCountdownTimer } from 'use-countdown-timer'
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWalletClient,
} from 'wagmi'
import abi from './../../../abi/disburser.json'
import { Button } from './../../Button'
import { Spinner } from './Spinner'

const DISBURSER_ADDRESS = '0x8a0E3264Da08bf999AfF5a50AabF5d2dc89fab79'

const countdownStr = (s: number) => {
    const d = Math.floor(s / (3600 * 24))
    s -= d * 3600 * 24
    const h = Math.floor(s / 3600)
    s -= h * 3600
    const m = Math.floor(s / 60)
    s -= m * 60
    const tmp = []
    d && tmp.push(d + 'd')
    ;(d || h) && tmp.push(h + 'h')
    ;(d || h || m) && tmp.push(m + 'm')
    tmp.push(s + 's')
    return tmp.join(' ')
}

const Countdown = (props: { seconds: bigint }) => {
    const { countdown, start, isRunning } = useCountdownTimer({
        timer: parseInt((1000n * props.seconds).toString()),
    })

    useEffect(() => {
        if (!isRunning) {
            start()
        }
    }, [isRunning])

    return <div>Claim in {countdownStr(countdown / 1000)}</div>
}

const ClaimButton = (props: { amount: string | number }) => {
    const { config } = usePrepareContractWrite({
        address: DISBURSER_ADDRESS,
        abi,
        functionName: 'claim',
    })

    const {
        data,
        isLoading: claimLoading,
        isSuccess: claimSuccess,
        write: claim,
    } = useContractWrite(config)

    if (claimLoading) {
        return (
            <Button className="mt-3 w-full" color="orangeDisabled">
                Loading...
            </Button>
        )
    }

    if (claimSuccess) {
        return (
            <Button className="mt-3 w-full" color="orangeDisabled">
                Claim success!
            </Button>
        )
    }

    return (
        <Button className="mt-3 w-full" color="orange" onClick={() => claim()}>
            Claim {props.amount} now!
        </Button>
    )
}

const Dapp = () => {
    const { address } = useAccount()
    const { data: walletClient } = useWalletClient()

    const { data: amountLeft, isLoading: amountLeftLoading } = useContractRead({
        address: DISBURSER_ADDRESS,
        abi,
        functionName: 'amountLeft',
        args: [address],
    })

    const { data: paidOut, isLoading: paidOutLoading } = useContractRead({
        address: DISBURSER_ADDRESS,
        abi,
        functionName: 'paidOutAmounts',
        args: [address],
    })

    const {
        data: timeUntilNextClaimBN,
        isLoading: timeUntilNextClaimBNLoading,
    } = useContractRead({
        address: DISBURSER_ADDRESS,
        abi,
        functionName: 'timeLeftUntilNextClaim',
        args: [address],
    })

    const { data: claimEstimate, isLoading: claimEstimateLoading } =
        useContractRead({
            address: DISBURSER_ADDRESS,
            abi,
            functionName: 'claimEstimate',
            account: walletClient?.account,
        })

    const claimableAmount = claimEstimateLoading
        ? 0
        : `${(
              parseInt((claimEstimate as any).claimable as string) /
              Math.pow(10, 18)
          ).toFixed(4)}`

    const timeUntilNextClaim = timeUntilNextClaimBNLoading
        ? 0n
        : (timeUntilNextClaimBN as bigint)
    const amountLeftStr = amountLeftLoading
        ? '...'
        : `${(parseInt(amountLeft as string) / Math.pow(10, 18)).toFixed(4)}`
    const amountClaimedStr = paidOutLoading
        ? '...'
        : `${(parseInt(paidOut as string) / Math.pow(10, 18)).toFixed(4)}`

    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-activeblue bg-dark p-3">
                    <h2 className="text-2xl font-bold">Claimed</h2>
                    <div className="mt-3 text-xl">{amountClaimedStr} DGNX</div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-activeblue bg-dark p-3">
                    <h2 className="text-2xl font-bold">Left to claim</h2>
                    <div className="mt-3 text-xl">{amountLeftStr} DGNX</div>
                </div>
            </div>
            <div className="mt-6 flex w-full items-center justify-center">
                {timeUntilNextClaim > 0 ? (
                    <Button className="mt-3 w-full" color="orangeDisabled">
                        <Countdown seconds={timeUntilNextClaim} />
                    </Button>
                ) : (
                    <ClaimButton amount={claimableAmount} />
                )}
            </div>
        </>
    )
}

export const DisburserApp = (props: RouteObject) => {
    const { address, isConnected } = useAccount()
    const { data: hasAmountLeft, isLoading } = useContractRead({
        address: DISBURSER_ADDRESS,
        abi,
        functionName: 'hasAmountLeft',
        args: [address],
    })

    if (!isConnected) {
        return <div className="font-bold">Please connect wallet</div>
    }

    if (isLoading) {
        return (
            <div className="flex w-full items-center justify-center">
                <Spinner />
            </div>
        )
    }

    if (hasAmountLeft) {
        return <Dapp />
    }

    return (
        <div>
            Unfortunately you don&apos;t have a claim on the legacy disburser
            (anymore).
        </div>
    )
}
