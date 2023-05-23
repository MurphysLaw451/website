import { avalanche, avalancheFuji } from '@wagmi/chains'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WagmiConfig, createClient } from 'wagmi'
import { BuyDGNX } from '../components/dapp/BuyDGNX'
import { Dashboard } from '../components/dapp/Dashboard'
import { Governance } from '../components/dapp/Governance'
import { LiquidityBacking } from '../components/dapp/LiquidityBacking'
import { DappHeader } from '../components/dapp/elements/DappHeader'
import Sidebar from '../components/dapp/elements/Sidebar'

import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const client = createClient(
    getDefaultClient({
        chains: [avalanche, avalancheFuji],
        autoConnect: true,
        walletConnectProjectId:
            process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        appName: 'DegenX Ecosystem DAPP',
    })
)

export default function Dapp() {
    const [ready, setReady] = useState(false)
    const { theme } = useTheme()

    useEffect(() => {
        setReady(true)
    }, [])

    if (!ready) {
        return null
    }

    return (
        <BrowserRouter>
            <Head>
                <title>DegenX Ecosystem</title>
                <meta
                    name="description"
                    content="DegenX is multichain ecosystem that offers a suite of decentralized applications (dApps) and services to provide solutions for projects and individuals in the DeFi space. $DGNX is a multichain token with liquidity backing."
                />
            </Head>
            <WagmiConfig client={client}>
                <ConnectKitProvider mode={theme as 'light' | 'dark'}>
                    <DappHeader />
                    <div className="my-16 flex lg:ml-3">
                        <div className="mr-4 hidden w-64 max-w-4xl lg:block">
                            <Sidebar />
                        </div>
                        <main className="mx-auto w-11/12 lg:w-8/12">
                            <Routes>
                                <Route element={<Dashboard />} path="/dapp" />
                                <Route
                                    element={<BuyDGNX />}
                                    path="/dapp/buy/*"
                                />
                                <Route
                                    element={<Governance />}
                                    path="/dapp/governance"
                                />
                                <Route
                                    element={<LiquidityBacking />}
                                    path="/dapp/liquidity-backing"
                                />
                            </Routes>
                        </main>
                    </div>
                </ConnectKitProvider>
            </WagmiConfig>
        </BrowserRouter>
    )
}
