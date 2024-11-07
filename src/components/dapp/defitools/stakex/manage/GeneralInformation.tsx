import { visualAddress } from '@dapphelpers/address'
import { ManageStakeXContext } from '@dapphelpers/defitools'
import { toReadableNumber } from '@dapphelpers/number'
import { useGetChainExplorer } from '@dapphooks/shared/useGetChainExplorer'
import { useActive } from '@dapphooks/staking/useActive'
import { useGetStakingData } from '@dapphooks/staking/useGetStakingData'
import { useGetStakingToken } from '@dapphooks/staking/useGetStakingToken'
import { useGetTVLinUSD } from '@dapphooks/staking/useGetTVLinUSD'
import { useRunning } from '@dapphooks/staking/useRunning'
import { CaretDivider } from '@dappshared/CaretDivider'
import { StatsBoxTwoColumn } from '@dappshared/StatsBoxTwoColumn'
import { Tile } from '@dappshared/Tile'
import { isUndefined } from 'lodash'
import { useContext } from 'react'
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa'
import { IoMdOpen } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/Button'
import { Spinner } from 'src/components/dapp/elements/Spinner'

export const GeneralInformation = () => {
    const {
        data: { chain, protocol, owner },
    } = useContext(ManageStakeXContext)

    const navigate = useNavigate()

    const chainExplorer = useGetChainExplorer(chain!)

    const { data: dataStakingToken } = useGetStakingToken(protocol, chain?.id!)
    const { data: dataIsActive, isLoading: isLoadingIsActive } = useActive(protocol, chain?.id!)
    const { data: dataIsRunning, isLoading: isLoadingIsRunning } = useRunning(protocol, chain?.id!)
    const { data: dataStakingData, isLoading: isLoadingStakingData } = useGetStakingData(protocol, chain?.id!)
    const { response: responseTVLinUSD, isComplete: isCompleteTVLinUSD } = useGetTVLinUSD(protocol, chain?.id!)

    return (
        <Tile className="flex w-full flex-col gap-8">
            <span className="flex-1 font-title text-xl font-bold">General Information</span>
            <StatsBoxTwoColumn.Wrapper className="w-full rounded-lg bg-dapp-blue-800 px-4 py-2 text-sm">
                <div className="col-span-2">
                    <span className="font-bold">Protocol address</span>
                    <br />
                    <span className="flex flex-row items-center gap-2 font-mono text-sm">
                        <span className=" xs:hidden">{visualAddress(protocol, 8)}</span>
                        <span className="hidden text-xs xs:inline sm:text-sm">{protocol}</span>
                        {chainExplorer && dataStakingToken && (
                            <a
                                href={chainExplorer.getAddressUrl(protocol)}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-row items-center justify-start"
                            >
                                <IoMdOpen />
                            </a>
                        )}
                    </span>
                </div>
                <div className="col-span-2 mt-4">
                    <span className="font-bold">Owner address</span>
                    <br />
                    <span className="flex flex-row items-center gap-2 font-mono text-sm">
                        <span className=" xs:hidden">{owner && visualAddress(owner, 8)}</span>
                        <span className="hidden text-xs xs:inline sm:text-sm">{owner}</span>
                        {chainExplorer && dataStakingToken && (
                            <a
                                href={chainExplorer.getAddressUrl(owner)}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-row items-center justify-start"
                            >
                                <IoMdOpen />
                            </a>
                        )}
                    </span>
                </div>
                <div className="col-span-2 mt-4">
                    <span className="font-bold">Staking token address</span>
                    <br />
                    <span className="flex flex-row items-center gap-2 font-mono text-sm">
                        <span className="xs:hidden">
                            {dataStakingToken && visualAddress(dataStakingToken.source, 8)}
                        </span>
                        <span className="hidden text-xs xs:inline sm:text-sm">
                            {dataStakingToken && dataStakingToken.source}
                        </span>
                        {chainExplorer && dataStakingToken && (
                            <a
                                href={chainExplorer.getTokenUrl(dataStakingToken.source)}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-row items-center justify-start"
                            >
                                <IoMdOpen />
                            </a>
                        )}
                    </span>
                </div>

                <div className="col-span-2">
                    <CaretDivider />
                </div>

                <StatsBoxTwoColumn.LeftColumn>
                    Staked {dataStakingToken && dataStakingToken.symbol}
                </StatsBoxTwoColumn.LeftColumn>
                <StatsBoxTwoColumn.RightColumn>
                    <div className="flex justify-end">
                        {!isLoadingStakingData &&
                            !isUndefined(dataStakingData) &&
                            dataStakingToken &&
                            dataStakingData &&
                            `~${toReadableNumber(
                                dataStakingData.staked.amount,
                                dataStakingData.staked.tokenInfo.decimals,
                                {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                }
                            )}`}
                    </div>
                </StatsBoxTwoColumn.RightColumn>

                {responseTVLinUSD && (
                    <>
                        <StatsBoxTwoColumn.LeftColumn>Total Value Locked</StatsBoxTwoColumn.LeftColumn>
                        <StatsBoxTwoColumn.RightColumn>
                            <div className="flex justify-end">
                                ~$
                                {toReadableNumber(responseTVLinUSD, 0, {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                })}{' '}
                                {!isCompleteTVLinUSD && <span className="text-xs">(incomplete)</span>}
                            </div>
                        </StatsBoxTwoColumn.RightColumn>
                    </>
                )}

                <div className="col-span-2">
                    <CaretDivider />
                </div>

                <StatsBoxTwoColumn.LeftColumn>Protocol active?</StatsBoxTwoColumn.LeftColumn>
                <StatsBoxTwoColumn.RightColumn>
                    <div className="flex justify-end">
                        {!isLoadingIsActive ? (
                            dataIsActive ? (
                                <FaRegCheckCircle className="h-5 w-5 text-success" />
                            ) : (
                                <FaRegTimesCircle className="h-5 w-5 text-error" />
                            )
                        ) : (
                            <Spinner className="mt-2 h-2 w-2" theme="dark" />
                        )}
                    </div>
                </StatsBoxTwoColumn.RightColumn>

                <StatsBoxTwoColumn.LeftColumn>Protocol running?</StatsBoxTwoColumn.LeftColumn>
                <StatsBoxTwoColumn.RightColumn>
                    <div className="flex justify-end">
                        {!isLoadingIsRunning ? (
                            dataIsRunning ? (
                                <FaRegCheckCircle className="h-5 w-5 text-success" />
                            ) : (
                                <FaRegTimesCircle className="h-5 w-5 text-error" />
                            )
                        ) : (
                            <Spinner className="mt-2 h-2 w-2" theme="dark" />
                        )}
                    </div>
                </StatsBoxTwoColumn.RightColumn>
            </StatsBoxTwoColumn.Wrapper>

            {dataStakingToken && chain && (
                <div className="col-span-2">
                    <Button
                        className="w-full"
                        disabled={!dataIsRunning}
                        onClick={() => {
                            navigate(`/dapp/staking/${chain.id}/${protocol}`, {
                                relative: 'path',
                            })
                        }}
                        variant="primary"
                    >
                        Stake {dataStakingToken.symbol}
                    </Button>
                </div>
            )}
        </Tile>
    )
}
