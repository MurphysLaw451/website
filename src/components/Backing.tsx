import clsx from 'clsx'

import { Container } from './Container'

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
              <span className="relative">Liquidity Backing</span>
            </span>
          </h2>
          <p className="mt-4 text-lg text-white dark:text-slate-400">
            A guaranteed minimum value for $DGNX
          </p>
        </div>
        <div className="-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8">
          <Feature
            title="Backing"
            description="The DGNX token is backed by its base assets, providing an ever-increasing minimal value that is balanced between blue-chip investments, stable assets, and volatile moonshots. This ensures that the DGNX token will retain its value and provide a steady return on investment for its holders. With its unique balance of assets, the DGNX token is an excellent choice for those looking for stability and growth in their investments."
          />
          <Feature
            title="Liquidity"
            description="The DGNX token is unique in that a set percentage, 2%, of every buy and sell transaction is sent to the Liquidity Backing pool. This ensures that the token's minimal value can never decrease, and it provides added stability and security for its holders. With this innovative feature, the DGNX token is an excellent choice for those looking for more security."
          />
          <Feature
            title="Burn"
            description="The DGNX token is designed to provide added stability and security for its holders. If the market price ever drops below the intrinsic minimal value, holders have the option to burn their DGNX tokens for their share of the Liquidity Backing. This ensures that the token's minimal value can never decrease, and holders can always expect to be able to sell or burn their DGNX."
          />
        </div>
      </Container>
    </section>
  )
}
