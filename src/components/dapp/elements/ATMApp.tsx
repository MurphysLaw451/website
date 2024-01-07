import BigNumber from 'bignumber.js'
import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { RouteObject } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    useAccount,
    useBalance,
    useChainId,
    usePublicClient,
    useSwitchNetwork,
} from 'wagmi'
import { toPrecision } from '../../../helpers/number'
import { useAtmClaim } from '../../../hooks/atm/useAtmClaim'
import { useAtmDeposit } from '../../../hooks/atm/useAtmDeposit'
import { useAtmLockJoin } from '../../../hooks/atm/useAtmLockJoin'
import { useAtmLockLeave } from '../../../hooks/atm/useAtmLockLeave'
import { DgnxAtmStats, useAtmStats } from '../../../hooks/atm/useAtmStats'
import {
    DngxAtmStatsForQualifier,
    useAtmStatsForQualifier,
} from '../../../hooks/atm/useAtmStatsForQualifier'
import { Button } from '../../Button'
import { H2 } from '../../H2'
import { Spinner } from './Spinner'

const AtmLockRewardPreview = (props: {
    claimAmountWithLock: number
    claimAmountWithoutLock: number
}) => {
    return (
        <>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 ">
                <div className="font-bold">
                    Estimated DGNX amount with lock:
                </div>
                <div className="font-bold">
                    {toPrecision(props.claimAmountWithLock, 4)}* DGNX
                </div>
                <div className="mt-8 font-bold sm:mt-0">
                    Estimated DGNX amount without lock:
                </div>
                <div className="font-bold">
                    {toPrecision(props.claimAmountWithoutLock, 4)}* DGNX
                </div>
            </div>
            <div className=" mt-8 text-sm italic">
                * Please note that the DGNX amounts will adapt shortly before
                the claiming starts accordingly to the launch market price.
            </div>
        </>
    )
}

