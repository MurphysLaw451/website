import Image from 'next/image'
import { RouteObject } from 'react-router-dom'
import { Button } from '../Button'
import { H1 } from '../H1'
import { H2 } from '../H2'
import { BsArrowUpRight } from 'react-icons/bs'

import imageDAO from '../../images/projects/dao.svg';

export const Governance = (props: RouteObject) => {
    return (
        <div>
            <div className="items-center mb-5 sm:mb-8 h-16 w-full flex justify-center sm:justify-start">
                <Image
                    alt={`DegenX DAO logo`}
                    src={imageDAO}
                    height={64}
                    // fill
                />
            </div>
            <div className="rounded-xl border-2 border-degenOrange bg-light-100 p-5 text-light-800 dark:border-activeblue dark:bg-darkerblue  dark:text-light-600">
                Our DAO is controlled by proposals. The proposals are used to
                decide in which direction the organization will move in the
                future. You can vote by delegating your voting power to
                yourself. Your voting power is measured by the amount of DGNX
                you are holding. After you have delegated your voting power to
                yourself or a trusted address, you are able to participate in
                voting.
                <hr className="my-3 border border-light-800 dark:border-light-600" />
                Important: You need to delegate your voting power BEFORE a
                proposal being created. If you delegate it after a proposal
                being created, you will not be able to participate in voting.
            </div>

            <H2 className="mt-3">Proposal types</H2>

            <div className="flex w-full flex-col items-start text-light-800 dark:text-light-600 sm:flex-row">
                <div className=" mr-8 mb-8 w-full rounded-xl border-2 border-degenOrange bg-light-100 p-6 dark:border-activeblue dark:bg-darkerblue">
                    <H2>Off-chain</H2>
                    <ul className="ml-6 list-disc">
                        <li>Organizational</li>
                        <li>Operative</li>
                        <li>Community decisions</li>
                    </ul>
                </div>
                <div className=" mr-8 mb-8 w-full rounded-xl border-2 border-degenOrange bg-light-100 p-6 dark:border-activeblue dark:bg-darkerblue">
                    <H2>On-chain</H2>
                    <ul className="ml-6 list-disc">
                        <li>Changing fees</li>
                        <li>Changing contracts</li>
                        <li>Disbursement of earmarked funds</li>
                    </ul>
                </div>
            </div>

            <div className="mb-6 flex w-full items-center justify-center">
                <Button
                    target="_blank"
                    color="orange"
                    href="https://www.tally.xyz/gov/degenx-ecosystem"
                >
                    Go to governance page <BsArrowUpRight />
                </Button>
            </div>
        </div>
    )
}
