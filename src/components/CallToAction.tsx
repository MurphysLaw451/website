import Image from 'next/image'

import { Button } from './Button'
import { Container } from './Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

import translations from '../translations/site.json'
import { H2 } from './H2'

export function CallToAction() {
    return (
        <section id="get-started-today" className="overflow-hidde relativen">
            <Container className="relative">
                <div className="mx-auto max-w-lg text-center">
                    <H2>{translations.cta.title.en}</H2>
                    <p className="my-4 text-lg font-bold tracking-tight text-light-800 dark:text-light-100">
                        {translations.cta.subtitle.en}
                    </p>
                    <Button
                        className="border-2 border-degenOrange bg-light-100 text-dark transition-colors hover:bg-degenOrange dark:border-activeblue dark:bg-darkblue dark:text-light-100 dark:hover:bg-activeblue dark:hover:text-light-100"
                        href="/dapp/buy"
                    >
                        {translations.hero.buyNow.en}
                    </Button>
                </div>
            </Container>
        </section>
    )
}
