import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

import abi from '../../abi/degenAtm.json';
import { ATM_ADDRESS } from "../../constants";
import BigNumberJS from "bignumber.js";
import { BigNumber } from "ethers";

export const useAtmDeposit = (valueInWEI: BigNumberJS) => {
    const { config } = usePrepareContractWrite({
        address: ATM_ADDRESS,
        abi,
        functionName: 'deposit',
        overrides: {
            value: BigNumber.from(valueInWEI.toString())
        }
    })

    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return { write, isLoading, isSuccess, hash: data?.hash };
};
