import abi from '@dappabis/stakex/abi-ui.json'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

export type BucketStakedShare = {
    bucketId: Address
    share: bigint
    staked: bigint
    divider: number
}

export const useGetStakedSharesByStaker = (address: Address, staker: Address) =>
    useReadContract({
        address,
        abi,
        functionName: `getStakedSharesByStaker`,
        args: [staker],
        query: {
            select: (data: BucketStakedShare[]) => data,
        },
    })
