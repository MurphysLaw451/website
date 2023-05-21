import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { RouteObject } from 'react-router-dom'

import BigNumber from 'bignumber.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useAccount } from 'wagmi'
import {
    getBackingForAddress,
    getBackingPerDGNX,
    getBaseTokenBalance,
    getStats,
    getTotalValue,
} from '../../helpers/liquidityBacking'
import { BNtoNumber } from '../../helpers/number'
import { BurnForBacking } from './elements/BurnForBacking'
import { Chart } from './elements/Chart'

const chainId = +process.env.NEXT_PUBLIC_CHAIN_ID
const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC,
    {
        name: process.env.NEXT_PUBLIC_NAME,
        chainId,
    }
)

const WalletBacking = (props: {
    amountBaseTokens: number
    backingValue: number
    wantTokenName?: string
}) => {
    if (
        !props.amountBaseTokens ||
        !props.backingValue ||
        !props.wantTokenName
    ) {
        return <p>...</p>
    }

    return (
        <>
            <div className="flex">
                <div className="flex-grow">DGNX in wallet</div>
                <div>{props.amountBaseTokens.toFixed(3)}</div>
            </div>
            <div className="flex">
                <div className="flex-grow">Value in {props.wantTokenName}</div>
                <div>{props.backingValue.toFixed(8)}</div>
            </div>
        </>
    )
}

const tokenIsUSDC = (tokenAddress: string) => {
    return process.env.NEXT_PUBLIC_USDC_ADDRESSES.split(',')
        .map((add) => add.toLowerCase())
        .includes(tokenAddress.toLowerCase())
}

