import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from './Container'

import translations from '../translations/site.json'

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
    <div
      className={clsx(className, 'opacity-75 hover:opacity-100')}
      {...props}
    >
      <h3
        className={clsx(
          'mt-6 text-sm font-medium',
          'text-slate-600 dark:text-slate-400'
        )}
      >
        {feature.name}
      </h3>
      <p className="mt-2 font-display text-xl text-slate-900 dark:text-slate-400">
        {feature.summary}
      </p>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
    </div>
  )
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.name}>
          <Feature feature={feature} className="mx-auto max-w-2xl" />
        </div>
      ))}
    </div>
  )
}

function FeaturesDesktop() {
  return (
    <Tab.Group as="div" className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <Tab.List className="grid grid-cols-3 gap-x-8">
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.name}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                className="relative"
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
          <h2 className="font-display text-3xl tracking-tight text-slate-900 dark:text-orange-500 sm:text-4xl">
            {translations.features.dgnx.en}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700 dark:text-slate-400">
            {translations.features.description.en}
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
