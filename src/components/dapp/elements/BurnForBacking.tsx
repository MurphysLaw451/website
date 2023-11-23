import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useAccount, useChainId, useSigner, useSwitchNetwork } from 'wagmi'
import { debounce } from '../../../helpers/debounce'
import {
    approveBaseToken,
    burnForBacking,
    getControllerAllowance,
    getExpectedWantTokensByBurningBaseTokens,
} from '../../../helpers/liquidityBacking'
import { BNtoNumber } from '../../../helpers/number'
import { Spinner } from './Spinner'

import { toast } from 'react-toastify'
import { Button } from '../../Button'

const calculateReturnAmount = async (
    signer: ethers.Signer,
    provider: ethers.providers.Provider,
    wantTokenAddress: string,
    allowance: BigNumber,
    amountToBurn: BigNumber,
    baseTokenAmount: BigNumber,
    setExpectedWantTokenAmount: Function,
    setCalculatingWantTokenAmount: Function
) => {
    if (amountToBurn?.eq(0)) {
        return
    }

    let expectedOutput: ethers.BigNumber
    if (!amountToBurn.gt(baseTokenAmount)) {
        if (allowance.isGreaterThanOrEqualTo(amountToBurn)) {
            expectedOutput = (await burnForBacking(
                signer,
                wantTokenAddress,
                ethers.BigNumber.from(amountToBurn.toFixed()),
                ethers.BigNumber.from(0),
                true
            )) as ethers.BigNumber
        } else {
            expectedOutput = await getExpectedWantTokensByBurningBaseTokens(
                provider,
                wantTokenAddress,
                ethers.BigNumber.from(amountToBurn.toFixed())
            )
        }

        setExpectedWantTokenAmount(BigNumber(expectedOutput.toString()))
    }
    setCalculatingWantTokenAmount(false)
}

const calculateReturnDebounced = debounce(
    async (
        signer: ethers.Signer,
        provider: ethers.providers.Provider,
        wantTokenAddress: string,
        allowance: BigNumber,
        amountToBurn: BigNumber,
        baseTokenAmount: BigNumber,
        setExpectedWantTokenAmount: Function,
        setCalculatingWantTokenAmount: Function
    ) => {
        if (amountToBurn?.isLessThanOrEqualTo(0)) {
            return
        }

        calculateReturnAmount(
            signer,
            provider,
            wantTokenAddress,
            allowance,
            amountToBurn,
            baseTokenAmount,
            setExpectedWantTokenAmount,
            setCalculatingWantTokenAmount
        )
    }
)