const AtmDepositForm = (props: {
    stats: DgnxAtmStats
    statsForQualifier: DngxAtmStatsForQualifier
}) => {
    const { address } = useAccount()
    const { data: nativeBalance } = useBalance({ address })
    const [depositAmount, setDepositAmount] = useState(0)
    const tokensToBurnInputRef = useRef<HTMLInputElement>()
    const minDeposit = new BigNumber(0.000000000000000001)

    const { write, isLoading, isSuccess, hash } = useAtmDeposit(
        BigNumber(
            depositAmount < minDeposit.toNumber()
                ? minDeposit.toString()
                : depositAmount
        ).multipliedBy(10 ** 18)
    )

    const maximum = useMemo(() => {
        return Math.min(
            Number(nativeBalance.value) / 10 ** 18,
            Number(
                props.stats.allocationLimit -
                    props.statsForQualifier.totalDeposited
            ) /
                10 ** 18
        )
    }, [props.stats, props.statsForQualifier, isSuccess, nativeBalance])

    return (
        <div>
            {!isLoading && (
                <>
                    {props.stats.allocationLimit -
                        props.statsForQualifier.totalDeposited >
                        0 && (
                        <>
                            <p className="mt-3 font-bold">
                                How much do you want to deposit?
                            </p>
                            <input
                                className="my-2 w-full rounded-xl border-2 border-degenOrange bg-light-100 py-2 text-2xl leading-3 text-light-800 ring-0 focus:border-degenOrange focus:shadow-none focus:outline-none focus:ring-0 dark:border-activeblue dark:bg-dark dark:text-light-200"
                                type="number"
                                placeholder="0"
                                disabled={isLoading}
                                max={maximum}
                                min={0.0001}
                                step={0.1}
                                onChange={(e) =>
                                    setDepositAmount(
                                        !!e.target.value
                                            ? parseFloat(e.target.value) <
                                              minDeposit.toNumber()
                                                ? parseFloat(
                                                      minDeposit.toString()
                                                  )
                                                : parseFloat(e.target.value)
                                            : 0
                                    )
                                }
                                ref={tokensToBurnInputRef}
                            />
                            <p
                                className="-mt-1 mr-3 cursor-pointer text-right underline"
                                onClick={() => {
                                    tokensToBurnInputRef.current.value = `${maximum}`
                                    setDepositAmount(maximum)
                                }}
                            >
                                MAX
                            </p>
                            {depositAmount > 0 && depositAmount > maximum && (
                                <>
                                    <p className="font-bold text-error">
                                        Deposit higher than maximum
                                    </p>
                                </>
                            )}
                            {props.stats.tokensPerOneNative > 0n && (
                                <>
                                    <AtmLockRewardPreview
                                        claimAmountWithLock={
                                            (depositAmount *
                                                Number(
                                                    props.stats
                                                        .tokensPerOneNative
                                                )) /
                                            10 ** 18
                                        }
                                        claimAmountWithoutLock={
                                            ((depositAmount *
                                                Number(
                                                    props.stats
                                                        .tokensPerOneNative
                                                )) /
                                                10 ** 18) *
                                            (1 +
                                                Number(
                                                    props.stats.totalRewardBps
                                                ) /
                                                    10000)
                                        }
                                    />
                                </>
                            )}
                            <Button
                                className="mt-3 w-full"
                                color={
                                    depositAmount == 0 ||
                                    depositAmount > maximum
                                        ? 'disabled'
                                        : 'orange'
                                }
                                disabled={
                                    depositAmount == 0 ||
                                    depositAmount > maximum
                                }
                                onClick={() => {
                                    if (
                                        BigNumber(
                                            tokensToBurnInputRef.current.value
                                        ).lt(minDeposit)
                                    ) {
                                        toast.error(
                                            'Please change the amount to at least 0.000000000000000001',
                                            { autoClose: 5000 }
                                        )
                                    } else {
                                        write()
                                    }
                                }}
                            >
                                Deposit
                            </Button>
                        </>
                    )}
                    {props.stats.allocationLimit -
                        props.statsForQualifier.totalDeposited ==
                        0n && (
                        <>
                            <p className="mt-4 font-bold text-success">
                                Your deposit limit is reached. You can&apos;t
                                deposit more ETH. Please wait until the claiming
                                phase starts. This will be announced through
                                Telegram
                            </p>
                        </>
                    )}
                </>
            )}

            {isLoading && (
                <div className="mt-5">
                    <Spinner />
                </div>
            )}

            {isSuccess && (
                <div className="mt-5 rounded-xl border-2 border-techGreen bg-broccoli p-3 font-bold">
                    Deposit success!{' '}
                    <a
                        href={`https://etherscan.io/tx/${hash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-degenOrange"
                    >
                        View tx
                    </a>
                </div>
            )}
        </div>
    )
}

const AtmCollection = (props: { stats: DgnxAtmStats }) => {
    const { stats } = props
    const { address } = useAccount()
    const statsForQualifier = useAtmStatsForQualifier(address)

    if (statsForQualifier.loading == 'yes') return null

    return (
        <div className="max-w-2xl">
            <H2>The ATM is currently accepting deposits!</H2>
            <div className="grid grid-cols-2">
                <div>Maximum deposit per wallet:</div>
                <div className="font-bold">
                    {Number(stats.allocationLimit) / 10 ** 18} ETH
                </div>
                {statsForQualifier.isWhitelisted && (
                    <>
                        <div>Amount you deposited:</div>
                        <div className="font-bold">
                            {Number(statsForQualifier.totalDeposited) /
                                10 ** 18}{' '}
                            ETH
                        </div>
                        <div>Amount you can still deposit:</div>
                        <div className="font-bold">
                            {Number(
                                stats.allocationLimit -
                                    statsForQualifier.totalDeposited
                            ) /
                                10 ** 18}{' '}
                            ETH
                        </div>
                    </>
                )}
                {!statsForQualifier.isWhitelisted && (
                    <div className="col-span-2 mt-5 font-bold text-error">
                        Your wallet is not whitelisted
                    </div>
                )}
            </div>

            {statsForQualifier.isWhitelisted && (
                <AtmDepositForm
                    stats={stats}
                    statsForQualifier={statsForQualifier}
                />
            )}
        </div>
    )
}

const AtmClaimForm = (props: {
    stats: DgnxAtmStats
    statsForQualifier: DngxAtmStatsForQualifier
}) => {
    const [blockTimeStamp, setBlockTimeStamp] = useState(0)
    const [actionInProgess, setActionInProgress] = useState(false)
    const publicClient = usePublicClient()

    const {
        write: claimWrite,
        isLoading: claimLoading,
        isSuccess: claimSuccess,
        hash: claimHash,
    } = useAtmClaim()

    const {
        write: lockJoinWrite,
        isLoading: lockJoinLoading,
        isSuccess: lockJoinSuccess,
        hash: lockJoinHash,
    } = useAtmLockJoin()
    const {
        write: lockLeaveWrite,
        isLoading: lockLeaveLoading,
        isSuccess: lockLeaveSuccess,
        hash: lockLeaveHash,
    } = useAtmLockLeave()

    useEffect(() => {
        publicClient
            .getBlock()
            .then((blkinfo) => setBlockTimeStamp(Number(blkinfo.timestamp)))
    }, [publicClient])

    const lockTimeProgress = useMemo(() => {
        return (
            (blockTimeStamp - Number(props.stats.lockPeriodStarts)) /
            Number(props.stats.lockPeriodInSeconds)
        )
    }, [props.stats, blockTimeStamp])

    const startTime = useMemo(() => {
        return new Date(
            Number(props.stats.lockPeriodStarts) * 1000
        ).toLocaleDateString(navigator.language, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        })
    }, [props.stats])

    const endTime = useMemo(() => {
        return new Date(
            Number(props.stats.lockPeriodEnds) * 1000
        ).toLocaleDateString(navigator.language, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        })
    }, [props.stats])

    if (props.statsForQualifier.hasClaimed) {
        return (
            <p className="font-bold text-success">
                You have claimed your{' '}
                {Number(props.statsForQualifier.claimedAmount) / 10 ** 18} DGNX
                share!
            </p>
        )
    }

    if (props.statsForQualifier.hasLocked) {
        return (
            <>
                <h2 className="mt-10 text-xl font-bold">Locked</h2>
                <p className="mt-2 font-bold">
                    {(
                        Number(props.statsForQualifier.lockedAmount) /
                        10 ** 18
                    ).toLocaleString('en', {
                        maximumFractionDigits: 3,
                    })}{' '}
                    DGNX
                </p>
                {!props.stats.lockPeriodActive && (
                    <>
                        <p className="mt10 font-bold">
                            What will happen next:
                            <br />
                            1. The lock or claim will run approx. 3 days from
                            start.
                            <br />
                            2. Lock period start will be announced in time in
                            the VC Telegram group
                        </p>
                    </>
                )}
                {props.stats.lockPeriodActive && (
                    <>
                        <h2 className="mt-10 text-xl font-bold">
                            Collected Rewards
                        </h2>
                        <div className="relative flex flex-col overflow-clip">
                            <div
                                className="mb-1 mt-2 whitespace-nowrap text-center"
                                style={{
                                    width: `${lockTimeProgress * 100}%`,
                                }}
                            >
                                {(
                                    Number(
                                        props.statsForQualifier
                                            .currentRewardAmount
                                    ) /
                                    10 ** 18
                                ).toLocaleString('en', {
                                    maximumFractionDigits: 3,
                                })}{' '}
                                DGNX
                            </div>
                            <div className="absolute right-0 leading-[2.5rem]">
                                {(
                                    Number(
                                        props.statsForQualifier
                                            .estimatedTotalRewardAmount
                                    ) /
                                    10 ** 18
                                ).toLocaleString('en', {
                                    maximumFractionDigits: 3,
                                })}{' '}
                                DGNX
                            </div>
                        </div>

                        <div className="mb-1 h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                                className="h-2.5 rounded-r-full bg-degenOrange"
                                style={{
                                    width: `${lockTimeProgress * 100}%`,
                                }}
                            ></div>
                        </div>

                        <div className="flex">
                            <div>{startTime}</div>
                            <div className="flex-grow" />
                            <div>{endTime}</div>
                        </div>
                    </>
                )}
                <div className="my-6 font-bold">
                    {!lockLeaveLoading && !lockLeaveSuccess && (
                        <>
                            <Button
                                className="my-3 w-full"
                                color="orange"
                                onClick={() => lockLeaveWrite()}
                            >
                                Claim now
                            </Button>
                        </>
                    )}
                    {lockLeaveLoading && <Spinner />}
                    {lockLeaveSuccess && (
                        <>
                            Success!
                            <div className="cursor-pointer rounded-xl border-2 border-techGreen bg-broccoli p-3 font-bold transition-colors hover:bg-techGreen">
                                <a
                                    href={`https://etherscan.io/tx/${lockLeaveHash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="h-full w-full"
                                >
                                    View tx
                                </a>
                            </div>
                        </>
                    )}
                </div>
                <p className="italic">
                    <span className="font-bold">Important:</span> You can claim
                    your tokens at any time. Once you&apos;ve claimed your
                    tokens, you&apos;re no longer eligible to rejoin the extra
                    reward program. If you claim your tokens prior to the end of
                    the 365 day period, any extra rewards will be charged with a{' '}
                    {Number(props.stats.rewardPenaltyBps) / 100}% loyalty
                    penalty.
                </p>
            </>
        )
    } else {
        return (
            <>
                <p className="font-bold">
                    Lock your{' '}
                    {Number(
                        props.statsForQualifier.estimatedTotalClaimAmount -
                            props.statsForQualifier.estimatedTotalRewardAmount
                    ) /
                        10 ** 18}{' '}
                    DGNX in the next 3 days to receive{' '}
                    {Number(props.statsForQualifier.estimatedTotalClaimAmount) /
                        10 ** 18}{' '}
                    DGNX over 365 days, or claim your DNGX right now!
                </p>
                <div className="mt-5 flex w-full flex-col items-center">
                    <div className="relative flex items-center rounded-xl border-2 border-activeblue bg-darkblue p-5 font-bold">
                        <div className="flex w-48 justify-center">
                            Invested{' '}
                            {Number(props.statsForQualifier.totalDeposited) /
                                10 ** 18}{' '}
                            ETH
                        </div>
                        <div className="z-1 absolute left-1/2 top-[calc(100%+0.1rem)] h-[4.4rem] w-[2px] bg-activeblue" />
                        <div
                            className={clsx(
                                'z-1 absolute -left-6 top-[calc(100%+4.4rem)] h-12 w-[2px]',
                                props.stats.lockPeriodActive
                                    ? 'bg-darkblue'
                                    : 'bg-activeblue'
                            )}
                        />
                        <div className="z-1 absolute -right-6 top-[calc(100%+4.4rem)] h-12 w-[2px] bg-activeblue" />
                        <div
                            className={clsx(
                                'z-1 absolute -left-6 top-[calc(100%+4.4rem)] h-[2px] w-[8.8rem]',
                                props.stats.lockPeriodActive
                                    ? 'bg-darkblue'
                                    : 'bg-activeblue'
                            )}
                        />
                        <div className="z-1 absolute -right-6 top-[calc(100%+4.4rem)] h-[2px] w-[8.8rem] bg-activeblue" />
                    </div>
                    <div className="h-24" />
                    <div className="mt-5 grid grid-cols-2 gap-16">
                        <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-activeblue bg-darkblue p-5 font-bold text-success">
                            {!lockJoinLoading && !lockJoinSuccess && (
                                <>
                                    <Button
                                        className="w-full"
                                        color={
                                            props.stats.lockPeriodActive
                                                ? 'disabled'
                                                : 'orange'
                                        }
                                        onClick={() => lockJoinWrite()}
                                    >
                                        Lock
                                    </Button>
                                    {props.stats.lockPeriodActive ? (
                                        'Lock option expired'
                                    ) : (
                                        <span className="text-center">
                                            Lock for{' '}
                                            {Number(
                                                props.statsForQualifier
                                                    .estimatedTotalClaimAmount
                                            ) /
                                                10 ** 18}{' '}
                                            DGNX <br />
                                            <span className="font-bold">
                                                over time
                                            </span>
                                        </span>
                                    )}
                                </>
                            )}
                            {lockJoinLoading && <Spinner />}
                            {lockJoinSuccess && (
                                <>
                                    Success!
                                    <div className="cursor-pointer rounded-xl border-2 border-techGreen bg-broccoli p-3 font-bold transition-colors hover:bg-techGreen">
                                        <a
                                            href={`https://etherscan.io/tx/${lockJoinHash}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="h-full w-full"
                                        >
                                            View tx
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-activeblue bg-darkblue p-5 font-bold">
                            {!claimLoading && !claimSuccess && (
                                <>
                                    <Button
                                        className="w-full"
                                        color="orange"
                                        disabled={
                                            lockJoinLoading || claimLoading
                                        }
                                        onClick={() => claimWrite()}
                                    >
                                        Claim
                                    </Button>
                                    Receive{' '}
                                    {Number(
                                        props.statsForQualifier
                                            .estimatedTotalClaimAmount -
                                            props.statsForQualifier
                                                .estimatedTotalRewardAmount
                                    ) /
                                        10 ** 18}{' '}
                                    DGNX
                                </>
                            )}
                            {claimLoading && <Spinner />}
                            {claimSuccess && (
                                <>
                                    Success!
                                    <div className="cursor-pointer rounded-xl border-2 border-techGreen bg-broccoli p-3 font-bold transition-colors hover:bg-techGreen">
                                        <a
                                            href={`https://etherscan.io/tx/${claimHash}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="h-full w-full"
                                        >
                                            View tx
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const AtmClaiming = (props: { stats: DgnxAtmStats }) => {
    const { stats } = props
    const { address } = useAccount()
    const statsForQualifier = useAtmStatsForQualifier(address)

    if (statsForQualifier.loading == 'yes') return null

    return (
        <div className="max-w-2xl">
            <H2>The ATM is currently accepting claims!</H2>
            {statsForQualifier.totalDeposited <= 0n ? (
                <p className="font-bold text-error">This wallet has no claim</p>
            ) : (
                <AtmClaimForm
                    stats={stats}
                    statsForQualifier={statsForQualifier}
                />
            )}
        </div>
    )
}

export const ATMApp = (props: RouteObject) => {
    const { address, isConnected } = useAccount()
    const stats = useAtmStats()
    const statsForQualifier = useAtmStatsForQualifier(address)
    const chainId = useChainId()
    const { switchNetwork } = useSwitchNetwork()

    if (!isConnected) {
        return <div className="font-bold">Please connect wallet</div>
    }

    if (chainId !== 1 && chainId !== 5) {
        return (
            <div className="max-w-2xl">
                <div className="font-bold">
                    The ATM is only available on ETH
                </div>
                <Button
                    className="mt-3 w-full"
                    color="orange"
                    onClick={() => switchNetwork(1)}
                >
                    Switch to ETH
                </Button>
            </div>
        )
    }

    if (stats.loading === 'yes' || statsForQualifier.loading === 'yes') {
        return null
    }

    if (!stats.collecting && !stats.claiming && stats.totalDeposits === 0n) {
        return <div className="font-bold">The ATM is currently offline</div>
    }

    if (!stats.collecting && !stats.claiming && stats.totalDeposits > 0n) {
        return (
            <>
                <div className="mb-8 font-bold">
                    The collection phase has finished. Please wait until the
                    claiming starts. It&apos;ll be announced in the VC Telegram
                    group.
                </div>
                <div className="mb-8 font-bold">
                    Total amount collected: <br className="sm:hidden" />
                    {Number(stats.totalDeposits) / 10 ** 18} ETH
                </div>
                <div className="text-xl font-bold">
                    Your deposited amount: <br className="sm:hidden" />
                    {Number(statsForQualifier.totalDeposited) / 10 ** 18} ETH
                </div>
                <AtmLockRewardPreview
                    claimAmountWithLock={
                        Number(statsForQualifier.estimatedTotalClaimAmount) /
                        10 ** 18
                    }
                    claimAmountWithoutLock={
                        Number(
                            statsForQualifier.estimatedTotalClaimAmount -
                                statsForQualifier.estimatedTotalRewardAmount
                        ) /
                        10 ** 18
                    }
                />
            </>
        )
    }

    if (stats.collecting) {
        return <AtmCollection stats={stats} />
    }

    if (stats.claiming) {
        return <AtmClaiming stats={stats} />
    }
}
