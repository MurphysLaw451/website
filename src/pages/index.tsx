import Head from 'next/head'

import { CallToAction } from '../components/CallToAction'
import { Faqs } from '../components/Faqs'
import { Team } from '../components/Team'
import { Roadmap } from '../components/Roadmap'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Backing } from '../components/Backing'
import { Projects } from '../components/Projects'
import { Features } from '../components/Features'
import { Tokenomics } from '../components/Tokenomics'

export default function Home() {
  return (
    <>
      <Head>
        <title>DegenX</title>
        <meta
          name="description"
          content="DegenX is multichain ecosystem that offers a suite of decentralized applications (dApps) and services to provide solutions for projects and individuals in the DeFi space. $DGNX is a multichain token with liquidity backing."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Features />
        <CallToAction />
        <Tokenomics />
        <Backing />
        <Team />
        <Roadmap />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