export const BurnForBacking = (props: {
    provider: ethers.providers.Provider
    baseTokenAmount: BigNumber
    baseTokenDecimals: number
    activeWantToken: {
        decimals: number
        address: string
        info: { name: string }
    }
    forceRefetch: Function
    isLoading: boolean
}) => {
    const tokensToBurnInputRef = useRef<HTMLInputElement>()
    const slippageInputRef = useRef<HTMLInputElement>()
    const [amountToBurn, setAmountToBurn] = useState(BigNumber(0))
    const [slippage, setSlippage] = useState(0.5)
    const [showSlippage, setShowSlippage] = useState(false)
    const [allowance, setAllowance] = useState(BigNumber(0))
    const [txRunning, setTxRunning] = useState(false)

    const [calculatingWantTokenAmount, setCalculatingWantTokenAmount] =
        useState(false)
    const [expectedWantTokenAmount, setExpectedWantTokenAmount] = useState(
        BigNumber(0)
    )
    const { address, isConnected } = useAccount()
    const chainId = useChainId();
    const { switchNetwork } = useSwitchNetwork()
    const [hash, setTxHash] = useState('')
    const { data: signer } = useSigner()
    const updateAllowance = async () => {
        return getControllerAllowance(props.provider, address).then(
            (allowance) => {
                setAllowance(BigNumber(allowance.toString()))
            }
        )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedCalculateReturnAmount = useCallback(
        calculateReturnDebounced,
        []
    )

    useEffect(() => {
        setCalculatingWantTokenAmount(true)
        debouncedCalculateReturnAmount(
            signer,
            props.provider,
            props.activeWantToken?.address,
            allowance,
            amountToBurn,
            props.baseTokenAmount,
            setExpectedWantTokenAmount,
            setCalculatingWantTokenAmount
        )
    }, [
        signer,
        props.provider,
        props.activeWantToken,
        props.baseTokenAmount,
        amountToBurn,
        allowance,
        debouncedCalculateReturnAmount,
    ])

    useEffect(() => {
        if (!isConnected || !address) {
            return
        }

        updateAllowance()
    }, [isConnected, address, props.provider])

    if (!isConnected) {
        return <p>Connect wallet to be able to burn DGNX for backing</p>
    }

    if (!props.baseTokenAmount || !props.baseTokenDecimals) {
        return <p>...</p>
    }

    const execBurn = async () => {
        setTxRunning(true)
        const toastId = toast.loading('Burn is being processed', {
            autoClose: false,
        })
        const hash = (await burnForBacking(
            signer,
            props.activeWantToken.address,
            ethers.BigNumber.from(amountToBurn.toFixed()),
            ethers.BigNumber.from(
                expectedWantTokenAmount
                    .times(1 - slippage / 100)
                    .integerValue()
                    .toFixed()
            )
        )) as string
        setTxHash(hash)
        toast.dismiss(toastId)
        if (!!hash) {
            setAmountToBurn(BigNumber(0))
            tokensToBurnInputRef.current.value = ''
            toast.success('Burn for backing successful', { autoClose: 3000 })
        } else {
            toast.error('Burn for backing failed! Please try again', {
                autoClose: 5000,
            })
        }
        setTxRunning(false)
        props.forceRefetch()
    }

    const execApprove = async () => {
        setTxRunning(true)
        const toastId = toast.loading('Waiting for approval...', {
            autoClose: false,
        })
        const isApproved = await approveBaseToken(
            signer,
            ethers.BigNumber.from(amountToBurn.toFixed())
        )
        toast.dismiss(toastId)
        if (isApproved) {
            toast.success('Approval successfully', { autoClose: 3000 })
        } else {
            toast.error('Approval failed! Please try again', {
                autoClose: 5000,
            })
        }
        await updateAllowance()
        await calculateReturnAmount(
            signer,
            props.provider,
            props.activeWantToken.address,
            allowance,
            amountToBurn,
            props.baseTokenAmount,
            setExpectedWantTokenAmount,
            setCalculatingWantTokenAmount
        )
        setTxRunning(false)
    }

    const updateBurnAmount = (amount: BigNumber) => {
        let burnAmount = amount
        if (burnAmount.gt(props.baseTokenAmount)) {
            burnAmount = props.baseTokenAmount
            tokensToBurnInputRef.current.value = BNtoNumber(
                props.baseTokenAmount,
                props.baseTokenDecimals
            ).toString()
        }

        setAmountToBurn(burnAmount)
    }

    return (
        <>
            <div className="mb-3 py-6">
                {!showSlippage && (
                    <p className="text-right text-xs">
                        Slippage:{' '}
                        <span
                            className="cursor-pointer underline"
                            onClick={() => {
                                setShowSlippage(true)
                            }}
                        >
                            {slippage}%
                        </span>
                    </p>
                )}
                {showSlippage && (
                    <p className="text-right text-xs">
                        Set slippage:{' '}
                        <span
                            className="cursor-pointer hover:underline"
                            onClick={() => {
                                setSlippage(0.5)
                                setShowSlippage(false)
                            }}
                        >
                            0.5%
                        </span>
                        <span className="px-1">|</span>
                        <span
                            className="cursor-pointer hover:underline"
                            onClick={() => {
                                setSlippage(1)
                                setShowSlippage(false)
                            }}
                        >
                            1%
                        </span>
                        <span className="px-1">|</span>
                        <span className="" onClick={() => {}}>
                            <input
                                ref={slippageInputRef}
                                type="text"
                                className="dark:border-dark-800 m-0 w-6 border p-0 text-xs dark:bg-dark dark:text-light-200"
                            />
                            %
                            <AiOutlineCheckCircle
                                className="ml-1 inline cursor-pointer "
                                onClick={() => {
                                    setSlippage(
                                        parseFloat(
                                            slippageInputRef.current.value ||
                                                '0.5'
                                        )
                                    )
                                    setShowSlippage(false)
                                }}
                            />
                        </span>
                    </p>
                )}
                <input
                    className="my-2 w-full rounded-xl border-2 border-degenOrange bg-light-100 py-2 text-2xl leading-3 text-light-800 ring-0 focus:border-degenOrange focus:shadow-none focus:outline-none focus:ring-0 dark:border-activeblue dark:bg-dark dark:text-light-200"
                    type="number"
                    placeholder="0"
                    disabled={txRunning}
                    onChange={(e) =>
                        updateBurnAmount(
                            BigNumber(10)
                                .pow(props.baseTokenDecimals)
                                .times(
                                    BigNumber(parseFloat(e.target.value || '0'))
                                )
                        )
                    }
                    ref={tokensToBurnInputRef}
                />
                <p className="text-right text-xs">
                    Max:{' '}
                    <span
                        className="cursor-pointer underline"
                        onClick={() => {
                            tokensToBurnInputRef.current.value = BNtoNumber(
                                props.baseTokenAmount,
                                props.baseTokenDecimals
                            ).toString()
                            setAmountToBurn(props.baseTokenAmount)
                        }}
                    >
                        {BNtoNumber(
                            props.baseTokenAmount,
                            props.baseTokenDecimals
                        )}
                    </span>
                </p>

                {chainId === 43114 && amountToBurn.isGreaterThan(0) && (
                    <div className="flex items-center">
                        {allowance.isGreaterThanOrEqualTo(amountToBurn) ? (
                            <Button
                                className="w-full mt-3"
                                color="orange"
                                onClick={() => execBurn()}
                            >
                                {txRunning ? <Spinner className="" /> : 'Burn'}
                            </Button>
                        ) : (
                            <Button
                                className="w-full mt-3"
                                color="orange"
                                onClick={() => execApprove()}
                            >
                                {txRunning ? (
                                    <Spinner className="" />
                                ) : (
                                    'Approve'
                                )}
                            </Button>
                        )}
                    </div>
                )}

                {chainId !== 43114 && amountToBurn.isGreaterThan(0) && (
                    <div className="flex items-center">
                        <Button
                            className="w-full mt-3"
                            color="orange"
                            onClick={() => switchNetwork(43114)}
                        >
                            Switch to Avax
                        </Button>
                    </div>
                )}
            </div>
            <div />

            {hash && (
                <div>
                    Tx successful!{' '}
                    <a
                        className="text-orange-600"
                        href={`https://avascan.info/blockchain/c/tx/${hash}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Check transaction on Avascan
                    </a>
                </div>
            )}
            {(calculatingWantTokenAmount || props.isLoading) &&
                amountToBurn.isGreaterThan(0) && (
                    <p className="">Calculating expected output...</p>
                )}
            {!calculatingWantTokenAmount &&
                !props.isLoading &&
                amountToBurn.isGreaterThan(0) &&
                expectedWantTokenAmount.isGreaterThan(0) && (
                    <>
                        <div />
                        <div className="inline-block ">
                            {allowance.isGreaterThanOrEqualTo(amountToBurn)
                                ? 'Includes token tax, fees, etc'
                                : 'Estimated output. Approve to get exact values'}
                            <div className="flex gap-x-5">
                                <p className="flex-grow">Expected output:</p>
                                <p className="text-right">
                                    {BNtoNumber(
                                        expectedWantTokenAmount,
                                        props.activeWantToken.decimals
                                    ).toFixed(8)}{' '}
                                    {props.activeWantToken.info.name}
                                </p>
                            </div>
                            <div className="flex gap-x-5">
                                <p className="flex-grow">Minimum received:</p>
                                <p className="text-right">
                                    {BNtoNumber(
                                        expectedWantTokenAmount.times(
                                            1 - slippage / 100
                                        ),
                                        props.activeWantToken.decimals
                                    ).toFixed(8)}{' '}
                                    {props.activeWantToken.info.name}
                                </p>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}
