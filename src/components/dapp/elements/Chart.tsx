import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { setTimeout } from 'timers'
import {
    CustomIndicator,
    OhlcStudyPlotStyle,
    RawStudyMetaInfoId,
    StudyPlotType,
} from '../../../../public/charting_library/charting_library'
import { datafeed } from '../../../helpers/datafeed'
import { numberFormatter } from '../../../helpers/price-formatter'
import { BACKING_TYPE, CHART_PRICE_MODE } from '../../../types'

const applyOverrides = (tv: any, bgColor: string) => {
    try {
        tv?.applyOverrides?.({
            // @ts-ignore
            'paneProperties.backgroundType': 'solid',
            'paneProperties.background': bgColor,
        })
    } catch (e) {}
}

const callWhenTVLoaded = async (callback: Function) => {
    if (typeof window.TradingView !== 'undefined') {
        return callback(true)
    }

    await new Promise((resolve) => setTimeout(resolve, 300))
    return callWhenTVLoaded(callback)
}

export const Chart = (props: { wantTokenName: string; className?: string }) => {
    const [backingType, setBackingType] = useState<BACKING_TYPE>(
        BACKING_TYPE.TOTAL
    )
    const [priceMode, setPriceMode] = useState<CHART_PRICE_MODE>(
        CHART_PRICE_MODE.USD
    )
    const [tvLoaded, setTvLoaded] = useState(false)
    const [loadTvCalled, setLoadTvCalled] = useState(false)

    if (!tvLoaded && !loadTvCalled) {
        setLoadTvCalled(true)
        callWhenTVLoaded(setTvLoaded)
    }

    const { theme } = useTheme()

    useEffect(() => {
        // @ts-ignore
        if (!props?.wantTokenName || !tvLoaded) {
            return
        }

        let backingName = 'Total backing'
        if (backingType === BACKING_TYPE.ONE) {
            backingName = 'Backing per 1 DGNX'
        }

        const backingChartName = `${backingName} in ${props.wantTokenName}`

        const bgColor = theme === 'light' ? '#F3F4F6' : '#1e293b'

        // @ts-ignore
        const tv = new window.TradingView.widget({
            // debug: true,

            symbol: `DGNX/${priceMode}`, // default symbol
            // @ts-ignore
            interval: '1D', // default interval
            autosize: true, // displays the chart in the fullscreen mode
            iframe_loading_compatibility_mode: false,
            theme: theme === 'light' ? 'Light' : 'Dark',
            enabled_features: ['iframe_loading_compatibility_mode'],
            disabled_features: [
                'header_symbol_search',
                'symbol_search_hot_key',
                'header_compare',
            ],
            custom_css_url:
                theme === 'light'
                    ? '/custom_chart_light.css'
                    : '/custom_chart.css',
            custom_font_family: "'Space Mono'",
            customFormatters: {
                timeFormatter: null,
                dateFormatter: null,
                priceFormatterFactory: () => {
                    return {
                        format: (price) => numberFormatter.shortenPrice(price),
                    }
                },
                studyFormatterFactory: (format) => {
                    if (format.type === 'price') {
                        return {
                            format: (price) =>
                                numberFormatter.shortenPrice(price),
                        }
                    }
                    return null
                },
            },
            toolbar_bg: bgColor,
            layoutType: '2h',
            loading_screen: { backgroundColor: bgColor },
            datafeed: datafeed(),
            library_path: '/charting_library/',
            container: 'tv_chart_container',
            // @ts-ignore
            custom_indicators_getter: (PineJS) => {
                return Promise.resolve<CustomIndicator[]>([
                    {
                        name: backingChartName,
                        metainfo: {
                            _metainfoVersion: 51,
                            id: 'Backing@tv-basicstudies-1' as RawStudyMetaInfoId,
                            description: backingChartName,
                            shortDescription: backingChartName,
                            format: {
                                type: 'inherit',
                            },
                            is_hidden_study: false,
                            is_price_study: false,
                            isCustomIndicator: true,
                            plots: [
                                {
                                    id: 'plot_0',
                                    type: 'ohlc_open' as StudyPlotType.OhlcOpen,
                                    target: 'plotcandle_0',
                                },
                                {
                                    id: 'plot_1',
                                    type: 'ohlc_high' as StudyPlotType.OhlcHigh,
                                    target: 'plotcandle_0',
                                },
                                {
                                    id: 'plot_2',
                                    type: 'ohlc_low' as StudyPlotType.OhlcLow,
                                    target: 'plotcandle_0',
                                },
                                {
                                    id: 'plot_3',
                                    type: 'ohlc_close' as StudyPlotType.OhlcClose,
                                    target: 'plotcandle_0',
                                },
                            ],

                            ohlcPlots: {
                                plotcandle_0: {
                                    title: 'Plot candle title',
                                },
                            },

                            defaults: {
                                ohlcPlots: {
                                    plotcandle_0: {
                                        borderColor: '#000000',
                                        color: '#2196F3',
                                        drawBorder: false,
                                        drawWick: true,
                                        plottype:
                                            'ohlc_candles' as OhlcStudyPlotStyle.OhlcCandles, // might be 'ohlc_bars' for bars
                                        visible: true,
                                        wickColor: '#2196F3',
                                    },
                                },
                                precision: 4,
                                inputs: {},
                            },
                            styles: {},
                            inputs: [],
                        },
                        constructor: function () {
                            this.init = function (context, inputCallback) {
                                this._context = context
                                console.log(this._context)
                                console.log(PineJS.Std.period(this._context))
                                this._input = inputCallback

                                const symbol = `BACKING/${backingType}/${props.wantTokenName}`
                                this._context.new_sym(
                                    symbol,
                                    PineJS.Std.period(this._context)
                                )
                            }

                            this.main = function (context, inputCallback) {
                                this._context = context
                                this._input = inputCallback

                                this._context.select_sym(1)

                                var o = PineJS.Std.open(this._context)
                                var h = PineJS.Std.high(this._context)
                                var l = PineJS.Std.low(this._context)
                                var c = PineJS.Std.close(this._context)
                                return [o, h, l, c]
                            }
                        },
                    },
                ])
            },
        })

        tv.onChartReady(() => {
            tv.chart(0).createStudy(backingChartName, false, true)

            tv.createDropdown({
                title: 'Price symbol',
                align: 'left',
                items: [
                    {
                        title: 'DGNX/USD',
                        onSelect: () => {
                            setPriceMode(CHART_PRICE_MODE.USD)
                        },
                    },
                    {
                        title: 'DGNX/AVAX',
                        onSelect: () => {
                            setPriceMode(CHART_PRICE_MODE.AVAX)
                        },
                    },
                ],
            })
            tv.createDropdown({
                title: 'Backing',
                align: 'left',
                items: [
                    {
                        title: 'Total backing',
                        onSelect: () => {
                            setBackingType(BACKING_TYPE.TOTAL)
                        },
                    },
                    {
                        title: 'Backing per DGNX',
                        onSelect: () => {
                            setBackingType(BACKING_TYPE.ONE)
                        },
                    },
                ],
            })
        })

        // Set the bg color in a couple of steps so it always works regarding of the user internet speed
        setTimeout(() => {
            applyOverrides(tv, bgColor)
        }, 200)

        setTimeout(() => {
            applyOverrides(tv, bgColor)
        }, 800)

        setTimeout(() => {
            applyOverrides(tv, bgColor)
        }, 1500)

        setTimeout(() => {
            applyOverrides(tv, bgColor)
        }, 3000)

        setTimeout(() => {
            applyOverrides(tv, bgColor)
        }, 7000)
    }, [props.wantTokenName, backingType, priceMode, theme, tvLoaded])

    return (
        <div
            className={clsx(props.className, 'h-full w-full')}
            id="tv_chart_container"
        />
    )
}
