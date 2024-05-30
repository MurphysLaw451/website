import abi from '@dappabis/controller.json'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

export const useGetBackingPerDGNX = (wantToken: Address) =>
    useReadContract({
        abi,
        address: process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS! as Address,
        functionName: 'getValueOfTokensForOneBaseToken',
        args: [wantToken],
        query: {
            select: (data: bigint) => data,
        },
    })
