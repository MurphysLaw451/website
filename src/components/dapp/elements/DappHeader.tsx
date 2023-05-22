import { ConnectKitButton } from 'connectkit'
import Image from 'next/image'
import Link from 'next/link'
import logoImage from '../../../images/logo.png'
import { DarkmodeToggle } from '../../DarkmodeToggle'
import { DappContainer } from './DappContainer'
import Sidebar from './Sidebar'

export function DappHeader() {
    return (
        <header className="fixed w-full py-3 bg-white dark:bg-gray-900 z-10">
            <DappContainer>
                <nav className="relative z-50 flex justify-between">
                    <div className="flex items-center md:gap-x-12">
                        <div className="mr-3 lg:hidden">
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
                        <ConnectKitButton
                            label="Connect"
                            showAvatar={false}
                            showBalance={true}
                            customTheme={{
                                '--ck-connectbutton-background': '#FF6C26',
                                '--ck-connectbutton-active-background':
                                    '#FF6C26',
                                '--ck-connectbutton-hover-background':
                                    '#F59766',
                                '--ck-connectbutton-color': '#ffffff',
                                '--ck-connectbutton-border-radius': '8px',
                            }}
                        />
                        <DarkmodeToggle />
                    </div>
                </nav>
            </DappContainer>
        </header>
    )
}
