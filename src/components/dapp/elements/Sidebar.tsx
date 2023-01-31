import { Popover, Transition } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx'
import { Fragment } from 'react';
import { HiHome, HiCurrencyDollar } from 'react-icons/hi'
import { RiGovernmentFill } from 'react-icons/ri'

const navigation = [
    { name: 'Dashboard', icon: HiHome, href: '', count: undefined },
    { name: 'Buy $DGNX', icon: HiCurrencyDollar, href: 'buy', count: undefined },
    { name: 'Governance', icon: RiGovernmentFill, href: 'governance', count: undefined },
]

function MobileNavLink({ href, children, ...props }) {
    return (
        <Popover.Button as={Link} to={href} className="block w-full p-2" {...props}>
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
                            <MobileNavLink key={item.name} href={`/dapp/${item.href}`}>${item.name}</MobileNavLink>
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
        return <MobileSidebar />;
    }
    
    return (
        <div className="flex flex-grow flex-col overflow-y-auto ">
            <div className="flex flex-grow flex-col">
                <nav className="flex-1 space-y-1  px-2" aria-label="Sidebar">
                    {navigation.map((item) => {
                        const current = `/dapp/${item.href}` === location.pathname
                            || `/dapp/${item.href}/` === location.pathname
                            || (`/dapp` === location.pathname && item.href === '')

                        return (
                            <Link
                                key={item.name}
                                to={`/dapp/${item.href}`}
                                className={clsx(
                                    current ? 'bg-orange-100 text-gray-900' : 'text-gray-600 hover:bg-orange-100 hover:text-gray-900',
                                    current ? 'dark:bg-orange-900 dark:text-slate-100' : 'dark:text-slate-400 dark:hover:bg-orange-900 dark:hover:text-slate-100',
                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                )}
                            >
                                <item.icon
                                    className={clsx(
                                        current ? 'text-orange-500' : 'text-gray-400 group-hover:text-orange-500',
                                        'mr-3 flex-shrink-0 h-6 w-6'
                                    )}
                                    aria-hidden="true"
                                />
                                <span className="flex-1">{item.name}</span>
                                {item.count ? (
                                    <span
                                        className={clsx(
                                            current ? 'bg-white' : 'bg-gray-100 group-hover:bg-gray-200',
                                            current ? 'dark:bg-gray-700' : 'dark:bg-gray-700 dark:group-hover:bg-gray-700',
                                            'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full'
                                        )}
                                    >
                                        {item.count}
                                    </span>
                                ) : null}
                            </Link>
                        )
                }
                )}
                </nav>
            </div>
        </div>
    )
}
