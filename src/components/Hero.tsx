import Image from 'next/image'

import { Button } from './Button'
import { Container } from './Container'

import translations from '../translations/site.json'
import { H1 } from './H1'

export function Hero() {
    return (
        <Container className="pt-20 pb-16 text-center lg:pt-32">
            <H1>
                {translations.hero.degenx.en}
                <br />
                {translations.hero.a.en}{' '}
                <span className="relative whitespace-nowrap text-degenOrange">
                    <span className="relative">
                        {translations.hero.defi.en}
                    </span>
                </span>{' '}
                {translations.hero.powerhouse.en}
            </H1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-bold text-light-800 dark:text-light-200">
                {translations.hero.heroDesc.en}
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
                <Button
                    className="border-2 border-degenOrange bg-light-100 text-dark transition-colors hover:bg-degenOrange dark:border-activeblue dark:bg-darkblue dark:text-light-100 dark:hover:bg-activeblue dark:hover:text-light-100"
                    href="/dapp/buy"
                >
                    {translations.hero.buyNow.en}
                </Button>
                <Button
                    className="border-2 border-transparent font-bold text-dark ring-0 transition-colors hover:border-degenOrange hover:bg-light-100 dark:border-transparent dark:bg-transparent dark:text-light-100 dark:hover:border-activeblue dark:hover:bg-darkblue dark:hover:text-light-100"
                    href="https://docs.dgnx.finance/"
                    variant="outline"
                    target="_blank"
                >
                    <svg
                        width="24"
                        height="24"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                        className="iconify iconify--simple-icons"
                    >
                        <path
                            fill="currentColor"
                            d="M10.802 17.77a.703.703 0 1 1-.002 1.406a.703.703 0 0 1 .002-1.406m11.024-4.347a.703.703 0 1 1 .001-1.406a.703.703 0 0 1-.001 1.406m0-2.876a2.176 2.176 0 0 0-2.174 2.174c0 .233.039.465.115.691l-7.181 3.823a2.165 2.165 0 0 0-1.784-.937c-.829 0-1.584.475-1.95 1.216l-6.451-3.402c-.682-.358-1.192-1.48-1.138-2.502c.028-.533.212-.947.493-1.107c.178-.1.392-.092.62.027l.042.023c1.71.9 7.304 3.847 7.54 3.956c.363.169.565.237 1.185-.057l11.564-6.014c.17-.064.368-.227.368-.474c0-.342-.354-.477-.355-.477c-.658-.315-1.669-.788-2.655-1.25c-2.108-.987-4.497-2.105-5.546-2.655c-.906-.474-1.635-.074-1.765.006l-.252.125C7.78 6.048 1.46 9.178 1.1 9.397C.457 9.789.058 10.57.006 11.539c-.08 1.537.703 3.14 1.824 3.727l6.822 3.518a2.175 2.175 0 0 0 2.15 1.862a2.177 2.177 0 0 0 2.173-2.14l7.514-4.073c.38.298.853.461 1.337.461A2.176 2.176 0 0 0 24 12.72a2.176 2.176 0 0 0-2.174-2.174"
                        ></path>
                    </svg>
                    <span className="ml-3">{translations.hero.gitbook.en}</span>
                </Button>
            </div>
        </Container>
    )
}
