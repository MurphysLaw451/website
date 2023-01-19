import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from './Container'

const features = [
  {
    name: 'Baseline value',
    summary: 'Ever increasing minimum value of $DGNX.',
    description:
      'You can always burn your $DGNX to get the backing back, even if the market price is lower than the backing price.',
  },
  {
    name: 'DAO token',
    summary: 'Vote in our DAO and be part of the direction DegenX takes.',
    description:
      'All contracts are owned by the DAO and the project is truly community-led.',
  },
  {
    name: 'Rewards',
    summary: 'Earn by staking $DGNX.',
    description:
      'We are developing several revenue generating services, like StakeX and Factor and will distributing the revenue to stakers. Earn by staking $DGNX',
  },
]

function Feature({ feature, isActive, className, ...props }) {
  return (
    <div
      className={clsx(className, !isActive && 'opacity-75 hover:opacity-100')}
      {...props}
    >
      <h3
        className={clsx(
          'mt-6 text-sm font-medium',
          isActive ? 'text-orange-600' : 'text-slate-600'
        )}
      >
        {feature.name}
      </h3>
      <p className="mt-2 font-display text-xl text-slate-900">
        {feature.summary}
      </p>
      <p className="mt-4 text-sm text-slate-600">{feature.description}</p>
    </div>
  )
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.name}>
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
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
                isActive={featureIndex === selectedIndex}
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
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            $DGNX
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Three unique features that make us stand out
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
