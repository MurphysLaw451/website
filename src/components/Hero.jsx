import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'


import projectSwap from '@/images/projects/swap.png'
import projectDgnx from '@/images/projects/dgnx.png'
import projectDao from '@/images/projects/dao.png'
import projectBridge from '@/images/projects/bridge.png'
import projectLocker from '@/images/projects/locker.png'
import projectStake from '@/images/projects/stake.png'
import projectFactor from '@/images/projects/factor.png'
import projectNFT from '@/images/projects/nft.png'
import projectClinic from '@/images/projects/clinic.png'

export function Hero() {
  return (
    <Container className="pt-20 pb-16 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        DegenX<br />A{' '}
        <span className="relative whitespace-nowrap text-orange-600">
          <span className="relative">DeFi</span>
        </span>{' '}
        Powerhouse
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        DegenX is a multichain ecosystem of DeFi products that provides value for both projects and users. Revenue is distributed to stakers of $DGNX, the governance token of DegenX with liquidity backing: a minimum guaranteed price that only grows.
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <Button href="https://app.xy.finance/?amount=1&fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&sourceChainId=1&targetChainId=43114&toTokenAddress=0x51e48670098173025C477D9AA3f0efF7BF9f7812&slippage=15" target="_blank">Buy $DGNX now</Button>
        <Button
          href="https://docs.dgnx.finance/"
          variant="outline"
          target="_blank"
        >
          <svg width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" className="iconify iconify--simple-icons"><path fill="currentColor" d="M10.802 17.77a.703.703 0 1 1-.002 1.406a.703.703 0 0 1 .002-1.406m11.024-4.347a.703.703 0 1 1 .001-1.406a.703.703 0 0 1-.001 1.406m0-2.876a2.176 2.176 0 0 0-2.174 2.174c0 .233.039.465.115.691l-7.181 3.823a2.165 2.165 0 0 0-1.784-.937c-.829 0-1.584.475-1.95 1.216l-6.451-3.402c-.682-.358-1.192-1.48-1.138-2.502c.028-.533.212-.947.493-1.107c.178-.1.392-.092.62.027l.042.023c1.71.9 7.304 3.847 7.54 3.956c.363.169.565.237 1.185-.057l11.564-6.014c.17-.064.368-.227.368-.474c0-.342-.354-.477-.355-.477c-.658-.315-1.669-.788-2.655-1.25c-2.108-.987-4.497-2.105-5.546-2.655c-.906-.474-1.635-.074-1.765.006l-.252.125C7.78 6.048 1.46 9.178 1.1 9.397C.457 9.789.058 10.57.006 11.539c-.08 1.537.703 3.14 1.824 3.727l6.822 3.518a2.175 2.175 0 0 0 2.15 1.862a2.177 2.177 0 0 0 2.173-2.14l7.514-4.073c.38.298.853.461 1.337.461A2.176 2.176 0 0 0 24 12.72a2.176 2.176 0 0 0-2.174-2.174"></path></svg>
          <span className="ml-3">Gitbook</span>
        </Button>
      </div>
      <div className="mt-36 lg:mt-44">
        <ul
          role="list"
          className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
        >
          {[
            [
              { name: '$DGNX', logo: projectDgnx },
              { name: 'Swap', logo: projectSwap },
              { name: 'DAO', logo: projectDao },
              { name: 'Bridge', logo: projectBridge },
              { name: 'LockeR', logo: projectLocker },
            ],
            [
              { name: 'StakeX', logo: projectStake },
              { name: 'Factor', logo: projectFactor },
              { name: 'NFT', logo: projectNFT },
              { name: 'Clinic', logo: projectClinic },
            ],
          ].map((group, groupIndex) => (
            <li key={groupIndex}>
              <ul
                role="list"
                className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
              >
                {group.map((project) => (
                  <li key={project.name}>
                    <Image className="w-24 h-24 block" src={project.logo} alt={project.name} unoptimized />
                    <span>{project.name}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
