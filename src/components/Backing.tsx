import clsx from 'clsx'

import { Container } from './Container'

import translations from '../translations/site.json'

function Feature({ title, description }) {
  return (
    <section
      className={clsx(
        'flex flex-col rounded-3xl px-6 sm:px-8',
        'lg:py-8'
      )}
    >
      <p
        className={clsx(
          'mt-2 text-base',
          'text-white dark:text-slate-400'
        )}
      >
        {description}
      </p>
      <p className="order-first font-display text-5xl font-light tracking-tight text-white">
        {title}
      </p>
    </section>
  )
}

export function Backing() {
  return (
    <section
      id="backing"
      className="bg-orange-500 dark:bg-transparent py-20 sm:py-32"
    >
      <Container>
        <div className="md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-white dark:text-orange-500 sm:text-4xl">
            <span className="relative whitespace-nowrap">
              <span className="relative">{translations.backing.title.en}</span>
            </span>
          </h2>
          <p className="mt-4 text-lg text-white dark:text-slate-400">
            {translations.backing.subtitle.en}
          </p>
        </div>
        <div className="-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8">
          <Feature
            title={translations.backing.featureBacking.title.en}
            description={translations.backing.featureBacking.description.en}
          />
          <Feature
            title={translations.backing.featureLiquidity.title.en}
            description={translations.backing.featureLiquidity.description.en}
          />
          <Feature
            title={translations.backing.featureBurn.title.en}
            description={translations.backing.featureBurn.description.en}
          />
        </div>
      </Container>
    </section>
  )
}
