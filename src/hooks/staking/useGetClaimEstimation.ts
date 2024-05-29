import abi from '@dappabis/stakex/abi-ui.json'
import { Address } from 'viem'
import { useSimulateContract } from 'wagmi'

export const useGetClaimEstimation = (
    enabled: boolean,
    address: Address,
    target: Address,
    staker: Address,
    tokenId: bigint
) =>
    useSimulateContract({
        address,
        abi,
        functionName: 'claim',
        args: [tokenId, target],
        account: staker,
        query: {
            enabled,
            select: (data) =>
                data.result ? (data.result[0] as any).amount : 0n,
        },
    })
