'use client'
import styles from './../../styles/components/dapp/monitoring.module.css'
import { useEffect, useState } from 'react'
import { Address } from 'wagmi'
import { FeeConfigState, FeeDistributionReceiver } from '../../types'
import clsx from 'clsx'
// import { queryHomeDiamond, queryTargetDiamond } from './../../helpers/contracts'
// import { DeployFees } from './deploy-fees'

// const getFeeConfigIds = async () => {
//     return await queryHomeDiamond<`0x${string}`[]>('getFeeConfigIds')
// }
// const getFeeConfigIdsStore = async () => {
//     return await queryTargetDiamond<`0x${string}`[]>('getFeeConfigIds')
// }

// const getFeeConfigs = async (configIds: `0x${string}`[]) => {
//     const feeConfigs = await Promise.all(
//         configIds.map((configId) =>
//             queryHomeDiamond<FeeConfig>('getFeeConfig', [configId])
//         )
//     )
//     return feeConfigs
// }

// const getFeeDistributorReceivers = async () =>
//     await queryHomeDiamond<FeeDistributionReceiver[]>(
//         'getFeeDistributorReceivers'
//     )

// const getFeeDistributorTotalBounties = async () =>
//     await queryHomeDiamond<bigint>('getFeeDistributorTotalBounties')

// const getPendingFees = async () =>
//     await queryTargetDiamond<bigint>('getPendingFees')

// const getCollectedFeesTotal = async () =>
//     await queryTargetDiamond<bigint>('getCollectedFeesTotal')

// const getBuyFees = async () =>
//     await queryTargetDiamond<`0x${string}`[]>('getBuyFees')
// const getSellFees = async () =>
//     await queryTargetDiamond<`0x${string}`[]>('getSellFees')

const FeeConfigStateDot = (props: { syncState: FeeConfigState }) => {
    const color = clsx({
        'fill-red-500': props.syncState === FeeConfigState.UPDATED,
        'fill-blue-500': props.syncState === FeeConfigState.NEW,
        'fill-yellow': props.syncState === FeeConfigState.SYNC,
        'fill-green-500': props.syncState === FeeConfigState.DEPLOYED,
    })
    return (
        <svg
            className={color + ' inline-block'}
            width="40px"
            height="40px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z" />
        </svg>
    )
}

