import { Link, Route, Routes } from 'react-router-dom'
import { DeFiToolsOverview } from './defitools/Overview'
import {
    DeFiToolsContext,
    DeFiToolsContextDataType,
    DeFiToolsContextType,
} from '@dapphelpers/defitools'
import { useState } from 'react'
import { Overview as DeFiToolsStakeXOverview } from './defitools/stakex/Overview'
import Broccoliswap from './defitools/broccoliswap/Broccoliswap'
import Linkbridge from './defitools/linkbridge/Linkbridge'

export const DeFiTools = () => {
    const [dataDeFiToolsContext, setDataDeFiToolsContext] =
        useState<DeFiToolsContextDataType>({})

    const providerConfig: DeFiToolsContextType = {
        data: dataDeFiToolsContext,
        setData: setDataDeFiToolsContext,
    }

    return (
        <DeFiToolsContext.Provider value={providerConfig}>
            <div>
                <Routes>
                    <Route element={<DeFiToolsOverview />} path="/" />
                    <Route
                        element={<DeFiToolsStakeXOverview />}
                        path="stakex/*"
                    />
                    <Route element={<Broccoliswap />} path="broccoliswap" />
                    <Route element={<Linkbridge />} path="linkbridge" />

                </Routes>
            </div>
        </DeFiToolsContext.Provider>
    )
}
