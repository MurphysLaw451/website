import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'

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
import { H2 } from './H2'

const features = [
    {
        title: translations.projects.features.liqBacking.title.en,
        image: projectLiqBack,
        imageDark: projectLiqBackDark,
        description: translations.projects.features.liqBacking.description.en,
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
        description: translations.projects.features.dao.description.en,
    },
    {
        title: translations.projects.features.bridge.title.en,
        image: projectBridge,
        imageDark: projectBridgeDark,
        description: translations.projects.features.bridge.description.en,
    },
    {
        title: translations.projects.features.locker.title.en,
        image: projectLocker,
        imageDark: projectLockerDark,
        description: translations.projects.features.locker.description.en,
    },
    {
        title: translations.projects.features.stake.title.en,
        image: projectStake,
        imageDark: projectStakeDark,
        description: translations.projects.features.stake.description.en,
    },
    {
        title: translations.projects.features.factor.title.en,
        image: projectFactor,
        imageDark: projectFactorDark,
        description: translations.projects.features.factor.description.en,
    },
    {
        title: translations.projects.features.clinic.title.en,
        image: projectClinic,
        imageDark: projectClinicDark,
        description: translations.projects.features.clinic.description.en,
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
            className="relative overflow-hidden pt-20 pb-28 font-bold text-light-800 dark:text-light-100 sm:py-32"
        >
            <Container className="relative">
                <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
                    <H2>{translations.projects.title.en}</H2>
                    <p className="mt-6 text-lg">
                        {translations.projects.meetEcosystem.en}
                    </p>
                </div>
                <Tab.Group
                    as="div"
                    className="mt-16 grid grid-cols-1 items-start gap-x-5 gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
                    vertical={tabOrientation === 'vertical'}
                >
                    {({ selectedIndex }) => (
                        <>
                            <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                                <Tab.List className="relative z-10 flex w-full gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                                    {features.map((feature, featureIndex) => (
                                        <div
                                            key={feature.title}
                                            className={clsx(
                                                'group relative mb-2 rounded-xl border-2 py-1 px-4 transition-colors lg:rounded-l-xl lg:py-2 lg:px-6',
                                                selectedIndex === featureIndex
                                                    ? 'border-degenOrange bg-light-100 dark:border-activeblue dark:bg-darkblue'
                                                    : 'hover:border-degenOrange hover:bg-light-100 dark:border-activeblue dark:bg-dark dark:hover:bg-darkblue '
                                            )}
                                        >
                                            <h3>
                                                <Tab
                                                    className={clsx(
                                                        'font-display text-lg [&:not(:focus-visible)]:focus:outline-none',
                                                        selectedIndex ===
                                                            featureIndex
                                                            ? 'text-light-800 dark:text-light-100'
                                                            : 'text-light-800 dark:text-light-100'
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
                            <Tab.Panels className="rounded-xl border-2 border-degenOrange bg-light-100 p-3 dark:border-activeblue dark:bg-darkblue lg:col-span-7">
                                {features.map((feature) => (
                                    <Tab.Panel
                                        key={feature.title}
                                        unmount={false}
                                    >
                                        <div className="relative sm:px-6">
                                            <div className="" />
                                            <H2 className="font-title">
                                                {feature.title}
                                            </H2>
                                            <Image
                                                className="mx-auto h-48 w-48"
                                                src={
                                                    theme === 'dark'
                                                        ? feature.image
                                                        : feature.imageDark
                                                }
                                                alt={feature.title}
                                                unoptimized
                                            />
                                            <p className="relative mx-auto max-w-2xl text-light-800 dark:text-light-100 sm:text-center">
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
