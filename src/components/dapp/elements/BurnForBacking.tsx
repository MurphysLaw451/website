import BigNumber from "bignumber.js"
import { useCallback, useEffect, useRef, useState } from "react"
import { debounce } from "../../../helpers/debounce"
import { BNtoNumber } from "../../../helpers/number"
import { approveBaseToken, burnForBacking, getControllerAllowance, getExpectedWantTokensByBurningBaseTokens } from "../../../helpers/liquidityBacking"
import { ethers } from "ethers"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { useAccount, useSigner } from "wagmi"
import { Spinner } from "./Spinner"

const calculateReturnAmount = async (
    signer: ethers.Signer,
    provider: ethers.providers.Provider,
    wantTokenAddress: string,
    allowance: BigNumber,
    amountToBurn: BigNumber,
    setExpectedWantTokenAmount: Function,
    setSalculatingWantTokenAmount: Function
) => {
    if (allowance?.eq(0) || amountToBurn?.eq(0)) {
        return;
    }

    setExpectedWantTokenAmount(BigNumber(0))
    setSalculatingWantTokenAmount(true)

    let expectedOutput: ethers.BigNumber;
    if (allowance.isGreaterThanOrEqualTo(amountToBurn)) {
        expectedOutput = await burnForBacking(
            signer,
            wantTokenAddress,
            ethers.BigNumber.from(amountToBurn.toFixed()),
            ethers.BigNumber.from(0),
            true
        ) as ethers.BigNumber;
    } else {
        expectedOutput = await getExpectedWantTokensByBurningBaseTokens(
            provider,
            wantTokenAddress,
            ethers.BigNumber.from(amountToBurn.toFixed())
        )
    }

    setExpectedWantTokenAmount(BigNumber(expectedOutput.toString()))
    setSalculatingWantTokenAmount(false)
}

const calculateReturnDebounced = debounce(async (
    signer: ethers.Signer,
    provider: ethers.providers.Provider,
    wantTokenAddress: string,
    allowance: BigNumber,
    amountToBurn: BigNumber,
    setExpectedWantTokenAmount: Function,
    setSalculatingWantTokenAmount: Function
) => {
    if (amountToBurn?.isLessThanOrEqualTo(0)) {
        return;
    }

    calculateReturnAmount(
        signer,
        provider,
        wantTokenAddress,
        allowance,
        amountToBurn,
        setExpectedWantTokenAmount,
        setSalculatingWantTokenAmount
    )
})

