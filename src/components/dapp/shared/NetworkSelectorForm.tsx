import { Checkbox, Field, Label, Radio, RadioGroup } from '@headlessui/react'
import { isNumber } from 'lodash'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaRegCircle } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { Chain } from 'viem'
import { useAccount, useSwitchChain } from 'wagmi'

type NetworkSelectorFormProps = {
    chains: Chain[]
    selectedChain: Chain
    onChange: (chain: Chain) => void
}
export const NetworkSelectorForm = ({ chains, selectedChain, onChange }: NetworkSelectorFormProps) => {
    const { isConnected, chain: connectedChain } = useAccount()
    const { switchChain } = useSwitchChain()

    let [selected, setSelected] = useState<number>(selectedChain.id)
    let [showTestnets, setShowTestnets] = useState(false)

    useEffect(() => {
        chains &&
            isNumber(selected) &&
            selected != selectedChain.id &&
            onChange &&
            onChange(chains.find((chain) => chain.id == selected)!)
    }, [chains, selected, selectedChain, onChange])

    useEffect(() => {
        connectedChain && connectedChain.testnet && setShowTestnets(true)
    }, [connectedChain])

    return (
        <RadioGroup value={selected} onChange={setSelected} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {isConnected && connectedChain && connectedChain.id != selected && (
                <div className="text-error/50 md:col-span-2">
                    The network you&apos;ve selected differs the one you&apos;re connected with.{' '}
                    <button
                        onClick={() => {
                            switchChain({ chainId: selected })
                        }}
                        className="cursor-pointer font-bold underline"
                    >
                        Change to {selectedChain.name}
                    </button>
                </div>
            )}
            {chains
                .sort((chain) => (chain.testnet ? 1 : -1))
                .sort((chain) => (connectedChain && connectedChain.id == chain.id ? -1 : 1))
                .filter((chain) => !chain.testnet || (chain.testnet && showTestnets))
                .map((chain, i) => (
                    <Field key={i} className="flex w-full items-center ">
                        <Radio
                            value={chain.id}
                            className="group relative flex w-full cursor-pointer rounded-lg bg-dapp-blue-400 px-4 py-4 text-white shadow-md transition focus:outline-none data-[checked]:bg-dapp-blue-200 data-[focus]:outline-1 data-[focus]:outline-dapp-blue-50"
                        >
                            <div className="flex w-full flex-row items-center justify-between gap-4">
                                <span className="rounded-full bg-dapp-blue-50 p-1">
                                    <Image
                                        src={chain.id == 56 ? `/chains/${chain.id}.png` : `/chains/${chain.id}.svg`}
                                        alt={`${chain.name} Logo`}
                                        width={32}
                                        height={32}
                                    />
                                </span>
                                <p className="flex-1 text-white">
                                    <span className="font-semibold">{chain.name}</span>
                                    {chain.testnet && <sub className="text-xs"> testnet</sub>}
                                </p>
                                <FaCircleCheck className="hidden h-6 w-6 fill-white transition group-data-[checked]:block" />
                                <FaRegCircle className="block h-6 w-6 fill-white opacity-30 transition group-data-[checked]:hidden" />
                            </div>
                        </Radio>
                    </Field>
                ))}
            <Field className="flex flex-col gap-2 px-2 pt-2 md:col-span-2">
                <div className="flex gap-2">
                    <Checkbox
                        checked={showTestnets}
                        onChange={() => {
                            setShowTestnets(!showTestnets)
                        }}
                        className="group block h-5 w-5 cursor-pointer rounded-sm border border-dapp-cyan-50 bg-transparent data-[checked]:border-dapp-cyan-500  data-[checked]:bg-dapp-cyan-500"
                    >
                        <svg
                            className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                            viewBox="0 0 14 14"
                            fill="none"
                        >
                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Checkbox>
                    <Label className="cursor-pointer">Show Testnets</Label>
                </div>
            </Field>
        </RadioGroup>
    )
}