export const LiquidityBacking = (props: RouteObject) => {
    const [stats, setStats] = useState<Awaited<ReturnType<typeof getStats>>>()
    const [totalBacking, setTotalBacking] = useState<number>()
    const [loading, setLoading] = useState(false)
    const [backingPerDGNX, setBackingPerDGNX] = useState<number>()
    const [activeWantToken, setActiveWantToken] = useState<{
        decimals: number
        address: string
        info: { name: string }
    }>()
    const [_forceRefetch, forceRefetch] = useState(Math.random())

    const [baseTokenDecimals, setBaseTokenDecimals] = useState<number>()
    const [baseTokenBalance, setBaseTokenBalance] = useState<BigNumber>()
    const [addressBacking, setAddressBacking] = useState<number>()

    const { address, isConnected } = useAccount()

    useEffect(() => {
        getStats(provider).then((data) => {
            setStats(data)

            // Try to set USDC.e as default wantToken, if that isn't in the list, just take the first one
            const wantTokenIndex = data.wantTokenData.findIndex((token) =>
                tokenIsUSDC(token.address)
            )
            setActiveWantToken(
                data.wantTokenData[wantTokenIndex === -1 ? 0 : wantTokenIndex]
            )
        })
    }, [])

    useEffect(() => {
        if (!activeWantToken) {
            return
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
            getBackingPerDGNX(provider, activeWantToken.address).then(
                (data) => {
                    setBackingPerDGNX(
                        BNtoNumber(data, activeWantToken.decimals)
                    )
                }
            ),
        ]).then(() => setLoading(false))
    }, [activeWantToken])

    useEffect(() => {
        if (!isConnected || !address || !activeWantToken?.address) {
            return
        }

        // Your backing
        getBaseTokenBalance(provider, address)
            .then((baseTokens) => {
                setBaseTokenBalance(BigNumber(baseTokens.balance.toString()))
                setBaseTokenDecimals(baseTokens.decimals)
                return getBackingForAddress(
                    provider,
                    activeWantToken.address,
                    baseTokens.balance
                )
            })
            .then((backing) => {
                setAddressBacking(BNtoNumber(backing, activeWantToken.decimals))
            })
    }, [isConnected, address, activeWantToken, _forceRefetch])

    return (
        <div>
            <div className="mb-8 flex flex-col items-center lg:flex-row">
                <h1 className="flex-grow text-4xl">Liquidity Backing</h1>
            </div>
            <div className="mb-8 flex flex-col items-center lg:flex-row">
                <span className="mr-4 text-2xl">Show backing values in</span>
                {stats?.wantTokenData &&
                    stats.wantTokenData.map((token) => {
                        return (
                            <span
                                className="mx-3 inline-block w-12 cursor-pointer rounded-full opacity-70 ring-orange-600 ring-offset-white hover:opacity-100 data-[selected=true]:opacity-100 data-[selected=true]:ring data-[selected=true]:ring-offset-4 dark:ring-white dark:ring-offset-gray-900"
                                data-selected={
                                    activeWantToken.address === token.address
                                }
                                data-address={token.address}
                                title={token.info.name}
                                onClick={(e) =>
                                    setActiveWantToken(
                                        stats.wantTokenData.find(
                                            (wantToken) =>
                                                wantToken.address ===
                                                token.address
                                        )
                                    )
                                }
                            >
                                <img
                                    className="inline-block"
                                    src={`/wanttokens/${chainId}/${token.address}.png`}
                                    alt={token.info.name}
                                    title={token.info.name}
                                />
                            </span>
                        )
                    })}
            </div>
            <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="rounded-xl bg-gray-100 p-6 dark:bg-slate-800">
                    <div className="flex">
                        <h3 className="mb-3 flex-grow text-xl">
                            Total backing
                        </h3>
                    </div>
                    {!loading && totalBacking > 0 && (
                        <div className="text-right text-2xl">
                            {totalBacking.toFixed(3)}{' '}
                            {activeWantToken.info.name}
                        </div>
                    )}
                    {!loading && backingPerDGNX > 0 && (
                        <div className="flex">
                            <div className="flex-grow"></div>
                            <div>
                                {backingPerDGNX.toFixed(8)}{' '}
                                {activeWantToken.info.name} / DGNX
                            </div>
                        </div>
                    )}
                </div>
                <div className="rounded-xl bg-gray-100 p-6 dark:bg-slate-800">
                    <div className="flex">
                        <h3 className="mb-3 flex-grow text-xl">Your backing</h3>
                    </div>
                    {isConnected && baseTokenBalance ? (
                        <WalletBacking
                            amountBaseTokens={BNtoNumber(
                                baseTokenBalance,
                                baseTokenDecimals
                            )}
                            backingValue={addressBacking}
                            wantTokenName={activeWantToken?.info?.name}
                        />
                    ) : (
                        <p className="text-center">
                            Connect wallet to see your backing
                        </p>
                    )}
                </div>

                <div className="rounded-xl bg-gray-100 p-6 dark:bg-slate-800">
                    <h3 className="mb-3 text-xl">Backing breakdown</h3>
                    <div className="flex flex-col">
                        {stats?.vaultData ? (
                            stats?.vaultData.map((vaultItem) => {
                                return (
                                    <div
                                        key={vaultItem.tokenAddress}
                                        className="flex"
                                    >
                                        <div className="flex-grow">
                                            {vaultItem.name}
                                        </div>
                                        <div>
                                            {(
                                                Number(vaultItem.balance) /
                                                Number(10 ** vaultItem.decimals)
                                            ).toFixed(3)}
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p>...</p>
                        )}
                    </div>
                </div>

                <div className="h-[30em] rounded-xl bg-gray-100 p-6 dark:bg-slate-800 lg:col-span-2">
                    <Chart wantTokenName={activeWantToken?.info?.name} />
                </div>

                <div className="rounded-xl bg-gray-100 p-6 dark:bg-slate-800">
                    <h1 className="my-4 text-2xl">Burn DGNX for backing</h1>
                    <p className="mb-3">How much DGNX do you want to burn?</p>
                    <div className="flex justify-center">
                        <div className="flex-grow">
                            <BurnForBacking
                                baseTokenAmount={baseTokenBalance}
                                baseTokenDecimals={baseTokenDecimals}
                                activeWantToken={activeWantToken}
                                provider={provider}
                                isLoading={loading}
                                forceRefetch={forceRefetch}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
