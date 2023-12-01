import BigNumber from 'bignumber.js'
import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { RouteObject } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    useAccount,
    useBalance,
    useChainId,
    useClient,
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
                * Please note that the amounts will most likely change before
                the claiming starts because these amounts are based on the
                launch market price.
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
        return BigNumber.min(
            new BigNumber(nativeBalance.value.toString()).div(10 ** 18),
            props.stats.allocationLimit
                .div(10 ** 18)
                .minus(props.statsForQualifier.totalDeposited.div(10 ** 18))
        ).toNumber()
    }, [props.stats, props.statsForQualifier, isSuccess, nativeBalance])

    return (
        <div>
            {!isLoading && (
                <>
                    {props.stats.allocationLimit
                        .minus(props.statsForQualifier.totalDeposited)
                        .gt(0) && (
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
                            {props.stats.tokensPerOneNative.gt(0) && (
                                <>
                                    <AtmLockRewardPreview
                                        claimAmountWithLock={
                                            depositAmount *
                                            props.stats.tokensPerOneNative
                                                .div(10 ** 18)
                                                .toNumber()
                                        }
                                        claimAmountWithoutLock={
                                            depositAmount *
                                            props.stats.tokensPerOneNative
                                                .div(10 ** 18)
                                                .toNumber() *
                                            (1 +
                                                props.stats.totalRewardBps.toNumber() /
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
                                    console.log(
                                        BigNumber(
                                            tokensToBurnInputRef.current.value
                                        ).lt(minDeposit)
                                    )
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
                    {props.stats.allocationLimit
                        .minus(props.statsForQualifier.totalDeposited)
                        .eq(0) && (
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
                <div>Total deposits:</div>
                <div className="font-bold">
                    {stats.totalDeposits.div(10 ** 18).toString()} ETH
                </div>
                <div>Maximum deposit per wallet:</div>
                <div className="font-bold">
                    {stats.allocationLimit.div(10 ** 18).toNumber()} ETH
                </div>
                {statsForQualifier.isWhitelisted && (
                    <>
                        <div>Amount you deposited:</div>
                        <div className="font-bold">
                            {statsForQualifier.totalDeposited
                                .div(10 ** 18)
                                .toNumber()}{' '}
                            ETH
                        </div>
                        <div>Amount you can still deposit:</div>
                        <div className="font-bold">
                            {stats.allocationLimit.div(10 ** 18).toNumber() -
                                statsForQualifier.totalDeposited
                                    .div(10 ** 18)
                                    .toNumber()}{' '}
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
    const client = useClient()

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
        client
            .getProvider()
            .getBlockNumber()
            .then((blkno) =>
                client
                    .getProvider()
                    .getBlock(blkno)
                    .then((blkinfo) => setBlockTimeStamp(blkinfo.timestamp))
            )
    }, [client])

    const lockTimeProgress = useMemo(() => {
        return (
            (blockTimeStamp - props.stats.lockPeriodStarts.toNumber()) /
            props.stats.lockPeriodInSeconds.toNumber()
        )
    }, [props.stats, blockTimeStamp])

    const startTime = useMemo(() => {
        return new Date(
            props.stats.lockPeriodStarts.toNumber() * 1000
        ).toLocaleDateString('en-US')
    }, [props.stats])

    const endTime = useMemo(() => {
        return new Date(
            props.stats.lockPeriodEnds.toNumber() * 1000
        ).toLocaleDateString('en-US')
    }, [props.stats])

    if (props.statsForQualifier.hasClaimed) {
        return (
            <p className="font-bold text-success">
                You have claimed your{' '}
                {props.statsForQualifier.claimedAmount.div(10 ** 18).toNumber()}{' '}
                DGNX share!
            </p>
        )
    }

    if (props.statsForQualifier.hasLocked) {
        return (
            <>
                <p className="mb-4 font-bold">
                    You have locked{' '}
                    {props.statsForQualifier.lockedAmount
                        .div(10 ** 18)
                        .toNumber()}{' '}
                    DGNX.
                </p>
                <p className="mb-4 font-bold">
                    During the lock period, you can view the status of your
                    collected rewards right here.
                </p>
                <p className=" italic">
                    <span className="font-bold">Important:</span> You can claim
                    your tokens at all time. Once you&apos;ve claimed your
                    tokens, your not eligible to join the locking program
                    anymore. If you claim your tokens during the lock period of
                    365 days, your already collected rewards will be charged
                    with a {props.stats.rewardPenaltyBps.toNumber() / 100}%
                    loyalty penalty.
                </p>

                {props.stats.lockPeriodActive && (
                    <>
                        <div className="my-1 mt-4 flex h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                                className="flex h-6 items-center justify-center gap-3 rounded-full bg-degenOrange font-bold leading-none"
                                style={{ width: `${lockTimeProgress * 100}%` }}
                            >
                                {lockTimeProgress > 0.5 && (
                                    <span className="text-black">
                                        {props.statsForQualifier.currentRewardAmount
                                            .div(10 ** 18)
                                            .toNumber()}{' '}
                                        DGNX /{' '}
                                        {props.statsForQualifier.estimatedTotalRewardAmount
                                            .div(10 ** 18)
                                            .toNumber()}{' '}
                                        DGNX
                                    </span>
                                )}
                            </div>
                            {lockTimeProgress <= 0.5 && (
                                <div className="ml-3 font-bold text-white">
                                    {props.statsForQualifier.currentRewardAmount
                                        .div(10 ** 18)
                                        .toNumber()}{' '}
                                    DGNX /{' '}
                                    {props.statsForQualifier.estimatedTotalRewardAmount
                                        .div(10 ** 18)
                                        .toNumber()}{' '}
                                    DGNX
                                </div>
                            )}
                        </div>
                        <div className="flex">
                            <div>{startTime}</div>
                            <div className="flex-grow" />
                            <div>{endTime}</div>
                        </div>
                    </>
                )}
                <div className="mt-6 font-bold">
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
            </>
        )
    } else {
        return (
            <>
                <p className="font-bold">
                    Claim your DNGX now, or lock them for an additional reward!
                </p>
                <div className="mt-5 flex w-full flex-col items-center">
                    <div className="relative flex items-center rounded-xl border-2 border-activeblue bg-darkblue p-5 font-bold">
                        <div className="flex w-48 justify-center">
                            Invested{' '}
                            {props.statsForQualifier.totalDeposited
                                .div(10 ** 18)
                                .toNumber()}{' '}
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
                                        <span>
                                            Receive{' '}
                                            {toPrecision(
                                                props.statsForQualifier.estimatedTotalClaimAmount
                                                    .div(10 ** 18)
                                                    .toNumber(),
                                                4
                                            )}{' '}
                                            DGNX
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
                                        onClick={() => claimWrite()}
                                    >
                                        Claim
                                    </Button>
                                    Receive{' '}
                                    {toPrecision(
                                        props.statsForQualifier.estimatedTotalClaimAmount
                                            .div(10 ** 18)
                                            .toNumber() -
                                            props.statsForQualifier.estimatedTotalRewardAmount
                                                .div(10 ** 18)
                                                .toNumber(),
                                        4
                                    )}{' '}
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
            {statsForQualifier.totalDeposited.lte(0) ? (
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

    if (stats.loading === 'yes' || statsForQualifier.loading === 'yes') {
        return null
    }

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

    if (!stats.collecting && !stats.claiming && stats.totalDeposits.eq(0)) {
        return <div className="font-bold">The ATM is currently offline</div>
    }

    if (!stats.collecting && !stats.claiming && stats.totalDeposits.gt(0)) {
        return (
            <>
                <div className="mb-8 font-bold">
                    The collection phase has finished. Please wait until the
                    claiming starts. It'll be announced in the VC Telegram
                    group.
                </div>
                <div className="mb-8 font-bold">
                    Total amount collected: <br className="sm:hidden" />
                    {stats.totalDeposits.div(10 ** 18).toNumber()} ETH
                </div>
                <div className="text-xl font-bold">
                    Your deposited amount: <br className="sm:hidden" />
                    {statsForQualifier.totalDeposited
                        .div(10 ** 18)
                        .toNumber()}{' '}
                    ETH
                </div>
                <AtmLockRewardPreview
                    claimAmountWithLock={statsForQualifier.estimatedTotalClaimAmount
                        .div(10 ** 18)
                        .toNumber()}
                    claimAmountWithoutLock={statsForQualifier.estimatedTotalClaimAmount
                        .minus(statsForQualifier.estimatedTotalRewardAmount)
                        .div(10 ** 18)
                        .toNumber()}
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
