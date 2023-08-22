import Head from 'next/head'

import { CallToAction } from '../components/CallToAction'
import { Team } from '../components/Team'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { Empower } from '../components/Empower'
import { Discover } from '../components/Discover'
import { Roadmap } from '../components/Roadmap'

export default function Home() {
  return (
    <>
      <Head>
        <title>DegenX Ecosystem</title>
        <meta
          name="description"
          content="DegenX is multichain ecosystem that offers a suite of decentralized applications (dApps) and services to provide solutions for projects and individuals in the DeFi space. $DGNX is a multichain token with liquidity backing."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <Empower />
        <Projects />
        <Discover />
        <Roadmap />
        <CallToAction />
        <Team />
      </main>
      <Footer />
    </>
  )
}