export const Monitoring = () => {
    // const [feeConfigIds, setFeeConfigIds] =
    //     useState<Awaited<ReturnType<typeof getFeeConfigIds>>>()
    // const [feeConfigIdsStore, setFeeConfigIdsStore] =
    //     useState<Awaited<ReturnType<typeof getFeeConfigIdsStore>>>()
    // const [feeConfigs, setFeeConfigs] =
    //     useState<Awaited<ReturnType<typeof getFeeConfigs>>>()
    // const [feeDistributorReceivers, setFeeDistributorReceivers] =
    //     useState<Awaited<ReturnType<typeof getFeeDistributorReceivers>>>()
    // const [feeDistributorTotalBounties, setFeeDistributorTotalBounties] =
    //     useState<Awaited<ReturnType<typeof getFeeDistributorTotalBounties>>>()
    // const [pendingFees, setPendingFees] =
    //     useState<Awaited<ReturnType<typeof getPendingFees>>>()
    // const [collectedFeesTotal, setCollectedFeesTotal] =
    //     useState<Awaited<ReturnType<typeof getCollectedFeesTotal>>>()
    // const [buyFees, setBuyFees] =
    //     useState<Awaited<ReturnType<typeof getBuyFees>>>()
    // const [sellFees, setSellFees] =
    //     useState<Awaited<ReturnType<typeof getSellFees>>>()

    // useEffect(() => {
    //     getFeeConfigIds().then((data) => {
    //         setFeeConfigIds(data)
    //     })
    //     getFeeConfigIdsStore().then((data) => {
    //         setFeeConfigIdsStore(data)
    //     })
    //     getFeeDistributorReceivers().then((data) => {
    //         setFeeDistributorReceivers(data)
    //     })
    //     getFeeDistributorTotalBounties().then((data) => {
    //         setFeeDistributorTotalBounties(data)
    //     })
    //     getPendingFees().then((data) => {
    //         setPendingFees(data)
    //     })
    //     getCollectedFeesTotal().then((data) => {
    //         setCollectedFeesTotal(data)
    //     })
    //     getBuyFees().then((data) => {
    //         setBuyFees(data)
    //     })
    //     getSellFees().then((data) => {
    //         setSellFees(data)
    //     })
    // }, [])

    // useEffect(() => {
    //     if (!feeConfigIds) return
    //     getFeeConfigs(feeConfigIds).then((data) => {
    //         setFeeConfigs(data)
    //     })
    // }, [feeConfigIds])

    // useEffect(() => {
    //     getFeeConfigIds().then((data) => {
    //         setFeeConfigIds(data)
    //     })
    // }, [])

    return (
        <div className="grid grid-cols-1 gap-24">
            <h1 className="mb-5 mt-4 flex flex-col gap-1 font-title text-3xl font-bold tracking-wide sm:mb-8 sm:flex-row">
                <span className="text-techGreen">DEGENX</span>
                <span className="text-degenOrange">MONITORING</span>
            </h1>
            <div className="grid grid-cols-5">
                <div className="text-center">
                    <h2 className="mb-5 text-2xl font-bold">Avalanche</h2>
                    <svg
                        className="max-w-60 inline-block w-full fill-activeblue"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 253"
                        enable-background="new 0 0 256 253"
                    >
                        <path
                            d="M102.416,148.646l-8.293-21.305l0.027-0.031h26.819L102.416,148.646z M90.278,131.592l-14.922,17.16h21.602L90.278,131.592z
	 M109.2,148.752h37.599l-18.644-21.441h-0.31L109.2,148.752z M161.968,127.447l-0.118-0.136h-26.821l18.624,21.418L161.968,127.447z
	 M180.644,148.752l-14.833-17.057l-6.664,17.057H180.644z M157.121,154.112l-22.96,58.768l46.616-58.768H157.121z M75.223,154.112
	l46.646,58.81l-22.892-58.81H75.223z M127.973,214.311l23.579-60.199h-47.009L127.973,214.311z M2,69
	c0,13.678,9.625,25.302,22,29.576V233H2v18h252v-18h-22V98.554c12.89-3.945,21.699-15.396,22-29.554v-8H2V69z M65.29,68.346
	c0,6.477,6.755,31.47,31.727,31.47c21.689,0,31.202-19.615,31.202-31.47c0,11.052,7.41,31.447,31.464,31.447
	c21.733,0,31.363-20.999,31.363-31.447c0,14.425,9.726,26.416,22.954,30.154V233H42V98.594C55.402,94.966,65.29,82.895,65.29,68.346
	z M222.832,22H223V2H34v20L2,54h252L222.832,22z"
                        />
                    </svg>
                </div>
                <div className="col-span-3"></div>
                <div className="text-center">
                    <h2 className="mb-5 text-2xl font-bold">Ethereum</h2>
                    <svg
                        className="max-w-60 inline-block w-full fill-activeblue"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 253"
                        enable-background="new 0 0 256 253"
                    >
                        <path
                            d="M102.416,148.646l-8.293-21.305l0.027-0.031h26.819L102.416,148.646z M90.278,131.592l-14.922,17.16h21.602L90.278,131.592z
	 M109.2,148.752h37.599l-18.644-21.441h-0.31L109.2,148.752z M161.968,127.447l-0.118-0.136h-26.821l18.624,21.418L161.968,127.447z
	 M180.644,148.752l-14.833-17.057l-6.664,17.057H180.644z M157.121,154.112l-22.96,58.768l46.616-58.768H157.121z M75.223,154.112
	l46.646,58.81l-22.892-58.81H75.223z M127.973,214.311l23.579-60.199h-47.009L127.973,214.311z M2,69
	c0,13.678,9.625,25.302,22,29.576V233H2v18h252v-18h-22V98.554c12.89-3.945,21.699-15.396,22-29.554v-8H2V69z M65.29,68.346
	c0,6.477,6.755,31.47,31.727,31.47c21.689,0,31.202-19.615,31.202-31.47c0,11.052,7.41,31.447,31.464,31.447
	c21.733,0,31.363-20.999,31.363-31.447c0,14.425,9.726,26.416,22.954,30.154V233H42V98.594C55.402,94.966,65.29,82.895,65.29,68.346
	z M222.832,22H223V2H34v20L2,54h252L222.832,22z"
                        />
                    </svg>
                </div>
            </div>
            <div>
                <div className="justify-center rounded-lg border-2 border-solid border-activeblue bg-darkerblue">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="p-4 text-left">ID</th>
                                <th>Fee (bps)</th>
                                <th>Receiver</th>
                                <th>Avalanche</th>
                                <th>Ethereum</th>
                                <th>Ethereum Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="border-t border-t-activeblue">
                            {/* {feeConfigs?.map((feeConfig) => ( */}
                            <tr>
                                <td className="p-4 text-left">
                                    0x1234...bcdef
                                </td>
                                <td className="text-center">3000</td>
                                <td className="text-center">0x1234...7890</td>
                                <td className="text-center">
                                    <FeeConfigStateDot
                                        syncState={FeeConfigState.NEW}
                                    />
                                </td>
                                <td className="text-center">
                                    <FeeConfigStateDot
                                        syncState={FeeConfigState.NEW}
                                    />
                                </td>
                                <td className="text-center">blablybla</td>
                            </tr>
                            {/* ))} */}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex flex-row items-center text-white text-opacity-50">
                    <span className="mr-4">
                        <FeeConfigStateDot syncState={FeeConfigState.NEW} />{' '}
                        recently added fee <br />
                    </span>
                    <span className="mr-4">
                        <FeeConfigStateDot syncState={FeeConfigState.UPDATED} />{' '}
                        recently updated fee <br />
                    </span>
                    <span className="mr-4">
                        <FeeConfigStateDot syncState={FeeConfigState.SYNC} />{' '}
                        fee being synced to networks <br />
                    </span>
                    <span className="mr-4">
                        <FeeConfigStateDot
                            syncState={FeeConfigState.DEPLOYED}
                        />{' '}
                        fee is deployed on network(s) <br />
                    </span>
                </div>
            </div>
        </div>
    )
}
