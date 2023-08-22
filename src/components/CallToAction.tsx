/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import { Button } from './Button'
import { Container } from './Container'

import { H1 } from './H1'
import { H2 } from './H2'
import { BsArrowUpRight } from 'react-icons/bs'

import solidproofImage from '../images/solidproof.png'
import { FaTelegram, FaTelegramPlane } from 'react-icons/fa'
import { SiLinktree } from 'react-icons/si'

export function CallToAction() {
    return (
        <Container className="pt-10 pb-10">
            <div className="rounded-lg mt-5 border-2 border-activeblue bg-darkerblue p-5 lg:px-16 lg:py-12 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
                <div className="md:col-span-2">
                    <p className="text-light-600 font-bold mb-5">
                        Explore, connect, and learn with us today!
                    </p>
                    <p className="text-white text-sm mb-5">
                        Navigating our ecosystem is a breeze with us!  Our team is active daily in our vibrant Telegram community group, ready to guide you on your exciting journey. Don't miss out on the wealth of information and support available.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button variant="outline" color="orange" href="https://t.me/DegenXportal" target="_blank" className="uppercase py-1 md:py-2 flex gap-1 text-xs font-extrabold">
                            Join us on telegram <FaTelegramPlane />
                        </Button>
                        <Button variant="outline" color="orange" href="https://linktr.ee/DEGENX" target="_blank" className="uppercase py-1 md:py-2 flex gap-1 text-xs font-extrabold">
                            Find our social links <SiLinktree />
                        </Button>
                    </div>
                </div>
                <div className="order-first md:order-last">
                    <H1 className="leading-tight">Join us and grow <span className="text-degenOrange">together</span></H1>
                </div>
            </div>
        </Container>
    )
}
