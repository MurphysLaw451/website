import { useAccount } from 'wagmi'
import { DisburserApp } from './elements/DisburserApp'

export const Disburser = () => {
    const { isConnected } = useAccount()

    return (
        <div>
            <h1 className="mb-5 mt-4 flex flex-col gap-1 font-title text-3xl font-bold tracking-wide sm:mb-8 sm:flex-row">
                <span className="text-techGreen">LEGACY</span>
                <span className="text-degenOrange">DISBURSER</span>
            </h1>
            <div className="mb-4 rounded-xl border-2 border-degenOrange bg-light-100 p-5 text-light-200 dark:border-activeblue  dark:bg-darkerblue  dark:text-light-200">
                This page is meant for Degens that held the old Degen SD tokens
                <div className="mt-10">
                    {isConnected ? (
                        <DisburserApp />
                    ) : (
                        <div className="font-bold">Please connect wallet</div>
                    )}
                </div>
            </div>
        </div>
    )
}
