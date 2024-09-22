import abi from '@dappabis/stakex/abi-ui.json'
import { useExecuteFunction } from '@dapphooks/shared/useExecuteFunction'
import { StakeBucketUpdateShareParams } from '@dapptypes'
import { Address } from 'viem'

export const useUpdateStakeBucketShares = (
    chainId: number,
    address: Address,
    paramsShares: StakeBucketUpdateShareParams[]
) =>
    useExecuteFunction({
        address,
        chainId,
        abi,
        functionName: 'stakeXUpdateStakeBucketShares',
        args: [paramsShares],
        eventNames: ['UpdatedStakeBucketShares'],
        enabled: Boolean(paramsShares && paramsShares.length),
    })
