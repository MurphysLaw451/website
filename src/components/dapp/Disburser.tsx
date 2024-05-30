import { useAccount, useConnect } from 'wagmi'
import { DisburserApp } from './elements/DisburserApp'
import { Tile } from '@dappshared/Tile'
import { Button } from '../Button'
import { ConnectKitButton } from 'connectkit'

export const Disburser = () => {
    const { isConnected, connector } = useAccount()
    const { connect } = useConnect()

    return (
        <div>
            <h1 className="mb-5 mt-4 flex flex-row flex-wrap gap-1 px-8 font-title text-3xl font-bold tracking-wide sm:mb-8 sm:px-0">
                <span className="text-techGreen">LEGACY</span>
                <span className="text-degenOrange">DISBURSER</span>
            </h1>
            <Tile className="flex flex-col gap-10">
                <span>
                    This page is meant for Degens that held the old Degen SD
                    tokens
                </span>
                {isConnected ? (
                    <DisburserApp />
                ) : (
                    <ConnectKitButton.Custom>
                        {({ show, isConnecting }) => {
                            return (
                                <Button
                                    disabled={isConnecting}
                                    variant="primary"
                                    onClick={show}
                                >
                                    Please connect wallet
                                </Button>
                            )
                        }}
                    </ConnectKitButton.Custom>
                )}
            </Tile>
        </div>
    )
}
