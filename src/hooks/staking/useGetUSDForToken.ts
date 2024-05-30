import { useCallback, useEffect, useState } from 'react'
import { Address } from 'viem'

export const useGetUSDForToken = (token: Address): [number, Function] => {
    const [data, setData] = useState<number>(0)
    const loadData = useCallback(() => {
        fetch(`https://api.dexscreener.com/latest/dex/tokens/${token}`)
            .then((res) => res.json())
            .then((res) => {
                res.pairs &&
                    setData(
                        res.pairs.reduce(
                            (acc: number, pair: any) =>
                                Number(acc) + Number(pair.priceUsd),
                            0
                        ) / res.pairs.length
                    )
            })
    }, [token])
    useEffect(() => {
        if (!token) return
        loadData()
    }, [loadData, token])
    return [data, loadData]
}
