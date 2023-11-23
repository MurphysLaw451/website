import { RouteObject } from "react-router-dom"
import { useAccount, useChainId, useContractRead, useSwitchNetwork } from "wagmi"
import { Button } from "../../Button";
import { H2 } from "../../H2";
import { useMemo, useRef, useState } from "react";
import { DgnxAtmStats, useAtmStats } from "../../../hooks/atm/useAtmStats";
import { DngxAtmStatsForQualifier, useAtmStatsForQualifier } from "../../../hooks/atm/useAtmStatsForQualifier";
import { toPrecision } from "../../../helpers/number";
import clsx from "clsx";
import { useAtmDeposit } from "../../../hooks/atm/useAtmDeposit";
import BigNumber from "bignumber.js";
import { Spinner } from "./Spinner";
import { useAtmClaim } from "../../../hooks/atm/useAtmClaim";
import { useAtmLockJoin } from "../../../hooks/atm/useAtmLockJoin";
import { useAtmLockLeave } from "../../../hooks/atm/useAtmLockLeave";

const AtmDepositForm = (props: { stats: DgnxAtmStats; statsForQualifier: DngxAtmStatsForQualifier }) => {
    const [depositAmount, setDepositAmount] = useState(0);
    const tokensToBurnInputRef = useRef<HTMLInputElement>();

    const { write, isLoading, isSuccess, hash } = useAtmDeposit(BigNumber(depositAmount).pow(10, 18))
console.log(write)
    const maximum = useMemo(() => {
        return props.stats.allocationLimit.div(10 ** 18).toNumber() - props.statsForQualifier.totalDeposited.div(10 ** 18).toNumber();
    }, [props.stats, props.statsForQualifier]);

    return (
        <div>
            {!isSuccess && !isLoading && <>
                <p className="font-bold mt-3">How much do you want to deposit?</p>
                <input
                    className="my-2 w-full rounded-xl border-2 border-degenOrange bg-light-100 py-2 text-2xl leading-3 text-light-800 ring-0 focus:border-degenOrange focus:shadow-none focus:outline-none focus:ring-0 dark:border-activeblue dark:bg-dark dark:text-light-200"
                    type="number"
                    placeholder="0"
                    disabled={isLoading}
                    max={maximum}
                    onChange={(e) =>
                        setDepositAmount(parseFloat(e.target.value))
                    }
                    ref={tokensToBurnInputRef}
                />
                <p
                    className="text-right mr-3 underline -mt-1 cursor-pointer"
                    onClick={() => {
                        tokensToBurnInputRef.current.value = `${maximum}`
                        setDepositAmount(maximum)
                    }}
                >MAX</p>
            </>}

            {depositAmount > 0 && depositAmount < maximum && <>
                {!isLoading && !hash && <>
                    <Button
                        className="w-full mt-3"
                        color="orange"
                        onClick={() => write()}
                    >
                        Deposit
                    </Button>
                    <div className="grid grid-cols-2 font-bold mt-5">
                        <div>Amount received with lock:</div><div>{toPrecision(depositAmount * props.stats.tokensPerOneNative.toNumber() * (1 + props.stats.totalRewardBps.toNumber() / 10000), 4)} DGNX</div>
                        <div>Amount received without lock:</div><div>{toPrecision(depositAmount * props.stats.tokensPerOneNative.toNumber(), 4)} DGNX</div>
                    </div>
                </>}
            </>}

            {isLoading && <div className="mt-5"><Spinner /></div>}
            {isSuccess && <div className="border-2 bg-broccoli border-techGreen p-3 rounded-xl font-bold mt-5">
                Deposit success! <a href={`https://etherscan.io/tx/${hash}`} target="_blank" rel="noreferrer" className="text-degenOrange">View tx</a>
            </div>}

            {depositAmount > 0 && depositAmount > maximum && <>
                <p className="text-error font-bold">Deposit higher than maximum</p>
            </>}
        </div>
    )
}

const AtmCollection = (props: { stats: DgnxAtmStats }) => {
    const { stats } = props;
    const { address } = useAccount();
    const statsForQualifier = useAtmStatsForQualifier(address);

    return (
        <div className="max-w-2xl">
            <H2>The ATM is currently accepting deposits!</H2>
            <div className="grid grid-cols-2">
                <div>Total deposits this round:</div><div className="font-bold">{stats.totalDeposits.div(10 ** 18).toString()} ETH</div>
                <div>Maximum deposit per wallet:</div><div className="font-bold">{stats.allocationLimit.div(10 ** 18).toNumber()} ETH</div>
                {statsForQualifier.isWhitelisted && <><div>Amount you deposited:</div><div className="font-bold">{statsForQualifier.totalDeposited.div(10 ** 18).toNumber()} ETH</div></>}
                {statsForQualifier.isWhitelisted && <><div>Amount you can still deposit:</div><div className="font-bold">{stats.allocationLimit.div(10 ** 18).toNumber() - statsForQualifier.totalDeposited.div(10 ** 18).toNumber()} ETH</div></>}
                {!statsForQualifier.isWhitelisted && <div className="col-span-2 font-bold text-error mt-5">Your wallet is not whitelisted</div>}
            </div>

            {statsForQualifier.isWhitelisted && <AtmDepositForm stats={stats} statsForQualifier={statsForQualifier} />}
        </div>
    );
};

