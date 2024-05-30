import abi from '@dappabis/stakex/abi-ui.json'
import { StakeResponse } from '@dapptypes'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

export const useGetStakes = (
    enabled: boolean,
    address: Address,
    staker: Address
) =>
    useReadContract({
        address,
        abi,
        functionName: 'getStakes',
        args: [staker],
        query: {
            select: (data: StakeResponse[]) => data,
            enabled,
        },
    })
