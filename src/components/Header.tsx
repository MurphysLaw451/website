import { Fragment } from 'react'
import Image from 'next/image'
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa'
import { SiLinktree } from 'react-icons/si'
import { BsArrowUpRight } from 'react-icons/bs'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from './Button'
import { Container } from './Container'
import { NavLink } from './NavLink'

import logoImage from '../images/logo_large.png'
import { DarkmodeToggle } from './DarkmodeToggle'

import translations from '../translations/site.json'

function MobileNavLink({ href, children, ...props }) {
    return (
        <Popover.Button
            as={Link}
            href={href}
            className="block w-full p-2"
            {...props}
        >
            {children}
        </Popover.Button>
    )
}

function MobileNavIcon({ open }) {
    return (
        <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 overflow-visible stroke-slate-700 dark:stroke-slate-200"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
        >
            <path
                d="M0 1H14M0 7H14M0 13H14"
                className={clsx(
                    'origin-center transition',
                    open && 'scale-90 opacity-0'
                )}
            />
            <path
                d="M2 2L12 12M12 2L2 12"
                className={clsx(
                    'origin-center transition',
                    !open && 'scale-90 opacity-0'
                )}
            />
        </svg>
    )
}

function MobileNavigation() {
    return (
        <Popover>
            <Popover.Button
                className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation"
            >
                {({ open }) => <MobileNavIcon open={open} />}
            </Popover.Button>
            <Transition.Root>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        as="div"
                        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
                    >
                        <MobileNavLink href="#holder">
                            $DGNX
                        </MobileNavLink>
                        <MobileNavLink href="#ecosystem">
                            Ecosystem
                        </MobileNavLink>
                        <MobileNavLink href="#roadmap">
                            Roadmap
                        </MobileNavLink>
                        <MobileNavLink href="#join">
                            Social
                        </MobileNavLink>
                        <MobileNavLink href="#team">
                            Team
                        </MobileNavLink>
                        <hr className="m-2 border-slate-300/40" />
                        <MobileNavLink href="/dapp/buy">
                            {translations.header.buy.en}
                        </MobileNavLink>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}

export function Header() {
    return (
        <header className="py-2 sm:py-5">
            <Container>
                <nav className="relative z-50 flex justify-between items-center gap-y-3">
                    <div className="flex items-center lg:gap-x-12">
                        <Link href="#" aria-label="Home">
                            <Image
                                src={logoImage}
                                alt=""
                                height={48}
                            />
                        </Link>
                        <div className="hidden lg:flex lg:gap-x-1 xl:gap-x-5">
                            <NavLink href="#holder">
                                $DGNX
                            </NavLink>
                            <NavLink href="#ecosystem">
                                Ecosystem
                            </NavLink>
                            <NavLink href="#roadmap">
                                Roadmap
                            </NavLink>
                            <NavLink href="#join">
                                Social
                            </NavLink>
                            <NavLink href="#team">
                                Team
                            </NavLink>
                            <NavLink href="/dapp/buy">
                                Buy
                            </NavLink>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-5 md:gap-x-3 xl:gap-x-3 flex-col sm:flex-row">
                        <div className="hidden sm:flex gap-x-5 md:gap-x-3 xl:gap-x-3">
                            <Link
                                href="https://t.me/DegenXportal"
                                className="group text-light-600 hover:border-degenOrange border-b-2 border-transparent pb-2"
                                target="_blank"
                            >
                                <FaTelegramPlane className="h-6 w-6 " />
                            </Link>
                            <Link
                                href="https://twitter.com/DegenEcosystem"
                                className="group text-light-600 hover:border-degenOrange border-b-2 border-transparent pb-2"
                                target="_blank"
                            >
                                <div className="h-6 text-center  text-2xl -mt-1">𝕏</div>
                            </Link>
                            <Link
                                href="https://discord.gg/BMaVtEVkgC"
                                className="group text-light-600 hover:border-degenOrange border-b-2 border-transparent pb-2"
                                target="_blank"
                            >
                                <FaDiscord className="h-6 w-6 " />
                            </Link>
                            <Link
                                href="https://linktr.ee/DEGENX"
                                className="group text-light-600 hover:border-degenOrange border-b-2 border-transparent pb-2"
                                target="_blank"
                            >
                                <SiLinktree className="h-6 w-6 " />
                            </Link>
                        </div>
                        <DarkmodeToggle />
                        <div className="flex gap-1 items-center flex-row-reverse sm:flex-row">
                            <Button className="hidden sm:flex gap-1 lg:ml-3" href="/dapp" color="orange">
                                <span>Launch app</span>
                                <BsArrowUpRight />
                            </Button>
                            <div className="-mr-1 lg:hidden">
                                <MobileNavigation />
                            </div>
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}
