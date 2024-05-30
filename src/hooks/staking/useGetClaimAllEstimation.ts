import abi from '@dappabis/stakex/abi-ui.json'
import { Address } from 'viem'
import { useSimulateContract } from 'wagmi'

export const useGetClaimAllEstimation = (
    enabled: boolean,
    address: Address,
    target: Address,
    staker: Address
) =>
    useSimulateContract({
        address,
        abi,
        functionName: 'claimAll',
        args: [target],
        account: staker,
        query: {
            enabled,
            select: (data) =>
                data.result ? (data.result[0] as any).amount : 0n,
        },
    })
