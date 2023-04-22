import Head from 'next/head'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

import { BuyDGNX } from '../components/dapp/BuyDGNX'
import { Dashboard } from '../components/dapp/Dashboard'

import { DappHeader } from '../components/dapp/elements/DappHeader'
import Sidebar from '../components/dapp/elements/Sidebar'
import { useEffect, useState } from 'react'
import { Governance } from '../components/dapp/Governance'
import { LiquidityBacking } from '../components/dapp/LiquidityBacking'

export default function Dapp() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, [])

    if (!ready) {
        return null;
    }

    return (
        <BrowserRouter>
            <Head>
                <title>DegenX</title>
                <meta
                    name="description"
                    content="DegenX is multichain ecosystem that offers a suite of decentralized applications (dApps) and services to provide solutions for projects and individuals in the DeFi space. $DGNX is a multichain token with liquidity backing."
                />
            </Head>
            <DappHeader />
            <div className='flex lg:ml-3 my-16'>
                <div className="max-w-4xl w-64 mr-4 hidden lg:block">
                    <Sidebar />
                </div>
                <main className="mx-auto w-11/12 lg:w-8/12">
                    <Routes>
                        <Route element={<Dashboard />} path="/dapp" />
                        <Route element={<BuyDGNX />} path="/dapp/buy/*" />
                        <Route element={<Governance />} path="/dapp/governance" />
                        <Route element={<LiquidityBacking />} path="/dapp/liquidity-backing" />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}
