import abi from '@dappabis/stakex/abi-ui.json'
import { upperFirst } from 'lodash'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

type GetFeeFor = 'staking' | 'unstaking' | 'restaking' | 'upstaking'

export const useGetFeeFor = (
    address: Address,
    chainId: number,
    whatFor: GetFeeFor,
    amount: bigint
) =>
    useReadContract({
        address,
        chainId,
        abi,
        functionName:
            whatFor == 'upstaking'
                ? 'stakeXGetFeeForUpstaking'
                : `getFeeFor${upperFirst(whatFor)}`,
        args: [amount],
        query: {
            select: (data: any[]) => ({
                stakeAmount: data[0],
                feeAmount: data[1],
            }),
            enabled: Boolean(address && chainId && whatFor && amount),
        },
    })
