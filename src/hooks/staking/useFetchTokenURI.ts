import abi from '@dappabis/stakex/abi-ui.json'
import { TokenURI } from '@dapptypes'
import { readContract } from '@wagmi/core'
import { useCallback, useState } from 'react'
import { Address } from 'viem'
import { useConfig } from 'wagmi'

export const useFetchTokenURI = (address: Address, tokenId: bigint) => {
    const config = useConfig()
    const [data, setData] = useState<TokenURI>()
    const loadData = useCallback(() => {
        readContract(config, {
            abi,
            address,
            functionName: 'tokenURI',
            args: [tokenId],
        }).then((res: string) => setData(JSON.parse(res)))
    }, [config, tokenId, address])
    return { data, loadData }
}
