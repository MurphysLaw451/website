import Image from 'next/image'
import Link from 'next/link'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { RxCross1 } from 'react-icons/rx'

import { Container } from '../../Container'

import logoImage from '../../../images/logo.png'
import { DarkmodeToggle } from '../../DarkmodeToggle';
import { DappContainer } from './DappContainer';
import Sidebar from './Sidebar';
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi';
import { visualAddress } from '../../../helpers/address'

export function DappHeader() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  
  return (
    <header className="py-3 fixed w-full dark:bg-gray-900">
      <DappContainer>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <div className="lg:hidden mr-3">
              <Sidebar mobile />
            </div>
            <Link href="/" aria-label="Home">
              <Image
                className="h-8 w-8"
                src={logoImage}
                alt=""
                width={48}
                height={48}
              />
            </Link>
          </div>
          <div className="flex items-center gap-x-2 md:gap-x-2">
            {isConnected
              ? (
                <>
                  <p>{visualAddress(address)}</p>
                  <button
                    className="border border-orange-500 text-black dark:text-white dark:border-orange-600 py-2 px-2 rounded-lg hover:bg-orange-500"
                    onClick={() => disconnect()}
                  >
                    <RxCross1 />
                  </button>
                </>
              )
              : <button
                className="bg-orange-500 hover:bg-orange-400 text-white dark:bg-orange-600 py-1 px-3 rounded-lg dark:hover:bg-orange-700"
                onClick={() => connect()}
              >
                Connect
              </button>
            }
            
            <DarkmodeToggle />
          </div>
        </nav>
      </DappContainer>
    </header>
  )
}
