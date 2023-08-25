import type { LiFiWidget } from '@lifi/widget'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { RouteObject } from 'react-router-dom'
import { Chart } from './elements/Chart'
import { H1 } from '../H1'
import { H2 } from '../H2'

const LiFiWidgetDynamic = dynamic(
    () => import('@lifi/widget').then((module) => module.LiFiWidget) as any,
    {
        ssr: false,
    }
) as typeof LiFiWidget

export const BuyDGNX = (props: RouteObject) => {
    const { theme } = useTheme()

    return (
        <>
            <div className="lifi-container">
                <h1 className="mt-4 mb-5 sm:mb-8 font-bold text-3xl font-title flex gap-1 tracking-wide">
                    <span className="text-techGreen">BUY</span>
                    <span className="text-degenOrange">$DGNX</span>
                </h1>
                <p className="mb-3  text-light-800 dark:text-light-600">
                    Note: the{' '}
                    <a
                        href="https://docs.dgnx.finance/whitepaper/tokenomics/tax"
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange-500 underline"
                    >
                        5% tax
                    </a>{' '}
                    is not included below!
                </p>
                <div className="flex gap-6">
                    <div className="min-w-[392px] rounded-xl border-2 border-degenOrange bg-light-100 p-3 dark:border-activeblue dark:bg-darkerblue">
                        <LiFiWidgetDynamic
                            config={{
                                fee: 0,
                                disableAppearance: true,
                                containerStyle: {
                                    backgroundColor: 'transparent !important',
                                    width: 392,
                                    // height: 640,
                                    // border: `1px solid rgb(234, 234, 234)`,
                                    // borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'start',
                                    justifyContent: 'left',
                                    // maxWidth: 392,
                                },
                                appearance: (theme !== 'system'
                                    ? theme
                                    : undefined) as
                                    | 'dark'
                                    | 'light'
                                    | undefined,
                                // variant: 'expandable',

                                slippage: 0.15,
                                toChain: 43114,
                                toToken:
                                    '0x51e48670098173025c477d9aa3f0eff7bf9f7812',
                            }}
                        />
                    </div>
                    <div className="hidden flex-grow rounded-xl border-2 border-degenOrange bg-light-100 p-3 dark:border-activeblue dark:bg-darkerblue md:block">
                        <Chart wantTokenName="USDC.e" />
                    </div>
                </div>
            </div>
            <div className="my-12 rounded-xl border-2 border-degenOrange bg-light-100 p-5 text-light-600 dark:border-activeblue dark:bg-darkerblue">
                <H2>FAQ</H2>
                <p className="mt-6">
                    <div className="text-dark dark:text-light-100 font-bold">
                        It hangs on the bridge transaction. What should I do?
                    </div>
                    <br />
                    Sometimes bridges are very slow. So slow, that the swap
                    widget &quot;forgets&quot; that it is swapping and will just
                    hang. But do not worry! Your funds do not disappear
                    suddenly. If it is hanging for a long time (10 minutes or
                    so), check your address on{' '}
                    <a
                        className="text-degenOrange transition-colors hover:text-rusty"
                        href="https://snowtrace.io/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Snowtrace
                    </a>
                    . You should have some tokens over there that are bridged,
                    eg bridged USDC, USDT or even bridged BNB or ETH.
                </p>
                <p>
                    If you identified the token you now own, you can just swap
                    again using our widget with that token on the AVAX chain as
                    input.
                </p>
                <p className="mt-6">
                    <div className="text-dark dark:text-light-100 font-bold">
                        It cannot find a route. What should I do?
                    </div>
                    <br />
                    The widget we use cannot really deal very well with our
                    token tax. Sometimes it cannot find any routes, especially
                    with very low or very high input numbers. If that is the
                    case, please use another method to swap, like{' '}
                    <a
                        className="text-degenOrange transition-colors hover:text-rusty"
                        href="https://app.rubic.exchange/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Rubic
                    </a>
                    .
                </p>
                <p>
                    Note that we are currently building{' '}
                    <a
                        className="text-degenOrange transition-colors hover:text-rusty"
                        href="https://broccoliswap.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Broccoliswap
                    </a>
                    , a multichain DEX, with user friendliness and better
                    routing taken into account.
                </p>
                <p className="mt-6">
                    <div className="text-dark dark:text-light-100 font-bold">
                        I need other help
                    </div>
                    <br />
                    Please join our Telegram community group and ask your
                    question over there!{' '}
                    <a
                        className="text-degenOrange transition-colors hover:text-rusty"
                        href="https://t.me/DegenXportal"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Join here
                    </a>
                </p>
            </div>
        </>
    )
}
