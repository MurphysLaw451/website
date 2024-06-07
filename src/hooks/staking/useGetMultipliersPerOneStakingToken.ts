import abi from '@dappabis/stakex/abi-ui.json'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

export const useGetMultipliersPerOneStakingToken = (address: Address) =>
    useReadContract({
        address,
        abi,
        functionName: `getMultipliersPerOneStakingToken`,
        query: {
            select: (data: any[]) => data,
        },
    })
