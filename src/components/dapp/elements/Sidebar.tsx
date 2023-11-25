import { Popover, Transition } from '@headlessui/react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { Fragment } from 'react'
import { HiHome, HiCurrencyDollar } from 'react-icons/hi'
import { FaPiggyBank } from 'react-icons/fa'
import { RiGovernmentFill } from 'react-icons/ri'
import { GiPayMoney } from 'react-icons/gi'

const navigation = [
    { name: 'Dashboard', icon: HiHome, href: '', count: undefined },
    {
        name: 'Buy $DGNX',
        icon: HiCurrencyDollar,
        href: 'https://broccoliswap.com/?inputToken=AVAX&inputChain=AVAX&outputToken=DGNX&outputChain=AVAX&amount=10',
        count: undefined,
    },
    {
        name: 'Liquidity Backing',
        icon: FaPiggyBank,
        href: 'liquidity-backing',
        count: undefined,
    },
    {
        name: 'Governance',
        icon: RiGovernmentFill,
        href: 'governance',
        count: undefined,
    },
    {
        name: 'Disburser',
        icon: GiPayMoney,
        href: 'disburser',
        count: undefined,
    },
    {
        name: 'Degen ATM',
        icon: GiPayMoney,
        href: 'atm',
        count: undefined,
    },
]

function MobileNavLink({ href, children, ...props }) {
    return (
        <Popover.Button
            as={Link}
            to={href}
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

function MobileSidebar() {
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
                        {navigation.map((item) => (
                            <MobileNavLink
                                key={item.name}
                                target={item.href.startsWith('http') ? '_blank' : '_self'}
                                href={item.href.startsWith('http') ? item.href : `/dapp/${item.href}`}
                            >
                                {item.name}
                            </MobileNavLink>
                        ))}
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}

export default function Sidebar(props: { mobile?: boolean }) {
    const location = useLocation()

    if (props.mobile) {
        return <MobileSidebar />
    }

    return (
        <div className="flex flex-grow flex-col overflow-y-auto ">
            <div className="flex flex-grow flex-col">
                <nav
                    className="fixed flex w-64 flex-col gap-2 space-y-1 px-2"
                    aria-label="Sidebar"
                >
                    {navigation.map((item) => {
                        const current =
                            (item.href &&
                                location.pathname.includes(item.href)) ||
                            (`/dapp` === location.pathname &&
                                item.href === '') ||
                            (`/dapp/` === location.pathname && item.href === '')

                        return (
                            <Link
                                key={item.name}
                                to={item.href.startsWith('http') ? item.href : `/dapp/${item.href}`}
                                target={item.href.startsWith('http') ? '_blank' : '_self'}
                                className={clsx(
                                    current
                                        ? 'border-2 border-degenOrange bg-light-100 text-dark'
                                        : 'border-2 border-transparent text-light-800 hover:border-degenOrange hover:bg-light-100 hover:text-dark',
                                    current
                                        ? 'border-2 dark:border-activeblue dark:bg-darkblue dark:text-light-100'
                                        : 'border-2 border-transparent dark:text-light-100 dark:hover:border-activeblue dark:hover:bg-darkblue',
                                    'text-md group flex items-center rounded-xl px-2 py-2 font-bold transition-colors'
                                )}
                            >
                                <item.icon
                                    className={clsx(
                                        current
                                            ? 'text-dark dark:text-light-100'
                                            : 'text-light-800 transition-colors group-hover:text-dark dark:text-light-100 dark:group-hover:text-light-100',
                                        'mr-3 h-6 w-6 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                                <span className="flex-1">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}
