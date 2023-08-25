import Link from 'next/link'
import Image from 'next/image'
import {
    FaTelegramPlane,
    FaTwitter,
    FaDiscord,
    FaInstagram,
    FaTiktok,
} from 'react-icons/fa'

import { Container } from './Container'

import logoImage from '../images/logo_large.png'

import translations from '../translations/site.json'
import { SiLinktree } from 'react-icons/si'

export function Footer() {
    return (
        <footer className="">
            <Container>
                <div className="py-16">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src={logoImage}
                        alt=""
                        width={56}
                        height={56}
                    />
                </div>
                <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
                    <div className="flex gap-x-6">
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
                    <p className="mt-6  text-slate-500 sm:mt-0">
                        {translations.footer.copyright.en} 🥦{' '}
                        {new Date().getFullYear()}{' '}
                        {translations.footer.reservedRights.en}
                    </p>
                </div>
            </Container>
        </footer>
    )
}
