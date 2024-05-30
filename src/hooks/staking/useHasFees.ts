import abi from '@dappabis/stakex/abi-ui.json'
import { Address } from 'viem'
import { useReadContracts } from 'wagmi'

export const useHasFees = (address: Address) => {
    return useReadContracts({
        contracts: [
            {
                address,
                abi,
                functionName: 'hasFeeForStaking',
            },
            {
                address,
                abi,
                functionName: 'hasFeeForUnstaking',
            },
            {
                address,
                abi,
                functionName: 'hasFeeForRestaking',
            },
        ],
        query: {
            select: ([
                hasFeeForStaking,
                hasFeeForUnstaking,
                hasFeeForRestaking,
            ]) => ({
                hasFeeForStaking: hasFeeForStaking.result,
                hasFeeForUnstaking: hasFeeForUnstaking.result,
                hasFeeForRestaking: hasFeeForRestaking.result,
            }),
        },
    })
}
