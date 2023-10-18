import { RouteObject } from 'react-router-dom'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import abi from '../../../abi/disburser.json';
import { Spinner } from './Spinner';
import BigNumber from 'bignumber.js';
import { useCountdownTimer } from 'use-countdown-timer';
import { useEffect } from 'react';
import { Button } from '../../Button';

const DISBURSER_ADDRESS = '0x8a0E3264Da08bf999AfF5a50AabF5d2dc89fab79';

const countdownStr = (s: number) => {
    const d = Math.floor(s / (3600 * 24));
    s  -= d * 3600 * 24;
    const h = Math.floor(s / 3600);
    s  -= h * 3600;
    const m = Math.floor(s / 60);
    s  -= m * 60;
    const tmp = [];
    (d) && tmp.push(d + 'd');
    (d || h) && tmp.push(h + 'h');
    (d || h || m) && tmp.push(m + 'm');
    tmp.push(s + 's');
    return tmp.join(' ');
}

const Countdown = (props: { seconds: number }) => {
    const { countdown, start, isRunning } = useCountdownTimer({
        timer: 1000 * props.seconds
    });

    useEffect(() => {
        if (!isRunning) {
            start();
        }
    }, [isRunning]);

    return (
        <div>Claim in {countdownStr(countdown / 1000)}</div>
    )
}

const ClaimButton = () => {
    const { data, isLoading: claimLoading, isSuccess: claimSuccess, write: claim } = useContractWrite({
        address: DISBURSER_ADDRESS,
        abi,
        functionName: 'claim',
        mode: 'recklesslyUnprepared',
    })

    if (claimLoading) {
        return <Button
            className="w-full mt-3"
            color="orangeDisabled"
        >
            Loading...
        </Button>
    }

    if (claimSuccess) {
        return <Button
            className="w-full mt-3"
            color="orangeDisabled"
        >
            Claim success!
        </Button>
    }

    return <Button
        className="w-full mt-3"
        color="orange"
        onClick={() => claim()}
    >
        Claim now!
    </Button>
}

const Dapp = () => {
    const { address } = useAccount()
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

    const { data: timeUntilNextClaimBN } = useContractRead({
        address: DISBURSER_ADDRESS,
        abi,
        functionName: 'timeLeftUntilNextClaim',
        args: [address],
    })

    const timeUntilNextClaim = ((timeUntilNextClaimBN) as BigNumber).toNumber();
    const amountClaimedStr = amountLeftLoading ? '...' : `${(parseInt(amountLeft as string) / Math.pow(10, 18)).toFixed(4)}`;
    const amountLeftStr = paidOutLoading ? '...' : `${(parseInt(paidOut as string) / Math.pow(10, 18)).toFixed(4)}`;

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center border-2 border-activeblue rounded-xl p-3 bg-dark">
                    <h2 className="font-bold text-2xl">Claimed</h2>
                    <div className="mt-3 text-xl">{amountClaimedStr} DGNX</div>
                </div>
                <div className="flex flex-col items-center justify-center border-2 border-activeblue rounded-xl p-3 bg-dark">
                    <h2 className="font-bold text-2xl">Left to claim</h2>
                    <div className="mt-3 text-xl">{amountLeftStr} DGNX</div>
                </div>
            </div>
            <div className="mt-6 flex justify-center items-center w-full">
                {timeUntilNextClaim > 0 
                    ? <Button
                        className="w-full mt-3"
                        color="orangeDisabled"
                    >
                        <Countdown seconds={timeUntilNextClaim} />
                    </Button>
                    : <ClaimButton />}
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
        return <div className="font-bold">Please connect wallet</div>;
    }
    
    if (isLoading) {
        return <div className="w-full flex items-center justify-center"><Spinner /></div>;
    }

    if (hasAmountLeft) {
        return <Dapp />
    }

    return <div>Unfortunately you don&apos;t have a claim on the legacy disburser (anymore).</div>
}
