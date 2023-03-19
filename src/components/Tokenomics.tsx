import Image from 'next/image'

import { Container } from './Container'

import translations from '../translations/site.json'

const testimonials = [
  [
    {
      title: translations.tokenomics.burnTitle.en,
      content: translations.tokenomics.burn.en,
    },
    {
      title: translations.tokenomics.marketingTitle.en,
      content: translations.tokenomics.marketing.en,
    },
  ],
  [
    {
      title: translations.tokenomics.liquidityTitle.en,
      content: translations.tokenomics.liquidity.en,
    },
    {
      title: translations.tokenomics.backingTitle.en,
      content: translations.tokenomics.backing.en,
    },
  ],
  [
    {
      title: translations.tokenomics.developmentTitle.en,
      content: translations.tokenomics.development.en,
    },
    // {
    //   title: 'Investment fund: 2%',
    //   content: '2% of all transactions will be sent to an investment fund for the growth of DegenX.',
    // },
  ],
]

export function Tokenomics() {
  return (
    <section
      id="tokenomics"
      aria-label="What our customers are saying"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 dark:text-orange-500 sm:text-4xl">
            {translations.tokenomics.title.en}
          </h2>
          <p className="dark:text-slate-400">
            {translations.tokenomics.totalSupply.en}: 21.000.000 |{' '}
            <a href="https://snowtrace.io/token/0x51e48670098173025c477d9aa3f0eff7bf9f7812" rel="noreferrer" target="_blank" className="underline text-orange-500">
              {translations.tokenomics.checkSnowtrace.en}
            </a>
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 dark:bg-white/10 dark:ring-1 dark:ring-inset dark:ring-white/10">
                      <blockquote className="relative">
                        <h2 className="text-orange-600 text-center text-2xl mb-3">{testimonial.title}</h2>
                        <p className="text-lg tracking-tight text-slate-900 dark:text-slate-400">
                          {testimonial.content}
                        </p>
                      </blockquote>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
