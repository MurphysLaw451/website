import Image from 'next/image'
import Link from 'next/link'

import { Container } from '../../Container'

import logoImage from '../../../images/logo.png'
import { DarkmodeToggle } from '../../DarkmodeToggle';
import { DappContainer } from './DappContainer';
import Sidebar from './Sidebar';

export function DappHeader() {
  return (
    <header className="py-6">
      <DappContainer>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <div className="sm:hidden mr-3">
              <Sidebar mobile />
            </div>
            <Link href="/" aria-label="Home">
              <Image
                className="h-12 w-12"
                src={logoImage}
                alt=""
                width={56}
                height={56}
              />
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <DarkmodeToggle />
          </div>
        </nav>
      </DappContainer>
    </header>
  )
}
