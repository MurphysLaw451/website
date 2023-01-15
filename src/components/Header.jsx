import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { NavLink } from '@/components/NavLink'

import logoImage from '@/images/logo.png'

function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
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
                className="h-14 w-14 object-cover"
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
              <svg className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700" width="24px" height="24px" style={{ 'fillRule': 'evenodd', 'clipRule': 'evenodd', 'strokeLinejoin': 'round', 'stroke-miterlimit': 1.41421 }}><path id="telegram-1" d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z" /></svg>
            </Link>
            <Button href="https://app.dgnx.finance/dashboard" color="orange">
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
