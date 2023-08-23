import Image from 'next/image'
import { Button } from './Button'
import { Container } from './Container'

import { H1 } from './H1'
import { H2 } from './H2'

const Block = (props: { title: String; text: string }) => {
    return (
        <div>
            <H2 className="text-techGreen dark:text-techGreen">{props.title}</H2>
            <p className="text-white  font-bold">{props.text}</p>
        </div>
    )
}

export function Empower() {
    return (
        <Container className="pt-10 pb-10 text-center" id="holder">
            <div className="text-center md:text-left">
                <H1 className="">
                    <span className="text-white">Feel</span>
                    <span className="text-degenOrange px-2">empowered</span>
                    <br />
                    <span className="text-white">as a holder</span>
                </H1>
            </div>
            <p className="mt-6 max-w-2xl text-md text-left text-light-600 mx-8 md:mx-0">
                As a holder of DGNX, you can embrace the world of DeFi and rest easy!
            </p>
            <div className="rounded-lg grid grid-cols-1 gap-5 text-left md:grid-cols-2 mt-5 border-2 border-activeblue bg-darkerblue p-5 lg:px-16 lg:py-12">
                <Block title="Control" text="Become a true ecosystem owner. Shape the future through on-chain proposals and DAO voting. The future truly is yours! Join us now for real ownership!" />
                <Block title="Prosperity" text="Revenue is distributed to our loyal stakers, ensuring you share in our success and growth. As our ecosystem thrives, so do your rewards!" />
                <Block title="Safety" text="Safety First! 100% audited smart contracts and full team KYC ensure complete transparency. Your security is our top priority, creating a safe ecosystem." />
                <Block title="Security" text="Enjoy maximum security with our liquidity backing mechanism. Your investments are safeguarded, allowing you to focus on exploring our ecosystem." />
            </div>
        </Container>
    )
}
