import { Wallet, ethers } from "ethers"; 
import { RouteObject } from "react-router-dom"
import { useEffect, useState } from "react";

import { getBackingForAddress, getBackingPerDGNX, getBaseTokenBalance, getStats, getTotalValue } from "../../helpers/liquidityBacking";
import { useAccount } from "wagmi";
import BigNumber from "bignumber.js";
import { BNtoNumber } from "../../helpers/number";
import { BurnForBacking } from "./elements/BurnForBacking";
import { Chart } from "./elements/Chart";

const provider = new ethers.providers.JsonRpcProvider('https://avalanche-mainnet-fork.mastertoco.de/', {
    name: 'avalanche',
    chainId: 43114
});

const WalletBacking = (props: { amountBaseTokens: number; backingValue: number; wantTokenName?: string }) => {
    if (!props.amountBaseTokens || !props.backingValue || !props.wantTokenName) {
        return <p>...</p>
    }

    return <>
        <div className="flex">
            <div className="flex-grow">DGNX in wallet</div>
            <div>{props.amountBaseTokens.toFixed(3)}</div>
        </div>
        <div className="flex">
            <div className="flex-grow">Value in {props.wantTokenName}</div>
            <div>{props.backingValue.toFixed(8)}</div>
        </div> 
    </>
}


const tokenIsUSDC = (tokenAddress: string) => {
    return process.env.NEXT_PUBLIC_USDC_ADDRESSES.split(',').map(add => add.toLowerCase()).includes(tokenAddress.toLowerCase())
}

export const LiquidityBacking = (props: RouteObject) => {
    const [stats, setStats] = useState<Awaited<ReturnType<typeof getStats>>>()
    const [totalBacking, setTotalBacking] = useState<number>()
    const [loading, setLoading] = useState(false);
    const [backingPerDGNX, setBackingPerDGNX] = useState<number>()
    const [activeWantToken, setActiveWantToken] = useState<{ decimals: number; address: string; info: { name: string }}>()
    const [_forceRefetch, forceRefetch] = useState(Math.random())

    const [baseTokenDecimals, setBaseTokenDecimals] = useState<number>()
    const [baseTokenBalance, setBaseTokenBalance] = useState<BigNumber>()
    const [addressBacking, setAddressBacking] = useState<number>()

    const { address, isConnected } = useAccount()

    useEffect(() => {
        getStats(provider).then((data) => {
            setStats(data)

            // Try to set USDC.e as default wantToken, if that isn't in the list, just take the first one
            const wantTokenIndex = data.wantTokenData.findIndex(token => tokenIsUSDC(token.address))
            setActiveWantToken(data.wantTokenData[wantTokenIndex === -1 ? 0 : wantTokenIndex])
        })
    }, []);

    useEffect(() => {
        if (!activeWantToken) {
            return;
        }
        setLoading(true)
        setTotalBacking(0)
        setBackingPerDGNX(0)
        setBaseTokenBalance(BigNumber(0))
        setAddressBacking(0)
        Promise.all([
            getTotalValue(provider, activeWantToken.address).then((data) => {
                setTotalBacking(BNtoNumber(data, activeWantToken.decimals))
            }),
            getBackingPerDGNX(provider, activeWantToken.address).then((data) => {
                setBackingPerDGNX(BNtoNumber(data, activeWantToken.decimals))
            })
        ]).then(() => setLoading(false))
    }, [activeWantToken])

    useEffect(() => {
        if (!isConnected || !address || !activeWantToken?.address) {
            return
        }

        // Your backing
        getBaseTokenBalance(provider, address)
            .then(baseTokens => {
                setBaseTokenBalance(BigNumber(baseTokens.balance.toString()))
                setBaseTokenDecimals(baseTokens.decimals)
                return getBackingForAddress(provider, activeWantToken.address, baseTokens.balance)
            })
            .then(backing => {
                setAddressBacking(BNtoNumber(backing, activeWantToken.decimals))
            })

    }, [isConnected, address, activeWantToken, _forceRefetch])

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center mb-8">
                <h1 className="flex-grow text-4xl mb-4">Liquidity Backing</h1>
                    {stats?.wantTokenData && (
                        <div className="flex items-center gap-3">
                            <p>Show backing in</p>
                            <select onChange={(e) => setActiveWantToken(stats.wantTokenData.find(wantToken => wantToken.address === e.target.value))} className="dark:bg-slate-900 border dark:border-dark-800 dark:text-slate-200 py-3 leading-3">
                                {stats.wantTokenData.map(token => {
                                    return <option key={token.address} value={token.address} selected={tokenIsUSDC(token.address)}>{token.info.name}</option>
                                })}
                            </select>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="dark:bg-slate-800 bg-gray-100 p-6 rounded-xl">
                    <div className="flex">
                        <h3 className="text-xl flex-grow mb-3">Total backing</h3>
                    </div>
                    {!loading && totalBacking > 0 && <div className="text-right text-2xl">
                        {totalBacking.toFixed(3)} {activeWantToken.info.name}
                    </div>}
                    {!loading && backingPerDGNX > 0 && <div className="flex">
                        <div className="flex-grow"></div>
                        <div>{backingPerDGNX.toFixed(8)} {activeWantToken.info.name} / DGNX</div>
                    </div>}
                </div>
                <div className="dark:bg-slate-800 bg-gray-100 p-6 rounded-xl">
                    <div className="flex">
                        <h3 className="text-xl flex-grow mb-3">Your backing</h3>
                    </div>
                    {isConnected && baseTokenBalance
                        ? <WalletBacking amountBaseTokens={BNtoNumber(baseTokenBalance, baseTokenDecimals)} backingValue={addressBacking} wantTokenName={activeWantToken?.info?.name} />
                        : <p className="text-center">Connect wallet to see your backing</p>
                    }
                </div>

                <div className="dark:bg-slate-800 bg-gray-100 p-6 rounded-xl">
                    <h3 className="text-xl mb-3">Backing breakdown</h3>
                    <div className="flex flex-col">
                        {stats?.vaultData
                            ? stats?.vaultData.map(vaultItem => {
                                return (
                                    <div key={vaultItem.tokenAddress} className="flex">
                                        <div className="flex-grow">{vaultItem.name}</div>
                                        <div>{(Number(vaultItem.balance) / Number(10 ** vaultItem.decimals)).toFixed(3)}</div>
                                    </div>
                                )
                            })
                            : <p>...</p>
                        }
                    </div>
                </div>

                <div className="lg:col-span-2 dark:bg-slate-800 bg-gray-100 p-6 rounded-xl h-[30em]">
                    <Chart wantTokenName={activeWantToken?.info?.name} />
                </div>

                <div className="dark:bg-slate-800 bg-gray-100 p-6 rounded-xl">
                    <h1 className="text-2xl my-4">Burn DGNX for backing</h1>
                    <p className="mb-3">How much DGNX do you want to burn?</p>
                    <div className="flex justify-center">
                        <div>
                            <BurnForBacking
                                baseTokenAmount={baseTokenBalance}
                                baseTokenDecimals={baseTokenDecimals}
                                activeWantToken={activeWantToken}
                                provider={provider}
                                forceRefetch={forceRefetch}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
