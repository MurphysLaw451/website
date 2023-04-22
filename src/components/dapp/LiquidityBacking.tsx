import { ethers } from "ethers"; 
import { RouteObject } from "react-router-dom"
import { Fragment, useEffect, useState } from "react";

import { getBackingPerDGNX, getStats, getTotalValue } from "../../helpers/liquidityBacking";

const provider = new ethers.JsonRpcProvider('https://avalanche-mainnet-fork.mastertoco.de/', {
    name: 'avalanche',
    chainId: 43114
});

export const LiquidityBacking = (props: RouteObject) => {
    const [stats, setStats] = useState<Awaited<ReturnType<typeof getStats>>>()
    const [totalBacking, setTotalBacking] = useState<bigint>()
    const [loading, setLoading] = useState(false);
    const [backingPerDGNX, setBackingPerDGNX] = useState<bigint>()
    const [activeWantToken, setActiveWantToken] = useState<{ decimals: bigint; address: string; info: { name: string }}>()

    useEffect(() => {
        getStats(provider).then((data) => {
            setStats(data)

            // Try to set USDC.e as default wantToken, if that isn't in the list, just take the first one
            const wantTokenIndex = data.wantTokenData.findIndex(token => token.address.toLowerCase() === process.env.NEXT_PUBLIC_USDC_ADDRESS.toLowerCase())
            setActiveWantToken(data.wantTokenData[wantTokenIndex === -1 ? 0 : wantTokenIndex])
        })
    }, []);

    useEffect(() => {
        if (!activeWantToken) {
            return;
        }
        setLoading(true)
        setTotalBacking(0n)
        setBackingPerDGNX(0n)
        Promise.all([
            getTotalValue(provider, activeWantToken.address).then((data) => {
                setTotalBacking(data)
            }),
            getBackingPerDGNX(provider, activeWantToken.address).then((data) => {
                setBackingPerDGNX(data)
            })
        ]).then(() => setLoading(false))
    }, [activeWantToken])

    return (
        <div>
            <h1 className="text-4xl mb-4">Liquidity Backing</h1>
            <div className="flex flex-col lg:flex-row w-full">
                <div className="dark:bg-slate-800 bg-gray-100 p-6 rounded-xl mr-8 mb-8 w-full">
                    <div className="flex mb-6">
                        <h3 className="text-xl flex-grow mb-3">Total backing</h3>
                        {stats?.wantTokenData && (
                            <select onChange={(e) => setActiveWantToken(stats.wantTokenData.find(wantToken => wantToken.address === e.target.value))} className="dark:bg-slate-900 border dark:border-dark-800 dark:text-slate-200 py-1 leading-3">
                                {stats.wantTokenData.map(token => {
                                    return <option key={token.address} value={token.address}>{token.info.name}</option>
                                })}
                            </select>
                            )}
                    </div>
                    {!loading && totalBacking > 0 && <div className="text-right text-2xl">
                        {(Number(totalBacking) / Number(10n ** activeWantToken.decimals)).toFixed(3)} {activeWantToken.info.name}
                    </div>}
                    {!loading && backingPerDGNX > 0 && <div className="flex">
                        <div className="flex-grow"></div>
                        <div>{(Number(backingPerDGNX) / Number(10n ** activeWantToken.decimals)).toFixed(8)} {activeWantToken.info.name} / DGNX</div>
                    </div>}
                </div>
                <div className="dark:bg-slate-800 bg-gray-100 p-6 rounded-xl mr-8 mb-8 w-full">
                    <div className="flex mb-6">
                        <h3 className="text-xl flex-grow mb-3">Your backing</h3>
                    </div>
                    <p className="text-center">Connect wallet to see your backing</p>
                </div>
                <div className="dark:bg-slate-800 bg-gray-100 p-6 rounded-xl mr-8 mb-8 w-full">
                    <h3 className="text-xl mb-3">Backing breakdown</h3>
                    <div className="flex flex-col">
                        {stats?.vaultData
                            ? stats?.vaultData.map(vaultItem => {
                                return (
                                    <div key={vaultItem.tokenAddress} className="flex">
                                        <div className="flex-grow">{vaultItem.name}</div>
                                        <div>{(Number(vaultItem.balance) / Number(10n ** vaultItem.decimals)).toFixed(3)}</div>
                                    </div>
                                )
                            })
                            : <p>...</p>
                        }
                    </div>
                </div>
            </div>
            <h1 className="text-2xl my-4">Burn DGNX for backing</h1>
            <div className="flex flex-col lg:flex-row w-full">
                <div className="dark:bg-slate-800 bg-gray-100 p-6 rounded-xl mr-8 mb-8 w-full">
                    <div className="flex mb-6">
                        <h3 className="text-xl flex-grow mb-3">Total backing</h3>
                    </div>
                    {totalBacking > 0 && <div className="text-right text-2xl">
                        {(Number(totalBacking) / Number(10n ** activeWantToken.decimals)).toFixed(3)} {activeWantToken.info.name}
                    </div>}
                </div>
            </div>
        </div>
    )
}
