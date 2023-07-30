import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from './Container'

import translations from '../translations/site.json'
import { H2 } from './H2'

const features = [
    {
        name: translations.features.baselineName.en,
        summary: translations.features.baselineSummary.en,
        description: translations.features.baselineDesc.en,
    },
    {
        name: translations.features.daoName.en,
        summary: translations.features.daoSummary.en,
        description: translations.features.daoDesc.en,
    },
    {
        name: translations.features.rewardsName.en,
        summary: translations.features.rewardsSummary.en,
        description: translations.features.rewardsDesc.en,
    },
]

function Feature({ feature, className, ...props }) {
    return (
        <div className={clsx(className)} {...props}>
            <H2>{feature.name}</H2>
            <p className="mt-2 font-display text-lg text-dark dark:text-light-100">
                {feature.summary}
            </p>
            <p className="mt-4 text-sm text-light-800 dark:text-light-600">
                {feature.description}
            </p>
        </div>
    )
}

function FeaturesDesktop() {
    return (
        <Tab.Group as="div" className="mt-10">
            {({ selectedIndex }) => (
                <>
                    <Tab.List className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {features.map((feature, featureIndex) => (
                            <Feature
                                key={feature.name}
                                feature={{
                                    ...feature,
                                    name: (
                                        <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                                            {feature.name}
                                        </Tab>
                                    ),
                                }}
                                className="relative rounded-xl border-2 border-degenOrange bg-light-100 p-3 font-bold dark:border-activeblue dark:bg-darkblue"
                            />
                        ))}
                    </Tab.List>
                </>
            )}
        </Tab.Group>
    )
}

export function Features() {
    return (
        <section
            id="secondary-features"
            aria-label="Features for simplifying everyday business tasks"
            className="pt-20 pb-14 sm:pb-20 sm:pt-32 lg:pb-32"
        >
            <Container>
                <div className="mx-auto max-w-2xl md:text-center">
                    <H2>{translations.features.dgnx.en}</H2>
                    <p className="mt-4 font-bold text-light-800 dark:text-light-100">
                        {translations.features.description.en}
                    </p>
                </div>
                {/* <FeaturesMobile /> */}
                <FeaturesDesktop />
            </Container>
        </section>
    )
}
