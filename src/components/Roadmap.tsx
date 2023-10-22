import Image from 'next/image'
import { Button } from './Button'
import { Container } from './Container'

import { H1 } from './H1'
import { H2 } from './H2'
import { BsSquareFill } from 'react-icons/bs'
import clsx from 'clsx'

import roadmap from '../images/roadmap.svg';

const RoadmapItem = (props: {
    quarter: string,
    year: string,
    items: { text: string; highlight?: boolean }[],
    first?: boolean
}) => {
    return (
        <>
            <div className="col-span-1 sm:col-span-2 flex gap-2 sm:block">
                <h3 className="text-white leading-none font-bold text-3xl sm:text-3xl md:text-4xl">{props.quarter},</h3>
                <h3 className="text-white leading-none font-bold text-3xl sm:text-3xl md:text-4xl">{props.year}</h3>
            </div>
            <div className="hidden sm:col-span-3 w-full sm:flex items-center mx-3 sm:mx-12 text-2xl relative">
                <div className={clsx("border mx-[0.7rem] border-white h-[150%] z-0 absolute", props.first && 'top-1/2')} />
                <BsSquareFill className="text-techGreen rotate-45 z-1 mb-5" />
            </div>
            <div className="col-span-1 sm:col-span-7">
                {props.items.map((item, i) => {
                    return (
                        <div key={i} className={item.highlight ? 'text-white' : 'text-white'}>{item.text}</div>
                    )
                })}
            </div>
            <div className="flex items-center text-2xl my-3 justify-center sm:hidden"><BsSquareFill className="text-techGreen rotate-45 z-1" /></div>
        </>
    )
}

export function Roadmap() {
    return (
        <div className="relative max-w-7xl mx-auto" id="roadmap">
            <div className="absolute hidden md:block top-0 bottom-0 left-0 right-0 z-0" style={{
            backgroundImage: `url(${roadmap.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '600px',
            backgroundPosition: 'left 80%'
        }}>
                
            </div>
            <Container className="pt-10 pb-10 text-center relative z-1">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="col-span-1">
                        <div className="text-center">
                            <H1 className=" leading-10">
                                The road <span className="text-degenOrange">ahead</span> is bright
                            </H1>
                        </div>
                        <p className="mt-6 font-semibold sm:px-10 max-w-2xl text-md text-left md:text-center text-light-600 mx-8 md:mx-0">
                            Remembering our past achievements and forging a path into the future!
                        </p>
                    </div>
                    <div className="md:col-span-2 rounded-lg text-left mt-5 border-2 border-activeblue bg-darkerblue py-6 px-8 lg:px-16 lg:py-12">
                        <div className="relative overflow-hidden grid grid-cols-1 sm:grid-cols-12 gap-2  font-semibold">
                            <RoadmapItem
                                first
                                quarter="Q3"
                                year="2022"
                                items={[
                                    { text: 'DGNX launched on Avalanche', highlight: true },
                                    { text: 'LPs created on TraderJoe and Pangolin DEX' },
                                    { text: 'Website created' },
                                    { text: 'List on CMC / CG / Dextools' },
                                ]}
                            />
                            <RoadmapItem
                                quarter="Q4"
                                year="2022"
                                items={[
                                    { text: 'DAO public release', highlight: true },
                                    { text: 'Contract ownership transferred tot DAO' },
                                    { text: 'First successful on-chain DAO vote' },
                                    { text: 'Commence work on Liquidity Backing', highlight: true },
                                ]}
                            />
                            <RoadmapItem
                                quarter="Q1"
                                year="2023"
                                items={[
                                    { text: 'DEGENX Arcade lauched on Telegram', highlight: true },
                                    { text: 'BroccoliSwap formally announced' },
                                    { text: 'Dippy Degen Telegram game launch' },
                                    { text: 'First language specific Telegram group' },
                                ]}
                            />
                            <RoadmapItem
                                quarter="Q2"
                                year="2023"
                                items={[
                                    { text: 'Degen Jump Telegram game launch' },
                                    { text: 'Updates to various Telegram bots' },
                                    { text: 'DGNX Buy / Sell tax reduced to 8%', highlight: true },
                                    { text: 'Liquidity Backing audit completed' },
                                    { text: 'Liquidity Backing public release', highlight: true },
                                    { text: 'Commence work on DEGENX rebrand' },
                                    { text: 'Commence work on BroccoliSwap', highlight: true },
                                    { text: 'Commence work on LinkBridge', highlight: true },
                                ]}
                            />
                            <RoadmapItem
                                quarter="Q3"
                                year="2023"
                                items={[
                                    { text: 'Rebrand formally announced' },
                                    { text: 'Rebrand public release', highlight: true },
                                    { text: 'Broccoliswap enters beta testing' },
                                    { text: 'DGNX Buy / Sell tax reduced to 5%', highlight: true },
                                    { text: 'Rebranded website launched', highlight: true },
                                    { text: 'BroccoliSwap public release', highlight: true },
                                ]}
                            />
                            <RoadmapItem
                                quarter="Q4"
                                year="2023"
                                items={[
                                    { text: 'Add Arbitrum to BroccoliSwap' },
                                ]}
                            />
                            
                            <div className="col-span-1 sm:col-span-2">
                                <h3 className="text-white leading-none font-bold text-xl">Coming</h3>
                                <h3 className="text-white leading-none font-bold text-xl">Soon</h3>
                            </div>
                            <div className="hidden sm:col-span-3 sm:flex w-full items-center mx-3 sm:mx-12 text-2xl relative">
                                <div className="border mx-[0.7rem] border-white h-[100%] z-0 absolute bottom-1/2" />
                                <BsSquareFill className="text-techGreen rotate-45 z-1 mb-5" />
                            </div>
                            <div className="col-span-1 sm:col-span-7">
                                <div className="text-light-600">LinkBridge audit</div>
                                <div className="text-light-600">LinkBridge launch to ETH</div>
                                <div className="text-light-600">LinkBridge launch to BSC</div>
                                <div className="text-light-600">Broccoliswap [REDACTED]</div>
                                <div className="text-light-600">Broccoliswap token sniffer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
