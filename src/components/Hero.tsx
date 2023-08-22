import Image from 'next/image'

import { Button } from './Button'
import { Container } from './Container'

import translations from '../translations/site.json'
import { H1 } from './H1'
import { BsArrowUpRight } from 'react-icons/bs'

export function Hero() {
    return (
        <Container className="pt-20 pb-16 text-center lg:pt-20">
            <div className="text-center md:text-left">
                <H1 className="text-4xl sm:text-5xl">
                    <span className="text-techGreen block">SIMPLICITY</span>
                    <span className="text-white block md:inline md:ml-24 md:mr-3">MEETS</span>
                    <span className="text-degenOrange block md:inline">INNOVATION</span>
                </H1>
            </div>
            <p className="mt-6 max-w-2xl text-left text-light-600">
                Welcome to DEGENX, the ultimate multichain DeFi ecosystem! Stake DGNX, influence governance, and enjoy revenue-sharing rewards. Rest easy with Liquidity Backing, while exploring innovative DeFi products across multiple blockchains.
            </p>
            <div className="flex mt-5">
                <div className="border-l-2 border-t-2 border-b-2 w-3 border-techGreen" />
                <ul className="text-white font-bold text-left list-disc ml-4 py-2">
                    <li>Powered by DGNX on Avalanche</li>
                    <li>100% DAO owned and controlled</li>
                    <li>Contract Audited and Team KYC</li>
                </ul>
            </div>
            <div className="mt-10 flex justify-center gap-x-6">
                <Button className="flex gap-1 lg:ml-3" href="/dapp" color="orange">
                    <span>{translations.header.launchApp.en}</span>
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
    )
}
