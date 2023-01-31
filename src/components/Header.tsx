import { Fragment } from 'react'
import Image from 'next/image'
import { FaTelegramPlane } from 'react-icons/fa';
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from './Button'
import { Container } from './Container'
import { NavLink } from './NavLink'

import logoImage from '../images/logo.png'
import { DarkmodeToggle } from './DarkmodeToggle';

function MobileNavLink({ href, children, ...props }) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2" {...props}>
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
            <MobileNavLink href="#projects">Projects</MobileNavLink>
            <MobileNavLink href="#tokenomics">Tokenomics</MobileNavLink>
            <MobileNavLink href="#backing">Backing</MobileNavLink>
            <MobileNavLink href="#team">Team</MobileNavLink>
            <MobileNavLink href="#roadmap">Roadmap</MobileNavLink>
            <hr className="m-2 border-slate-300/40" />
            <MobileNavLink target="_blank" href="https://app.xy.finance/?amount=1&fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&sourceChainId=1&targetChainId=43114&toTokenAddress=0x51e48670098173025C477D9AA3f0efF7BF9f7812&slippage=15">Buy</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <Image
                className="h-14 w-14"
                src={logoImage}
                alt=""
                width={56}
                height={56}
              />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#tokenomics">Tokenomics</NavLink>
              <NavLink href="#backing">Backing</NavLink>
              <NavLink href="#team">Team</NavLink>
              <NavLink href="#roadmap">Roadmap</NavLink>
              <NavLink target="_blank" href="https://app.xy.finance/?amount=1&fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&sourceChainId=1&targetChainId=43114&toTokenAddress=0x51e48670098173025C477D9AA3f0efF7BF9f7812&slippage=15">Buy</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <Link
              href="https://t.me/DegenXportal"
              className="group"
              target="_blank"
            >
              <FaTelegramPlane className="w-6 h-6 text-gray-500 dark:text-slate-400" />
            </Link>
            <DarkmodeToggle />
            <Button className="" href="/dapp" color="orange">
              <span>
                Launch app
              </span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
