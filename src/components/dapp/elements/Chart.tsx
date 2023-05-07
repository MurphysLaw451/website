import React, { useEffect, useRef } from 'react';
import { setTimeout } from 'timers';
import { datafeed } from '../../../helpers/datafeed';
import clsx from 'clsx';
import { CustomIndicator, IPineStudyResult, LibraryPineStudy, OhlcStudyPlotStyle, RawStudyMetaInfoId } from '../../../../public/charting_library/charting_library';
import { StudyPlotType } from '../../../../public/charting_library/charting_library';

const applyOverrides = (tv: any) => {
    try {
        tv?.applyOverrides?.({
            // @ts-ignore
            'paneProperties.backgroundType': "solid",
            "paneProperties.background": "#1e293b"
        })
    } catch (e) { }
}

export const Chart = (props: {
    wantToken: { decimals: number; address: string; info: { name: string }},
    className?: string 
}) => {
    useEffect(() => {
        if (!props?.wantToken?.info?.name) {
            return;
        }
        // @ts-ignore
        const tv = new TradingView.widget({
            // debug: true,

            symbol: 'DGNX/USD', // default symbol
            // @ts-ignore
            interval: '1', // default interval
            autosize: true, // displays the chart in the fullscreen mode
            theme: 'Dark',
            disabled_features: ["header_symbol_search", "symbol_search_hot_key", "header_compare"],
            custom_css_url: '/custom_chart.css',
            custom_font_family: '\'Space Mono\'',
            toolbar_bg: '#1e293b',
            layoutType: '2h',
            loading_screen: { backgroundColor: "#1e293b" },
            datafeed: datafeed(),
            library_path: '/charting_library/',
            container: 'tv_chart_container',
            custom_indicators_getter: PineJS => {
                return Promise.resolve<CustomIndicator[]>([
                    {
                        name: `Backing in ${props.wantToken.info.name}`,
                        metainfo: {
                            _metainfoVersion: 51,
                            id: 'Backing@tv-basicstudies-1' as RawStudyMetaInfoId,
                            description: `Backing in ${props.wantToken.info.name}`,
                            shortDescription: `Backing in ${props.wantToken.info.name}`,
                            format: {
                                type: 'inherit'
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
                                        plottype: 'ohlc_candles' as OhlcStudyPlotStyle.OhlcCandles, // might be 'ohlc_bars' for bars
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
                        constructor: function() {
                            this.init = function(context, inputCallback) {
                                this._context = context;
                                this._input = inputCallback;

                                const symbol = `BACKING/${props.wantToken.info.name}`;
                                this._context.new_sym(
                                    symbol,
                                    PineJS.Std.period(this._context)
                                );
                            }

                            this.main = function(context, inputCallback) {
                                this._context = context;
                                this._input = inputCallback;

                                this._context.select_sym(1);

                                var o = PineJS.Std.open(this._context);
                                var h = PineJS.Std.high(this._context);
                                var l = PineJS.Std.low(this._context);
                                var c = PineJS.Std.close(this._context);
                                return [o,h,l,c];

                                // console.log(context)

                                // var direction = Math.sign(Math.random() - 0.5);
                                // var value = Math.random() * 200;

                                // var open  = value + 8 * direction;
                                // var high = value + 15;
                                // var low = value - 15;
                                // var close = value - 8 * direction;

                                // return [open, high, low, close];
                            }
                        }
                    }
                ]);
            },
        });

        tv.onChartReady(() => {
            tv.chart(0).createStudy(`Backing in ${props.wantToken.info.name}`, false, true);
        })

        // Set the bg color in a couple of steps so it always works regarding of the user internet speed
        setTimeout(() => {
            applyOverrides(tv)
        }, 200)

        setTimeout(() => {
            applyOverrides(tv)
        }, 800)

        setTimeout(() => {
            applyOverrides(tv)
        }, 1500)

        setTimeout(() => {
            applyOverrides(tv)
        }, 3000)

        setTimeout(() => {
            applyOverrides(tv)
        }, 7000)
    }, [props.wantToken])

    return (
        <div
            className={clsx(props.className, "h-full w-full")}
            id="tv_chart_container"
        />
    );
};
