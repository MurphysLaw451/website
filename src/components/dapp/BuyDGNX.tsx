import type { LiFiWidget } from '@lifi/widget'; 
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { RouteObject } from "react-router-dom"

const LiFiWidgetDynamic = dynamic(
    () => import('@lifi/widget').then((module) => module.LiFiWidget) as any,
    {
        ssr: false,
    },
) as typeof LiFiWidget;

export const BuyDGNX = (props: RouteObject) => {
    const { theme } = useTheme();
    
    return (
        <div className="lifi-container">
            <h1 className="text-4xl mb-4">Buy $DGNX</h1>
            <p>Note that the 10% tokenomics tax is not included in the calculations below!</p>
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
                    appearance: (theme !== 'system' ? theme : undefined) as 'dark' | 'light' | undefined,
                    variant: 'expandable',
                    
                    slippage: 0.15,
                    toChain: 43114,
                    toToken: '0x51e48670098173025c477d9aa3f0eff7bf9f7812',
                }}
            />
        </div>
    )
}
