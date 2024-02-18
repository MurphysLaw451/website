import { ConnectKitButton } from 'connectkit'
import { useEffect, useState } from 'react'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { PiPlugsConnected } from 'react-icons/pi'
import { VscDebugDisconnect } from 'react-icons/vsc'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useSignMessage } from 'wagmi'
import { useFinishVerification } from '../../hooks/bouncer/useFinishVerification'
import { useGetVerificationData } from '../../hooks/bouncer/useGetVerificationData'
import { Button } from '../Button'
import { Spinner } from './elements/Spinner'

const VerifyButton = (props: {
    keyToVerify: string
    addressToVerify: string
    messageToVerify: string
    onVerificationStatusUpdate: () => void
}) => {
    const [verificationLoading, setVerificationLoading] = useState(false)
    const {
        data: signMessageData,
        error,
        isLoading,
        reset,
        signMessage,
        variables,
    } = useSignMessage()

    const verify = () => {
        signMessage({ message: props.messageToVerify })
    }

    useEffect(() => {
        if (!signMessageData) return
        setVerificationLoading(true)
        fetch(process.env.NEXT_PUBLIC_BOUNCER_VERIFY_WALLET, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: props.keyToVerify,
                wallet: props.addressToVerify,
                signature: signMessageData,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                reset()
                setVerificationLoading(false)
                if (res.status === 'error') return false
                props.onVerificationStatusUpdate()
            })
    }, [signMessageData])

    return (
        <ConnectKitButton.Custom>
            {({
                isConnected,
                isConnecting,
                show,
                hide,
                address,
                ensName,
                chain,
            }) => {
                if (!isConnected)
                    return (
                        <button
                            onClick={show}
                            className="flex items-center justify-center gap-2 rounded-lg border p-2 dark:border-activeblue dark:bg-darkblue dark:text-light-200 dark:hover:bg-activeblue"
                        >
                            <VscDebugDisconnect className="inline-block" />{' '}
                            Connect wallet to verify
                        </button>
                    )

                if (props.addressToVerify === address) {
                    return (
                        <button
                            onClick={verify}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 rounded-lg border p-2 dark:border-activeblue dark:bg-darkblue dark:text-light-200 dark:hover:bg-activeblue"
                        >
                            {isLoading || verificationLoading ? (
                                <Spinner theme="dark" />
                            ) : (
                                <>
                                    <PiPlugsConnected className="inline-block" />{' '}
                                    Verify now
                                </>
                            )}
                        </button>
                    )
                } else {
                    return (
                        <div className="flex items-center justify-center gap-2">
                            <VscDebugDisconnect className="inline-block" />{' '}
                            Change wallet to verify
                        </div>
                    )
                }
            }}
        </ConnectKitButton.Custom>
    )
}

export const Bouncer = () => {
    const { hash } = useParams()
    const [verificationData, reloadVerificationData] =
        useGetVerificationData(hash)
    const {
        request: finishVerification,
        response,
        isLoading: isFinishVerificationLoading,
        error,
    } = useFinishVerification(hash)

    const canFinishVerification = !verificationData?.data?.items?.find(
        (item) => !item.verified
    )
    const onVerificationStatusUpdate = () => {
        reloadVerificationData()
    }
    useEffect(() => {
        if (error) toast.error(error.message, { autoClose: 5000 })
        if (response) toast.success(response.message, { autoClose: 5000 })
        reloadVerificationData()
    }, [response, error])

    return (
        <div>
            <h1 className="mb-5 mt-4 flex flex-col gap-1 font-title text-3xl font-bold tracking-wide sm:mb-8 sm:flex-row">
                <span className="text-techGreen">Bouncer</span>
                <span className="text-degenOrange">WalletVerification</span>
            </h1>
            <div className="mb-4 rounded-xl border-2 border-degenOrange bg-light-100 text-light-200 dark:border-activeblue  dark:bg-darkerblue  dark:text-light-200">
                {!verificationData && (
                    <div className="flex items-center justify-center p-3">
                        <Spinner theme="dark" />
                    </div>
                )}

                {verificationData && verificationData.message && (
                    <div className="flex items-center justify-center p-3">
                        {verificationData.message}
                    </div>
                )}

                {verificationData &&
                    verificationData.data &&
                    !verificationData.data.verificationFinished &&
                    verificationData.data.items?.length > 0 && (
                        <table className="w-full border-collapse items-center">
                            <thead>
                                <tr>
                                    <th className="bg-blueGray-50 whitespace-nowrap border-2 border-l-0 border-r-0 border-t-0 border-solid border-activeblue px-6 py-3 text-left align-middle font-semibold uppercase">
                                        Wallet
                                    </th>
                                    <th className="bg-blueGray-50 whitespace-nowrap border-2 border-l-0 border-r-0 border-t-0 border-solid border-activeblue px-6 py-3 text-right align-middle font-semibold uppercase">
                                        DGNX
                                    </th>
                                    <th className="bg-blueGray-50 whitespace-nowrap border-2 border-l-0 border-r-0 border-t-0 border-solid border-activeblue px-6 py-3 text-center align-middle font-semibold uppercase">
                                        Verified?
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {verificationData.data.items?.map((item, k) => (
                                    <tr key={item.wallet}>
                                        <td className="whitespace-nowrap border-2 border-l-0 border-r-0 border-t-0 border-activeblue p-4 px-6 text-left align-middle">
                                            {item.wallet}
                                        </td>
                                        <td className="whitespace-nowrap border-2 border-l-0 border-r-0 border-t-0 border-activeblue p-4 px-6 text-right align-middle">
                                            {item.amount.toLocaleString(
                                                navigator.language,
                                                {
                                                    minimumFractionDigits: 3,
                                                    maximumFractionDigits: 3,
                                                }
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap border-2 border-l-0 border-r-0 border-t-0 border-activeblue p-4 px-6 text-center align-middle">
                                            <div className="flex justify-center">
                                                {item.verified ? (
                                                    <IoShieldCheckmarkOutline className="inline-block" />
                                                ) : (
                                                    <VerifyButton
                                                        onVerificationStatusUpdate={
                                                            onVerificationStatusUpdate
                                                        }
                                                        keyToVerify={
                                                            verificationData
                                                                .data.key
                                                        }
                                                        addressToVerify={
                                                            item.wallet
                                                        }
                                                        messageToVerify={
                                                            item.verifyMessage
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle">
                                        Total
                                    </td>
                                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle">
                                        {verificationData.data.totalAmount.toLocaleString(
                                            navigator.language,
                                            {
                                                minimumFractionDigits: 3,
                                                maximumFractionDigits: 3,
                                            }
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-center">
                                        <Button
                                            onClick={finishVerification}
                                            disabled={!canFinishVerification}
                                            color={
                                                !canFinishVerification
                                                    ? 'disabled'
                                                    : 'orange'
                                            }
                                        >
                                            {isFinishVerificationLoading ? (
                                                <Spinner />
                                            ) : (
                                                <>Finish verification</>
                                            )}
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                {verificationData &&
                    verificationData.data &&
                    verificationData.data.verificationFinished && (
                        <div className="flex items-center justify-center p-3">
                            <p className="text-center">
                                You've finished the verification successfully.
                                <br />
                                <br />
                                You should have received an invite link through
                                Telegram
                            </p>
                        </div>
                    )}
            </div>
            <ToastContainer />
        </div>
    )
}
