import Image from 'next/image'

import { Container } from './Container'

const testimonials = [
  [
    {
      title: 'Burn: 1% on sell',
      content:
        'This makes $DGNX deflationary. Additionally, the burn mechanism increases the backing of the circulating supply, leading to ever increasing baseline value.',
    },
    {
      title: 'Marketing: 1% on buy',
      content: '1% of the AVAX used to buy DGNX is sent to a marketing wallet. This will be utilized to market the project and grow the community',
    },
  ],
  [
    {
      title: 'Liquidity: 3%',
      content:
        '3% of buys and sells stay in the LP to creating a stable price floor and ensuring there is always liquidity to sell $DGNX.',
    },
    {
      title: 'Backing: 4%',
      content: '4% of all buys and sells are sent to the liquidity backing pool, giving $DGNX an ever increasing minimum value.',
    },
  ],
  [
    {
      title: 'Development: 2%',
      content:
        '2% of all transactions will be used to cover development costs, including audits.',
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
            Tokenomics
          </h2>
          <p className="dark:text-slate-400">
            Total supply (across all chains): 21.000.000 |{' '}
            <a href="https://snowtrace.io/token/0x51e48670098173025c477d9aa3f0eff7bf9f7812" rel="noreferrer" target="_blank" className="underline text-orange-500">
              Check on Snowtrace
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
