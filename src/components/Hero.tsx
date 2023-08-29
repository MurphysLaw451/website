import Image from 'next/image'

import { Button } from './Button'
import { Container } from './Container'

import translations from '../translations/site.json'
import { H1 } from './H1'
import { BsArrowUpRight } from 'react-icons/bs'

import dgnxSide from '../images/dgnx-side.png';

export function Hero() {
    return (
        <div className="relative max-w-7xl mx-auto">
            <div
                className="hidden md:block absolute opacity-40 right-0 left-0 top-0 bottom-0"
                style={{
                    backgroundImage: `url(${dgnxSide.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center right'
                }}
            />
            <div
                className="block md:hidden absolute opacity-40 right-0 left-0 top-0 -bottom-28"
                style={{
                    backgroundImage: `url(${dgnxSide.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'right bottom'
                }}
            />
            <Container className="md:pt-20 pt-5 pb-16 text-center lg:pt-20 relative z-1">
                <div className="text-left md:text-left mx-8 md:mx-0">
                    <H1 className="text-4xl md:text-5xl leading-10 md:leading-normal font-semibold">
                        <span className="text-techGreen block">SIMPLICITY</span>
                        <span className="text-white block md:inline md:ml-24 md:mr-3">MEETS</span>
                        <span className="text-degenOrange block md:inline">INNOVATION</span>
                    </H1>
                </div>
                <p className="mt-3 font-semibold md:mt-6 max-w-2xl text-left text-light-600 mx-8 md:mx-0">
                    Welcome to DEGENX, the ultimate multichain DeFi ecosystem! Stake DGNX, influence governance, and enjoy revenue-sharing rewards. Rest easy with Liquidity Backing, while exploring innovative DeFi products across multiple blockchains.
                </p>
                <div className="flex mt-5 mx-8 md:mx-0">
                    <div className="border-l-2 border-t-2 border-b-2 w-3 border-techGreen" />
                    <ul className="text-white font-bold text-left list-disc ml-4 py-2">
                        <li>Powered by DGNX on Avalanche</li>
                        <li>100% DAO owned and controlled</li>
                        <li>Contract Audited and Team KYC</li>
                    </ul>
                </div>
                <div className="mt-10 flex justify-center gap-x-6">
                    <Button className="flex gap-1 lg:ml-3" href="/dapp" color="orange">
                        <span>Launch app</span>
                        <BsArrowUpRight />
                    </Button>
                    <Button
                        href="https://docs.dgnx.finance/"
                        variant="outline"
                        color="orange"
                        target="_blank"
                    >
                        <span className="flex gap-1 items-center">Open docs <BsArrowUpRight /></span>
                    </Button>
                </div>
            </Container>
        </div>
    )
}
