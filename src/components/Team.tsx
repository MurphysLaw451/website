/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import { Button } from './Button'
import { Container } from './Container'

import { H1 } from './H1'
import { H2 } from './H2'
import { BsArrowUpRight } from 'react-icons/bs'

import solidproofImage from '../images/solidproof.png'

export function Team() {
    return (
        <Container className="pt-10 pb-10 text-center" id="team">
            <div className="rounded-lg mt-5 border-2 border-activeblue bg-darkerblue p-5 lg:px-16 lg:py-12">
                <H1 className="">Introducing the <span className="text-techGreen dark:text-techGreen ">team</span></H1>
                <p className="text-light-600">
                    A group of like-minded individuals who live and breathe DeFi!
                </p>
                <div className="text-white text-left flex flex-col gap-3 mt-3">
                    <p>
                        Our team consists of industry experts from areas including; Solidity and Full-Stack Development, Graphic Design, Marketing, Operations, Business. Our wide range of skills allow us to build from within and maintain our top secret 'DEGEN Sauce' that adds the spice to our ecosystem! 
                    </p>
                    <p>
                        In the true sense of DeFi, we choose to remain anonymous and are known only by our aliases. But the safety and security of our holders is a priority for us. Our team is KYC'd, and all of our smart contracts are audited with Solidproof.io
                    </p>
                </div>
                <div className="flex gap-3 justify-center mt-5">
                    <Button variant="outline" color="green" target="_blank" href="https://docs.dgnx.finance/ecosystem/contracts-and-audits#audits" className="flex gap-1">
                        View our contract audits
                        <BsArrowUpRight />
                    </Button>
                    <Button variant="outline" color="green" target="_blank" href="https://github.com/solidproof/projects/blob/main/DGNX/KYC_Certificate_DegenX.png" className="flex gap-1">
                        View our team KYC
                        <BsArrowUpRight />
                    </Button>
                </div>
                <div className="flex gap-3 justify-center mt-5">
                    <a href="https://solidproof.io/" target="_blank" rel="noreferrer">
                        <Image
                            src={solidproofImage}
                            alt=""
                            height={48}
                        />
                    </a>
                </div>
            </div>
        </Container>
    )
}
