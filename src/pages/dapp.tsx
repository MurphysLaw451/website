import { avalanche, avalancheFuji, goerli, mainnet } from '@wagmi/chains'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { Dashboard } from '../components/dapp/Dashboard'
import { Disburser } from '../components/dapp/Disburser'
import { Governance } from '../components/dapp/Governance'
import { LiquidityBacking } from '../components/dapp/LiquidityBacking'
import { Monitoring } from '../components/dapp/Monitoring'
import { DappHeader } from '../components/dapp/elements/DappHeader'
import Sidebar from '../components/dapp/elements/Sidebar'

const { chains } = configureChains(
    [avalanche, avalancheFuji, goerli, mainnet],
    [publicProvider()]
)

const config = createConfig({
    ...getDefaultConfig({
        appName: 'DegenX Ecosystem DAPP',

        chains,
        autoConnect: true,

        walletConnectProjectId:
            process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID!,
    }),
})

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
            <WagmiConfig config={config}>
                <ConnectKitProvider mode={theme as 'light' | 'dark'}>
                    <DappHeader />
                    <div className="my-32 flex sm:my-20 lg:ml-3">
                        <div className="mr-4 hidden w-64 max-w-4xl lg:block">
                            <Sidebar />
                        </div>
                        <main className="mx-auto w-11/12 lg:w-8/12">
                            <Routes>
                                <Route element={<Dashboard />} path="/dapp" />
                                <Route
                                    element={<Governance />}
                                    path="/dapp/governance"
                                />
                                <Route
                                    element={<LiquidityBacking />}
                                    path="/dapp/liquidity-backing"
                                />
                                <Route
                                    element={<Disburser />}
                                    path="/dapp/disburser"
                                />
                                <Route
                                    element={<Monitoring />}
                                    path="/dapp/monitoring"
                                />
                            </Routes>
                        </main>
                    </div>
                </ConnectKitProvider>
            </WagmiConfig>
        </BrowserRouter>
    )
}
