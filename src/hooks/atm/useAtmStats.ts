import { useContractRead } from "wagmi";

import abi from '../../abi/degenAtm.json';
import { ATM_ADDRESS } from "../../constants";
import BigNumber from "bignumber.js";

export type DgnxAtmStats = {
    collecting: boolean;
    claiming: boolean;
    lockPeriodActive: boolean;
    token: string;
    tokenBalance: BigNumber;
    allocationLimit: BigNumber;
    tokensPerOneNative: BigNumber;
    totalDeposits: BigNumber;
    totalLockedTokens: BigNumber;
    totalClaimedTokens: BigNumber;
    estimatedTotalLockedTokensRewards: BigNumber;
    estimatedTotalLockedTokensPayouts: BigNumber;
    estimatedTotalTokensPayout: BigNumber;
    lockPeriodInSeconds: BigNumber;
    lockPeriodStarts: BigNumber;
    lockPeriodEnds: BigNumber;
    rewardPenaltyBps: BigNumber;
    totalRewardBps: BigNumber;
}

export const useAtmStats = (): DgnxAtmStats => {
    const { data } = useContractRead({
        address: ATM_ADDRESS,
        abi,
        functionName: 'getStats',
        args: [],
    });

    return {
        collecting: data[0],
        claiming: data[1],
        lockPeriodActive: data[2],
        token: data[3],
        tokenBalance: new BigNumber(data[4].toString()),
        allocationLimit: new BigNumber(data[5].toString()),
        tokensPerOneNative: new BigNumber(data[6].toString()),
        totalDeposits: new BigNumber(data[7].toString()),
        totalLockedTokens: new BigNumber(data[8].toString()),
        totalClaimedTokens: new BigNumber(data[9].toString()),
        estimatedTotalLockedTokensRewards: new BigNumber(data[10].toString()),
        estimatedTotalLockedTokensPayouts: new BigNumber(data[11].toString()),
        estimatedTotalTokensPayout: new BigNumber(data[12].toString()),
        lockPeriodInSeconds: new BigNumber(data[13].toString()),
        lockPeriodStarts: new BigNumber(data[14].toString()),
        lockPeriodEnds: new BigNumber(data[15].toString()),
        rewardPenaltyBps: new BigNumber(data[16].toString()),
        totalRewardBps: new BigNumber(data[17].toString()),
    }

    // return data;
};
