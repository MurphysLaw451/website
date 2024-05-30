import abi from '@dappabis/stakex/abi-ui.json'
import { TokenInfoResponse } from '@dapptypes'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

export const useGetStakingToken = (address: Address) =>
    useReadContract({
        address,
        abi,
        functionName: 'getStakingToken',
        query: {
            select: (data: TokenInfoResponse) => data,
        },
    })
