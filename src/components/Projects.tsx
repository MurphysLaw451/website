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

import translations from '../translations/site.json'

const features = [
  {
    title: translations.projects.features.liqBacking.title.en,
    image: projectLiqBack,
    imageDark: projectLiqBackDark,
    description: translations.projects.features.liqBacking.description.en
  },
  {
    title: translations.projects.features.swap.title.en,
    image: projectSwap,
    imageDark: projectSwapDark,
    description: translations.projects.features.swap.description.en,
  },
  {
    title: translations.projects.features.dao.title.en,
    image: projectDao,
    imageDark: projectDaoDark,
    description: translations.projects.features.dao.description.en
  },
  {
    title: translations.projects.features.bridge.title.en,
    image: projectBridge,
    imageDark: projectBridgeDark,
    description: translations.projects.features.bridge.description.en
  },
  {
    title: translations.projects.features.locker.title.en,
    image: projectLocker,
    imageDark: projectLockerDark,
    description: translations.projects.features.locker.description.en
  },
  {
    title: translations.projects.features.stake.title.en,
    image: projectStake,
    imageDark: projectStakeDark,
    description: translations.projects.features.stake.description.en
  },
  {
    title: translations.projects.features.factor.title.en,
    image: projectFactor,
    imageDark: projectFactorDark,
    description: translations.projects.features.factor.description.en
  },
  {
    title: translations.projects.features.clinic.title.en,
    image: projectClinic,
    imageDark: projectClinicDark,
    description: translations.projects.features.clinic.description.en
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
            {translations.projects.title.en}
          </h2>
          <p className="mt-6 text-lg tracking-tight text-white dark:text-slate-400">
            {translations.projects.meetEcosystem.en}
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
                        <Image className="w-48 h-48 mx-auto" src={theme === 'dark' ? feature.image : feature.imageDark} alt={feature.title} unoptimized />
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
