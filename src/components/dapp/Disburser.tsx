import { RouteObject } from 'react-router-dom'
import { DisburserApp } from './elements/DisburserApp'
import { useAccount } from 'wagmi'

export const Disburser = () => {
    const { address, isConnected } = useAccount()
    
    return (
        <div>
            <h1 className="mt-4 mb-5 sm:mb-8 font-bold text-3xl font-title flex gap-1 tracking-wide flex-col sm:flex-row">
                <span className="text-techGreen">LEGACY</span>
                <span className="text-degenOrange">DISBURSER</span>
            </h1>
            <div className="rounded-xl border-2 border-degenOrange bg-light-100 p-5 text-light-200 dark:border-activeblue dark:bg-darkerblue  dark:text-light-200">
                This page is meant for Degens that held the old Degen SD tokens. For more information,
                visit our docs <a className="text-degenOrange" href="https://docs.dgnx.finance/ecosystem/products/disburser" target="_blank" rel="noreferrer">here</a>.

                <div className="mt-10">
                    {isConnected
                        ? <DisburserApp />
                        : <div className="font-bold">Please connect wallet</div>}
                </div>
            </div>
        </div>
    )
}
