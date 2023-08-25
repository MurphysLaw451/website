import Image from 'next/image'
import { Button } from './Button'
import { Container } from './Container'

import { H1 } from './H1'
import { H2 } from './H2'
import Link from 'next/link'
import { FaTelegramPlane, FaTwitter, FaDiscord, FaInstagram, FaTiktok } from 'react-icons/fa'
import { SiLinktree } from 'react-icons/si'

export function Discover() {
    return (
        <Container className="pt-10 pb-10 text-center text-light-600">
            Discover our ecosystem
            <div className="flex gap-x-6 items-center justify-center mt-3">
                <Link
                    href="https://t.me/DegenXportal"
                    target="_blank"
                    className="group"
                >
                    <FaTelegramPlane className="h-6 w-6 text-light-600 hover:text-light-200" />
                </Link>
                <Link
                    href="https://twitter.com/degenecosystem"
                    target="_blank"
                    className="group"
                >
                    <div className="h-6 text-center text-light-600 hover:text-light-200 text-2xl -mt-1">𝕏</div>
                </Link>
                <Link
                    href="https://discord.gg/BMaVtEVkgC"
                    target="_blank"
                    className="group"
                >
                    <FaDiscord className="h-6 w-6 text-light-600 hover:text-light-200" />
                </Link>
                <Link
                    href="https://instagram.com/degenecosystem"
                    target="_blank"
                    className="group"
                >
                    <FaInstagram className="h-6 w-6 text-light-600 hover:text-light-200" />
                </Link>
                <Link
                    href="https://www.tiktok.com/@degen_traders"
                    target="_blank"
                    className="group"
                >
                    <FaTiktok className="h-6 w-6 text-light-600 hover:text-light-200" />
                </Link>
                <Link
                    href="https://linktr.ee/DEGENX"
                    target="_blank"
                    className="group"
                >
                    <SiLinktree className="h-6 w-6 text-light-600 hover:text-light-200" />
                </Link>
            </div>
        </Container>
    )
}
