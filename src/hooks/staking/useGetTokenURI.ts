import abi from '@dappabis/stakex/abi-ui.json'
import { TokenURI } from '@dapptypes'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'

export const useGetTokenURI = (address: Address, tokenId: bigint) =>
    useReadContract({
        address,
        abi,
        functionName: 'tokenURI',
        args: [tokenId],
        query: {
            select: (data: string): TokenURI => JSON.parse(data),
            enabled: false,
        },
    })
