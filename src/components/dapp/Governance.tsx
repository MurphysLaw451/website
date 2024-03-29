import Image from 'next/image'
import { BsArrowUpRight } from 'react-icons/bs'
import { RouteObject } from 'react-router-dom'
import { Button } from '../Button'
import { H2 } from '../H2'

import imageDAO from '../../images/projects/dao.svg'

export const Governance = (props: RouteObject) => {
    return (
        <div>
            <div className="mb-5 flex h-16 w-full items-center justify-center sm:mb-8 sm:justify-start">
                <Image
                    alt={`DEGENX DAO logo`}
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
                <div className=" mb-8 mr-8 w-full rounded-xl border-2 border-degenOrange bg-light-100 p-6 dark:border-activeblue dark:bg-darkerblue">
                    <H2>Off-chain</H2>
                    <ul className="ml-6 list-disc">
                        <li>Organizational</li>
                        <li>Operative</li>
                        <li>Community decisions</li>
                    </ul>
                </div>
                <div className=" mb-8 mr-8 w-full rounded-xl border-2 border-degenOrange bg-light-100 p-6 dark:border-activeblue dark:bg-darkerblue">
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