const AtmClaimForm = (props: { stats: DgnxAtmStats; statsForQualifier: DngxAtmStatsForQualifier}) => {
    const lockTimeProgress = useMemo(() => {
        return 1 - (props.stats.lockPeriodEnds.toNumber() - Math.floor(new Date().getTime() / 1000)) / props.stats.lockPeriodInSeconds.toNumber()
    }, [props.stats]);

    const startTime = useMemo(() => {
        return new Date(props.stats.lockPeriodStarts.toNumber() * 1000).toLocaleDateString("en-US")
    }, [props.stats]);

    const endTime = useMemo(() => {
        return new Date(props.stats.lockPeriodEnds.toNumber() * 1000).toLocaleDateString("en-US")
    }, [props.stats]);

    const { write: claimWrite, isLoading: claimLoading, isSuccess: claimSuccess, hash: claimHash } = useAtmClaim();
    const { write: lockJoinWrite, isLoading: lockJoinLoading, isSuccess: lockJoinSuccess, hash: lockJoinHash } = useAtmLockJoin();
    const { write: lockLeaveWrite, isLoading: lockLeaveLoading, isSuccess: lockLeaveSuccess, hash: lockLeaveHash } = useAtmLockLeave();

    if (props.statsForQualifier.hasClaimed) {
        return <p className="text-success font-bold">You have claimed your {props.statsForQualifier.claimedAmount.toNumber()} DGNX share!</p>
    }

    if (props.statsForQualifier.hasLocked) {
        return (
            <>
                <p className="font-bold">You have locked your tokens. You can view the status here and claim now if you want, for a {props.stats.rewardPenaltyBps.toNumber() / 100}% penalty.</p>

                <div className="mt-4 w-full bg-gray-200 rounded-full h-6 dark:bg-gray-700 my-1 flex">
                    <div className="bg-degenOrange font-bold gap-3 justify-center flex items-center h-6 leading-none rounded-full" style={{ width: `${lockTimeProgress * 100}%` }}>
                        {lockTimeProgress > 0.5 && <span className="text-black">{props.statsForQualifier.currentRewardAmount.toNumber()} DGNX / {props.statsForQualifier.estimatedTotalClaimAmount.toNumber() + props.statsForQualifier.estimatedTotalRewardAmount.toNumber()} DGNX</span>}
                    </div>
                    {lockTimeProgress <= 0.5 && <div className="text-white font-bold ml-3">{props.statsForQualifier.currentRewardAmount.toNumber()} DGNX / {props.statsForQualifier.estimatedTotalClaimAmount.toNumber() + props.statsForQualifier.estimatedTotalRewardAmount.toNumber()} DGNX</div>}
                </div>
                <div className="flex">
                    <div>{startTime}</div>
                    <div className="flex-grow" />
                    <div>{endTime}</div>
                </div>
                <div className="mt-6 font-bold">
                    {!lockLeaveLoading && !lockLeaveSuccess && <>
                        <Button
                            className="w-full my-3"
                            color="orange"
                            onClick={() => lockLeaveWrite()}
                        >
                            Claim now
                        </Button>
                    </>}
                    {lockLeaveLoading && <Spinner />}
                    {lockLeaveSuccess && <>
                        Success!
                        <div className="border-2 bg-broccoli border-techGreen p-3 rounded-xl font-bold cursor-pointer hover:bg-techGreen transition-colors">
                            <a href={`https://etherscan.io/tx/${lockLeaveHash}`} target="_blank" rel="noreferrer" className="w-full h-full">View tx</a>
                        </div>
                    </>}
                </div>
            </>
        )
    } else {
        return (
            <>
                <p className="font-bold">Claim your DNGX now, or lock them for an additional reward!</p>
                <div className="flex flex-col w-full items-center mt-5">
                    <div className="relative bg-darkblue rounded-xl p-5 border-2 border-activeblue font-bold flex items-center">
                        <div className="w-48 flex justify-center">Invested {props.statsForQualifier.totalDeposited.div(10 ** 18).toNumber()} ETH</div>
                        <div className="absolute bg-activeblue h-[4.4rem] z-1 w-[2px] left-1/2 top-[calc(100%+0.1rem)]" />
                        <div className={clsx("absolute h-12 z-1 w-[2px] -left-6 top-[calc(100%+4.4rem)]", props.stats.lockPeriodActive ? 'bg-darkblue' : 'bg-activeblue')} />
                        <div className="absolute bg-activeblue h-12 z-1 w-[2px] -right-6 top-[calc(100%+4.4rem)]" />
                        <div className={clsx("absolute h-[2px] z-1 w-[8.8rem] -left-6 top-[calc(100%+4.4rem)]", props.stats.lockPeriodActive ? 'bg-darkblue' : 'bg-activeblue')} />
                        <div className="absolute bg-activeblue h-[2px] z-1 w-[8.8rem] -right-6 top-[calc(100%+4.4rem)]" />
                    </div>
                    <div className="h-24" />
                    <div className="grid grid-cols-2 mt-5 gap-5">
                        <div className="border-2 border-activeblue bg-darkblue rounded-xl p-5 font-bold text-success flex flex-col gap-3 items-center">
                            {!lockJoinLoading && !lockJoinSuccess && <>
                                <Button
                                    className="w-full"
                                    color={props.stats.lockPeriodActive ? 'disabled' : 'orange'}
                                    onClick={() => lockJoinWrite()}
                                >
                                    Lock
                                </Button>
                                {props.stats.lockPeriodActive
                                    ? 'Lock option expired'
                                    : <span>Receive {props.statsForQualifier.estimatedTotalClaimAmount.toNumber() + props.statsForQualifier.estimatedTotalRewardAmount.toNumber()} DGNX</span>}
                            </>}
                            {lockJoinLoading && <Spinner />}
                            {lockJoinSuccess && <>
                                Success!
                                <div className="border-2 bg-broccoli border-techGreen p-3 rounded-xl font-bold cursor-pointer hover:bg-techGreen transition-colors">
                                    <a href={`https://etherscan.io/tx/${lockJoinHash}`} target="_blank" rel="noreferrer" className="w-full h-full">View tx</a>
                                </div>
                            </>}
                        </div>
                        <div className="border-2 border-activeblue bg-darkblue rounded-xl p-5 font-bold flex flex-col gap-3 items-center">
                            {!claimLoading && !claimSuccess && <>
                                <Button
                                    className="w-full"
                                    color="orange"
                                    onClick={() => claimWrite()}
                                >
                                    Claim
                                </Button>
                                Receive {props.statsForQualifier.estimatedTotalClaimAmount.toNumber()} DGNX
                            </>}
                            {claimLoading && <Spinner />}
                            {claimSuccess && <>
                                Success!
                                <div className="border-2 bg-broccoli border-techGreen p-3 rounded-xl font-bold cursor-pointer hover:bg-techGreen transition-colors">
                                    <a href={`https://etherscan.io/tx/${claimHash}`} target="_blank" rel="noreferrer" className="w-full h-full">View tx</a>
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
                
            </>
        )
    }
};

const AtmClaiming = (props: { stats: DgnxAtmStats }) => {
    const { stats } = props;
    const { address } = useAccount();
    const statsForQualifier = useAtmStatsForQualifier(address);

    return (
        <div className="max-w-2xl">
            <H2>The ATM is currently accepting claims!</H2>
            {statsForQualifier.totalDeposited.lte(0)
            ? <p className="text-error font-bold">This wallet has no claim</p>
            : <AtmClaimForm stats={stats} statsForQualifier={statsForQualifier} />}
        </div>
    )
}

export const ATMApp = (props: RouteObject) => {
    const { isConnected } = useAccount()
    const stats = useAtmStats();
    const chainId = useChainId();
    const { switchNetwork } = useSwitchNetwork();

    if (!isConnected) {
        return <div className="font-bold">Please connect wallet</div>
    }

    if (chainId !== 1 && chainId !== 5) {
        return <div className="max-w-2xl">
            <div className="font-bold">The ATM is only available on ETH</div>
            <Button
                className="w-full mt-3"
                color="orange"
                onClick={() => switchNetwork(1)}
            >
                Switch to ETH
            </Button>
        </div>;
    }

    if (!stats.collecting && !stats.claiming && stats.totalDeposits.eq(0)) {
        return <div className="font-bold">The ATM is currently offline</div>
    }

    if (!stats.collecting && !stats.claiming && stats.totalDeposits.gt(0)) {
        return (
            <>
                <div className="font-bold">
                    The collection phase has finished. Please wait until the claiming starts.
                </div>
                <div className="font-bold">
                    Total amount collected: {stats.totalDeposits.div(10 ** 18).toNumber()} ETH
                </div>
            </>
        );
    }

    if (stats.collecting) {
        return <AtmCollection stats={stats} />
    }

    if (stats.claiming) {
        return <AtmClaiming stats={stats} />
    }
}
