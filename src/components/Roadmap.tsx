import react from 'react'

import translations from '../translations/site.json'

const RoadmapItem = (props) => {
    return (
        <li className="w-full mb-6 sm:mb-0">
            <div className="md:flex items-center hidden">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-orange-200 rounded-full ring-0 ring-orange-100 sm:ring-8 shrink-0">
                    <svg aria-hidden="true" className="w-3 h-3 text-orange-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                </div>
                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-6 lg:ml-2">
                <h3 className="text-lg text-center md:text-left font-semibold text-gray-900 dark:text-slate-400">{props.title}</h3>
                <time className="block text-center md:text-left mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{props.time}</time>
                <div className="text-base text-center md:text-left font-normal text-gray-500 dark:text-gray-400">{props.items.map(item => <div key={item} className='mb-3'>{item}</div>)}</div>
            </div>
        </li>
    )
}

export function Roadmap() {
    return (
        <div className="" id="roadmap">
            <div className="mx-auto max-w-7xl py-12 px-6 text-center lg:px-8 lg:py-24">
                <div className="space-y-8 sm:space-y-12">
                    <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 className="text-3xl tracking-tight sm:text-4xl dark:text-orange-500">{translations.roadmap.title.en}</h2>
                    </div>
                    <ol className="items-stretch sm:flex">
                        <RoadmapItem
                            title={`${translations.roadmap.phase.en} 1`}
                            time={translations.roadmap.done.en}
                            items={[
                                `✓ ${translations.roadmap.tokenLaunch.en}`,
                                `✓ ${translations.roadmap.website.en}`,
                                `✓ ${translations.roadmap.dAPP.en}`
                            ]}
                        />
                        <RoadmapItem
                            title={`${translations.roadmap.phase.en} 2`}
                            time={translations.roadmap.ongoing.en}
                            items={[
                                `✓ ${translations.roadmap.dao.en}`,
                                `${translations.roadmap.liqBacking.en}`,
                                `${translations.roadmap.bridge.en}`
                            ]}
                        />
                        <RoadmapItem
                            title={`${translations.roadmap.phase.en} 3`}
                            time={translations.roadmap.future.en}
                            items={[
                                `${translations.roadmap.stake.en}`,
                                `${translations.roadmap.locker.en}`,
                                `${translations.roadmap.dp.en}`
                            ]}
                        />
                        <RoadmapItem
                            title={`${translations.roadmap.phase.en} 4`}
                            time={translations.roadmap.future.en}
                            items={[
                                `${translations.roadmap.swap.en}`,
                                `${translations.roadmap.dex.en}`,
                                `${translations.roadmap.nftv2.en}`
                            ]}
                        />
                        <RoadmapItem
                            title={`${translations.roadmap.phase.en} 5`}
                            time={translations.roadmap.future.en}
                            items={[
                                `${translations.roadmap.nftMarketplace.en}`,
                                `${translations.roadmap.factor.en}`
                            ]}
                        />
                        <RoadmapItem
                            title={`${translations.roadmap.phase.en} 6`}
                            time={translations.roadmap.future.en}
                            items={[
                                `${translations.roadmap.clinic.en}`,
                                `${translations.roadmap.tbd.en}`
                            ]}
                        />
                    </ol>
                </div>
            </div>
        </div>
    )
}