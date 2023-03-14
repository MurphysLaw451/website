import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useTheme } from "next-themes"

import projectSwap from '../images/projects/swap.png'
import projectLiqBack from '../images/projects/liqback.png'
import projectDao from '../images/projects/dao.png'
import projectBridge from '../images/projects/bridge.png'
import projectLocker from '../images/projects/locker.png'
import projectStake from '../images/projects/stake.png'
import projectFactor from '../images/projects/factor.png'
import projectClinic from '../images/projects/clinic.png'

import projectSwapDark from '../images/projects/swap-dark.png'
import projectLiqBackDark from '../images/projects/liqback-dark.png'
import projectDaoDark from '../images/projects/dao-dark.png'
import projectBridgeDark from '../images/projects/bridge-dark.png'
import projectLockerDark from '../images/projects/locker-dark.png'
import projectStakeDark from '../images/projects/stake-dark.png'
import projectFactorDark from '../images/projects/factor-dark.png'
import projectClinicDark from '../images/projects/clinic-dark.png'

import { Container } from './Container'

const features = [
  {
    title: 'Liquidity Backing',
    image: projectLiqBack,
    imageDark: projectLiqBackDark,
    description: '$DGNX is the driving force behind the revolutionary DegenX ecosystem. With its solid foundation in a base asset, the DGNX token boasts an ever-growing intrinsic value and is further strengthened by the power of onchain DAO governance.'
  },
  {
    title: 'Swap',
    image: projectSwap,
    imageDark: projectSwap,
    description: 'Our upcoming swap is the ultimate user-friendly decentralized exchange. With compatibility across EVM networks, our DEX is built on a cutting-edge decentralized AMM system, which allows for seamless and effortless trading of multiple cryptocurrencies across multiple chains. Get ready to experience the future of decentralized trading with our upcoming Swap.',
  },
  {
    title: 'DAO',
    image: projectDao,
    imageDark: projectDaoDark,
    description: 'Be a part of something truly exciting and join the DGNX token holder community, where you will become a true owner of the DegenX ecosystem. We are revolutionizing the way organizations are run by offering an alternative to centralized structures, operations, and decision-making processes. With DGNX token, you can truly be in control of the future of the project.'
  },
  {
    title: 'Bridge',
    image: projectBridge,
    imageDark: projectBridgeDark,
    description: 'DGNX will be bridged across several EVM chains including Ethereum and BSC. This allows for a wider distribution of the limited supply of 21 million tokens across multiple blockchain networks, providing greater accessibility and utility for users.'
  },
  {
    title: 'LockeR',
    image: projectLocker,
    imageDark: projectLockerDark,
    description: 'Experience the future of token management with LockeR, the most advanced multichain token locker on the blockchain. With just a few simple steps, easily lock up liquidity, developer tokens, or your own tokens for added security. Our process is fast, easy, and secure, and includes unique options such as contract-based unlocking through voting.'
  },
  {
    title: 'StakeX',
    image: projectStake,
    imageDark: projectStakeDark,
    description: 'StakeX is the ultimate multichain staking smart contract. Whether you\'re looking to stake $DGNX or add a staking protocol to your project, StakeX has you covered. With its unparalleled security and innovation, StakeX sets a new standard in the blockchain world. Take your project to the next level with DegenX StakeX.'
  },
  {
    title: 'Factor',
    image: projectFactor,
    imageDark: projectFactorDark,
    description: 'Advance your project with DegenX Factor, a top-of-the-line blockchain service for projects looking to implement unique features for their tokens. Our technology guarantees a steady increase in the floor price for your tokens, bringing security and stability to your holders. Whether you\'re starting a new venture or upgrading an existing one, DegenX Factor is the perfect solution to take your token to the next level.'
  },
  {
    title: 'Clinic',
    image: projectClinic,
    imageDark: projectClinicDark,
    description: 'DegenX Clinic is a unique project that will serve as a real-world example for our community to come together in a resort-like environment. Designed to help recover from rugpulls in other projects, DegenX Clinic will also be able to generate income by renting it out when not in use. These profits will be used to maintain the facility and further increase the value of our token. Join us in creating a safe haven for the crypto community with DegenX Clinic.'
  },
]

export function Projects() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  const { theme } = useTheme()

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="projects"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-orange-500 dark:bg-gray-900 pt-20 pb-28 sm:py-32"
    >
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl dark:text-orange-500 tracking-tight text-white sm:text-4xl md:text-5xl">
            Nine projects to rule them all
          </h2>
          <p className="mt-6 text-lg tracking-tight text-white dark:text-slate-400">
            Meet the DegenX ecosystem
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 w-full sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        'group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:py-2 lg:px-6',
                        selectedIndex === featureIndex
                          ? 'bg-white dark:bg-white/10 lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                          : 'hover:bg-white/10 lg:hover:bg-white/5'
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-lg [&:not(:focus-visible)]:focus:outline-none',
                            selectedIndex === featureIndex
                              ? 'text-orange-600 lg:text-white dark:text-orange-500'
                              : 'text-orange-100 hover:text-white lg:text-white dark:text-slate-400'
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                          {feature.title}
                        </Tab>
                      </h3>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6">
                      <div className="" />
                      <h3 className="text-center text-white dark:text-slate-400 text-2xl my-3">{feature.title}</h3>
                        <Image className="w-48 h-48 mx-auto" src={theme === 'light' ? feature.imageDark : feature.image} alt={feature.title} unoptimized />
                        <p className="relative mx-auto max-w-2xl text-base text-white dark:text-slate-400 sm:text-center">
                          {feature.description}
                        </p>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  )
}
