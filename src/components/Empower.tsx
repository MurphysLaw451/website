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
        <Container className="sm:pt-10 pb-10 text-center" id="holder">
            <div className="text-center md:text-left mx-8 md:mx-0">
                <H1 className="leading-[100%] text-white">
                    Be
                    <span className="text-degenOrange px-2 block my-0 sm:inline">empowered</span>
                    as a holder
                </H1>
            </div>
            <p className="max-w-2xl font-semibold text-md text-left text-light-600 mx-8 md:mx-0">
                As a holder of DGNX, you can embrace the world of DeFi and rest easy!
            </p>
            <div className="rounded-lg grid grid-cols-1 gap-5 text-left md:grid-cols-2 mt-5 border-2 border-activeblue bg-darkerblue px-8 py-5 lg:px-16 lg:py-12">
                <Block title="Control" text="Become a true ecosystem owner. Shape the future through on-chain proposals and DAO voting. The future truly is yours! Join us now for real ownership!" />
                <Block title="Prosperity" text="Revenue is distributed to our loyal stakers, ensuring you share in our success and growth. As our ecosystem thrives, so do your rewards!" />
                <Block title="Safety" text="Safety First! 100% audited smart contracts and full team KYC ensure complete transparency. Your security is our top priority, creating a safe ecosystem." />
                <Block title="Security" text="Enjoy maximum security with our liquidity backing mechanism. Your investments are safeguarded, allowing you to focus on exploring our ecosystem." />
            </div>
        </Container>
    )
}
