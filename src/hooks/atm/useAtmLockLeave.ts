import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

import abi from '../../abi/degenAtm.json';
import { ATM_ADDRESS } from "../../constants";

export const useAtmLockLeave = () => {
    const { config } = usePrepareContractWrite({
        address: ATM_ADDRESS,
        abi,
        functionName: 'lockLeave',
    })

    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return { write, isLoading, isSuccess, hash: data?.hash };
};
