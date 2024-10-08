import abi from '@dappabis/stakex/abi-ui.json'
import { isBoolean } from 'lodash'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

export const useGetUpstakingEstimation = (
    address: Address,
    chainId: number,
    tokenId: bigint,
    includeRewards: boolean,
    targetToken: Address
) =>
    useReadContract({
        address,
        chainId,
        abi,
        functionName: 'stakeXGetUpstakingEstimation',
        args: [tokenId, includeRewards, targetToken],
        query: {
            select: ([stakeAmount, targetAmount, feeAmount]: [
                bigint,
                bigint,
                bigint
            ]) => ({
                stakeAmount,
                targetAmount,
                feeAmount,
            }),
            enabled: Boolean(
                address &&
                    chainId &&
                    tokenId &&
                    isBoolean(includeRewards) &&
                    targetToken
            ),
        },
    })
