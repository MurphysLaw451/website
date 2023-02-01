import { RouteObject } from "react-router-dom"
import { Button } from "../Button"

export const Governance = (props: RouteObject) => {
    return (
        <div>
            <h1 className="text-4xl mb-4">Governance</h1>
            <p>
                Our DAO is controlled by proposals. The proposals are used to decide in which direction the organization will move in the future. You can vote by delegating your voting power to yourself. Your voting power is measured by the amount of DGNX you are holding. After you have delegated your voting power to yourself or a trusted address, you are able to participate in voting.
            </p>

            <hr className="my-3 border-slate-500" />

            <p>
                Important: You need to delegate your voting power BEFORE a proposal being created. If you delegate it after a proposal being created, you will not be able to participate in voting.
            </p>

            <h2 className="text-2xl my-4">Proposal types</h2>

            <div className="flex flex-col sm:flex-row items-start w-full">
                <div className=" dark:bg-slate-800 bg-gray-100 p-6 rounded-xl mr-8 mb-8 w-full">
                    <h3 className="text-xl mb-4">Off-chain</h3>
                    <ul className="list-disc ml-6">
                        <li>Organizational</li>
                        <li>Operative</li>
                        <li>Community decisions</li>
                    </ul>
                </div>
                <div className=" dark:bg-slate-800 bg-gray-100 p-6 rounded-xl mr-8 mb-8 w-full">
                    <h3 className="text-xl mb-4">On-chain</h3>
                    <ul className="list-disc ml-6">
                        <li>Changing fees</li>
                        <li>Changing contracts</li>
                        <li>Disbursement of earmarked funds</li>
                    </ul>
                </div>
            </div>

            <div className="flex items-center justify-center w-full mb-6">
                <Button target="_blank" color="orange" href="https://www.tally.xyz/gov/degenx-ecosystem">
                    Go to governance page
                </Button>
            </div>
        </div>
    )
}
