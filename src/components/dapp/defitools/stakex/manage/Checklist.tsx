import { ManageStakeXContext } from '@dapphelpers/defitools'
import { useGetCustomization } from '@dapphooks/staking/useGetCustomization'
import { Tile } from '@dappshared/Tile'
import clsx from 'clsx'
import { useContext, useEffect, useState } from 'react'
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'

export const Checklist = () => {
    const {
        data: { isActive, protocol, chain, canEdit },
    } = useContext(ManageStakeXContext)

    const [hasLogo, setHasLogo] = useState(false)

    const { response } = useGetCustomization(protocol, chain?.id!)

    useEffect(() => {
        setHasLogo(Boolean(response && response.data && response.data.logoUrl))
    }, [response])

    if (!canEdit) return <></>

    return true || !hasLogo || !isActive ? (
        <Tile>
            <div className="flex flex-col font-title text-lg font-bold">
                <span className="mb-4 flex-1 text-xl">Finish up your staking &nbsp; 🚀</span>
                <div className={clsx(['flex flex-row items-start gap-2', hasLogo && 'text-dapp-cyan-500'])}>
                    {hasLogo ? (
                        <MdOutlineCheckBox className="mt-1 h-6 w-6" />
                    ) : (
                        <MdCheckBoxOutlineBlank className="mt-1 h-6 w-6" />
                    )}
                    <span className="flex-1 ">Upload a Project Logo</span>
                </div>
                <div className={clsx(['flex flex-row items-start gap-2', isActive && 'text-dapp-cyan-500'])}>
                    {isActive ? (
                        <MdOutlineCheckBox className="mt-1 h-6 w-6" />
                    ) : (
                        <MdCheckBoxOutlineBlank className="mt-1 h-6 w-6" />
                    )}
                    <span className="flex-1 font-title text-lg font-bold">Enable your Staking Solution</span>
                </div>
            </div>
        </Tile>
    ) : (
        <></>
    )
}
