import Image from 'next/image'

import { Button } from './Button'
import { Container } from './Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-orange-500 dark:bg-transparent py-32"
    >
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white dark:text-orange-500 sm:text-4xl">
            Join in!
          </h2>
          <p className="my-4 text-lg tracking-tight text-white">
            Did we already mentioned we are bridging the token to other chains without diluting the supply?
          </p>
          <Button className="" href="https://app.xy.finance/?amount=1&fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&sourceChainId=1&targetChainId=43114&toTokenAddress=0x51e48670098173025C477D9AA3f0efF7BF9f7812&slippage=15" target="_blank">Buy $DGNX now</Button>
        </div>
      </Container>
    </section>
  )
}
