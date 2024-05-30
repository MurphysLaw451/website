import abi from '@dappabis/stakex/abi-ui.json'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

export const useActive = (address: Address, refetchIntervalInMs?: number) =>
    useReadContract({
        address,
        abi,
        functionName: `isActive`,
        query: {
            select: (data: boolean) => data,
            refetchInterval: refetchIntervalInMs || 5000,
        },
    })