export const BurnForBacking = (props: {
    provider: ethers.providers.Provider,
    baseTokenAmount: BigNumber,
    baseTokenDecimals: number,
    activeWantToken: { decimals: number; address: string; info: { name: string } },
    forceRefetch: Function,
}) => {
    const tokensToBurnInputRef = useRef<HTMLInputElement>()
    const slippageInputRef = useRef<HTMLInputElement>()
    const [amountToBurn, setAmountToBurn] = useState(BigNumber(0))
    const [slippage, setSlippage] = useState(0.5)
    const [showSlippage, setShowSlippage] = useState(false)
    const [allowance, setAllowance] = useState(BigNumber(0))
    const [txRunning, setTxRunning] = useState(false)

    const [calculatingWantTokenAmount, setSalculatingWantTokenAmount] = useState(false)
    const [expectedWantTokenAmount, setExpectedWantTokenAmount] = useState(BigNumber(0))
    const { address, isConnected } = useAccount()
    const [hash, setTxHash] = useState('')
    const { data: signer } = useSigner()

    const updateAllowance = async () => {
        return getControllerAllowance(props.provider, address).then(allowance => {
            setAllowance(BigNumber(allowance.toString()))
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedCalculateReturnAmount = useCallback(calculateReturnDebounced, [])

    useEffect(() => {
        debouncedCalculateReturnAmount(
            signer,
            props.provider,
            props.activeWantToken?.address,
            allowance,
            amountToBurn,
            setExpectedWantTokenAmount,
            setSalculatingWantTokenAmount
        )
    }, [signer, props.provider, props.activeWantToken, amountToBurn, allowance, debouncedCalculateReturnAmount])

    useEffect(() => {
        if (!isConnected || !address) {
            return;
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
        const hash = await burnForBacking(
            signer,
            props.activeWantToken.address,
            ethers.BigNumber.from(amountToBurn.toFixed()),
            ethers.BigNumber.from(expectedWantTokenAmount.times(1 - slippage / 100).integerValue().toFixed()),
        ) as string;
        setTxHash(hash);
        setTxRunning(false)
        props.forceRefetch()
    }

    return (
        <>
            <div className="mb-3 py-6">
                {!showSlippage && <p className="text-xs text-right">
                    Slippage:{' '}
                    <span
                        className="underline cursor-pointer"
                        onClick={() => { setShowSlippage(true) }}
                    >
                        {slippage}%
                    </span>
                </p>}
                {showSlippage && <p className="text-xs text-right">
                    Set slippage:{' '}
                    <span className="cursor-pointer hover:underline" onClick={() => { setSlippage(0.5); setShowSlippage(false); }}>0.5%</span><span className="px-1">|</span>
                    <span className="cursor-pointer hover:underline" onClick={() => { setSlippage(1); setShowSlippage(false); }}>1%</span><span className="px-1">|</span>
                    <span className="" onClick={() => {  }}>
                        <input ref={slippageInputRef} type="text" className="text-xs p-0 m-0 w-6 dark:bg-slate-900 border dark:border-dark-800 dark:text-slate-200" />%
                        <AiOutlineCheckCircle className="cursor-pointer inline ml-1 text-sm" onClick={() => {
                            setSlippage(parseFloat(slippageInputRef.current.value || '0.5'));
                            setShowSlippage(false);
                        }} />
                    </span>
                </p>}
                <input
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none dark:bg-slate-900 border dark:border-dark-800 dark:text-slate-200 text-2xl py-2 my-2 leading-3 w-full"
                    type="number"
                    placeholder="0"
                    onChange={(e) => setAmountToBurn(BigNumber(10).pow(props.baseTokenDecimals).times(BigNumber(parseFloat(e.target.value || '0'))))}
                    ref={tokensToBurnInputRef}
                />
                <p className="text-xs text-right">
                    Max:{' '}
                    <span
                        className="underline cursor-pointer"
                        onClick={() => {
                            tokensToBurnInputRef.current.value = BNtoNumber(props.baseTokenAmount, props.baseTokenDecimals).toString()
                            setAmountToBurn(props.baseTokenAmount)
                        }}
                    >
                        {BNtoNumber(props.baseTokenAmount, props.baseTokenDecimals)}
                    </span>
                </p>
                
                {amountToBurn.isGreaterThan(0) && (
                    <>
                        {allowance.isGreaterThanOrEqualTo(amountToBurn)
                            ? <button
                                className="bg-orange-500 hover:bg-orange-400 text-white dark:bg-orange-600 py-1 px-3 rounded-lg dark:hover:bg-orange-700 flex w-full p-2 text-2xl justify-center my-3"
                                onClick={() => execBurn()}
                            >
                                {txRunning ? <Spinner className="" /> : 'Burn'}
                            </button>
                            : <button
                                className="bg-orange-500 hover:bg-orange-400 text-white dark:bg-orange-600 py-1 px-3 rounded-lg dark:hover:bg-orange-700 flex w-full p-2 text-2xl justify-center my-3"
                                onClick={async () => {
                                    setTxRunning(true);
                                    await approveBaseToken(signer, ethers.BigNumber.from(amountToBurn.toFixed()))
                                    await updateAllowance();
                                    await calculateReturnAmount(
                                        signer,
                                        props.provider,
                                        props.activeWantToken.address,
                                        allowance,
                                        amountToBurn,
                                        setExpectedWantTokenAmount,
                                        setSalculatingWantTokenAmount
                                    );
                                    setTxRunning(false);
                                }}
                            >
                                {txRunning ? <Spinner className="" /> : 'Approve'}
                            </button>}
                    </>
                )}
                
            </div>
            <div />

            {hash && <div>
                Tx successful! <a className="text-orange-600" href={`https://snowtrace.io/tx/${hash}`} target="_blank" rel="noreferrer">Check transaction on Snowtrace</a>
            </div>}
            {calculatingWantTokenAmount && <p className="">Calculating expected output...</p>}
            {amountToBurn.isGreaterThan(0) && expectedWantTokenAmount.isGreaterThan(0) && (
                <>
                    <div />
                    <div className="inline-block text-sm">
                        {allowance.isGreaterThanOrEqualTo(amountToBurn)
                            ? 'Includes token tax, fees, etc'
                            : 'Estimated output. Approve to get exact values'
                        }
                        <div className="flex gap-x-5">
                            <p className="flex-grow">Expected output:</p>
                            <p className="text-right">{BNtoNumber(expectedWantTokenAmount, props.activeWantToken.decimals).toFixed(8)} {props.activeWantToken.info.name}</p>
                        </div>
                        <div className="flex gap-x-5">
                            <p className="flex-grow">Minimum received:</p>
                            <p className="text-right">{BNtoNumber(expectedWantTokenAmount.times(1 - slippage / 100), props.activeWantToken.decimals).toFixed(8)} {props.activeWantToken.info.name}</p>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
