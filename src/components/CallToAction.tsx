import Image from 'next/image'

import { Button } from './Button'
import { Container } from './Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

import translations from '../translations/site.json'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-orange-500 dark:bg-transparent py-32"
    >
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white dark:text-orange-500 sm:text-4xl">
            {translations.cta.title.en}
          </h2>
          <p className="my-4 text-lg tracking-tight text-white">
            {translations.cta.subtitle.en}
          </p>
          <Button className="" href="/dapp/buy">{translations.hero.buyNow.en}</Button>
        </div>
      </Container>
    </section>
  )
}
