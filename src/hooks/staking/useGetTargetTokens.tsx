import abi from '@dappabis/stakex/abi-ui.json'
import { TokenInfoResponse } from '@dapptypes'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

export const useGetTargetTokens = (address: Address) =>
    useReadContract({
        address,
        abi,
        functionName: 'getTargetTokens',
        query: {
            select: (data: TokenInfoResponse[]) => data,
        },
    })
