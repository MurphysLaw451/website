import { useAccount } from 'wagmi'
import { ATMApp } from './elements/ATMApp'

export const ATM = () => {
    const { address, isConnected } = useAccount()
    
    return (
        <div>
            <h1 className="mt-4 mb-5 sm:mb-8 font-bold text-3xl font-title flex gap-1 tracking-wide flex-col sm:flex-row">
                <span className="text-techGreen">Degen</span>
                <span className="text-degenOrange">ATM</span>
            </h1>
            <div className="rounded-xl border-2 border-degenOrange bg-light-100 p-5 text-light-200 dark:border-activeblue dark:bg-darkerblue  dark:text-light-200  mb-4">
                <div className="">
                    {isConnected
                        ? <ATMApp />
                        : <div className="font-bold">Please connect wallet</div>}
                </div>
            </div>
        </div>
    )
}
