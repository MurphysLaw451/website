import react from 'react'

const RoadmapItem = (props) => {
    return (
        <li className="w-full mb-6 sm:mb-0">
            <div className="md:flex items-center hidden">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-orange-200 rounded-full ring-0 ring-orange-100 sm:ring-8 shrink-0">
                    <svg aria-hidden="true" className="w-3 h-3 text-orange-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                </div>
                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8 lg:ml-2">
                <h3 className="text-lg text-center md:text-left font-semibold text-gray-900 dark:text-white">{props.title}</h3>
                <time className="block text-center md:text-left mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{props.time}</time>
                <div className="text-base text-center md:text-left font-normal text-gray-500 dark:text-gray-400">{props.items.map(item => <div key={item}>{item}</div>)}</div>
            </div>
        </li>
    )
}

export function Roadmap() {
    return (
        <div className="bg-white" id="roadmap">
            <div className="mx-auto max-w-7xl py-12 px-6 text-center lg:px-8 lg:py-24">
                <div className="space-y-8 sm:space-y-12">
                    <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Roadmap</h2>
                    </div>
                    <ol className="items-stretch sm:flex">
                        <RoadmapItem title="Phase 1" time="Done!" items={["✓ Token Launch", "✓ Website", "✓ dAPP"]} />
                        <RoadmapItem title="Phase 2" time="Ongoing" items={["✓ DAO ", "Liquidity Backing", "Bridge"]} />
                        <RoadmapItem title="Phase 3" time="Future" items={["LockeR", "StakeR", "D&P"]} />
                        <RoadmapItem title="Phase 4" time="Future" items={["DEX", "Swap", "NFT V2"]} />
                        <RoadmapItem title="Phase 5" time="Future" items={["NFT Marketplace", "Factor"]} />
                        <RoadmapItem title="Phase 6" time="Future" items={["Clinic", "TBD..."]} />
                    </ol>
                </div>
            </div>
        </div>
    )
}