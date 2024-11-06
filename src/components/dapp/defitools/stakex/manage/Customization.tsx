import { ManageStakeXContext } from '@dapphelpers/defitools'
import { useGetCustomization } from '@dapphooks/staking/useGetCustomization'
import { useUpdateCustomization } from '@dapphooks/staking/useUpdateCustomization'
import { Tile } from '@dappshared/Tile'
import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CircleStencil, Cropper, CropperRef } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { Id, toast } from 'react-toastify'
import { Button } from 'src/components/Button'
import { Spinner } from 'src/components/dapp/elements/Spinner'
import { StakingProjectLogo } from 'src/components/dapp/staking/StakingProjectLogo'
import { useInterval } from 'usehooks-ts'
import { createSiweMessage, CreateSiweMessageParameters, generateSiweNonce } from 'viem/siwe'
import { useAccount, useSignMessage } from 'wagmi'

export const Customization = () => {
    const {
        data: { protocol, chain, stakingToken, canEdit },
    } = useContext(ManageStakeXContext)

    const CHECK_INTERVAL = 30000

    const { address, chainId } = useAccount()

    const inputFile = useRef<HTMLInputElement | null>(null)
    const cropperRef = useRef<CropperRef>(null)

    const [projectName, setProjectName] = useState<string | null>(null)

    const [cropImage, setCropImage] = useState<string | null>(null)
    const [baseImage, setBaseImage] = useState<string | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [challengeMessage, setChallengeMessage] = useState<string | null>(null)
    const [toastId, setToastId] = useState<Id>()

    const [checkForNewImageInterval, setCheckForNewImageInterval] = useState<number | null>(null)

    const [isLoadingLogoUpload, setIsLoadingLogoUpload] = useState(false)
    const [isPendingNewLogo, setIsPendingNewLogo] = useState(false)

    const { response, load } = useGetCustomization(protocol, chain?.id!)
    const { loading: loadingUpdate, response: responseUpdate, error: errorUpdate, update } = useUpdateCustomization()
    const {
        signMessage,
        data: signature,
        isPending: isPendingSignMessage,
        isError: isErrorSignMessage,
        error: errorSignMessage,
    } = useSignMessage()

    useInterval(() => {
        if (!load) {
            setCheckForNewImageInterval(null)
        } else load()
    }, checkForNewImageInterval)

    const resetToastIdCallback = useCallback(
        ({ id, status }) => {
            if (status == 'removed' && toastId == id) setToastId(undefined)
        },
        [toastId]
    )

    const onClickUploadLogo = () => {
        inputFile && inputFile.current && inputFile.current?.click()
    }

    const onChangeFileInput = (_event: ChangeEvent<HTMLInputElement>) => {
        if (!_event.target.files || !_event.target.files?.length) return
        setCropImage(URL.createObjectURL(_event.target.files[0]))
    }

    const onClickPreview = () => {
        setPreviewImage(cropperRef.current?.getCanvas()?.toDataURL()!)
    }

    const onClickUpload = () => {
        if (!address || !chainId) return

        setIsLoadingLogoUpload(true)

        const msg: CreateSiweMessageParameters = {
            address,
            chainId,
            domain: `${window.location.host}`,
            uri: `${window.location.href}`,
            nonce: generateSiweNonce(),
            version: '1',
            statement: `I'm the owner of ${protocol} and I want to update my STAKEX customization`,
        }

        const siweMessage = createSiweMessage(msg)

        setChallengeMessage(siweMessage)

        signMessage({ account: address, message: siweMessage })
    }

    const onClickCancel = () => {
        setCropImage(null)
        setPreviewImage(null)
    }

    useEffect(() => {
        if (response && response.data) {
            setBaseImage(response.data.logoUrl)

            const pendingLogo = response.data.logoUrlUpdatePending
            setCheckForNewImageInterval(pendingLogo ? CHECK_INTERVAL : null)
            setIsPendingNewLogo(pendingLogo)
        }
    }, [response])

    useEffect(() => {
        const image = cropperRef.current?.getCanvas()?.toDataURL().split(',')[1]
        if (update && protocol && signature && isLoadingLogoUpload && chain && challengeMessage && image) {
            update({
                chainId: chain.id,
                sig: signature,
                challenge: challengeMessage,
                protocol,
                styles: [],
                image,
            })
        }
    }, [isLoadingLogoUpload, signature, chain, challengeMessage, protocol, update])

    useEffect(() => {
        if (!loadingUpdate) {
            if (responseUpdate) {
                load && load()
                setCropImage(null)
                setPreviewImage(null)
                setIsLoadingLogoUpload(false)
                !toastId &&
                    setToastId(toast.success('Updated project logo. It will be available soon.', { autoClose: 2000 }))
            }
            if (errorUpdate) {
                setIsLoadingLogoUpload(false)
                !toastId && setToastId(toast.error(errorUpdate, { autoClose: 5000 }))
            }
        }
    }, [responseUpdate, loadingUpdate, errorUpdate, load])

    useEffect(() => {
        stakingToken && stakingToken.symbol && setProjectName(`${stakingToken.symbol} staking`)
    }, [stakingToken])

    useEffect(() => {
        if (isErrorSignMessage && errorSignMessage) {
            setIsLoadingLogoUpload(false)
            toast.error((errorSignMessage as any).shortMessage, { autoClose: 5000 })
        }
    }, [isErrorSignMessage, errorSignMessage])

    useEffect(() => {
        toast.onChange(resetToastIdCallback)
    })

    return (
        <>
            <Tile className="flex w-full flex-col gap-8">
                <StakingProjectLogo
                    source={previewImage || baseImage}
                    chain={chain!}
                    isPending={isPendingNewLogo}
                    projectName={projectName ?? ''}
                />
                {canEdit && (
                    <>
                        {!cropImage && (
                            <Button onClick={onClickUploadLogo} variant="primary">
                                Upload Project Logo
                            </Button>
                        )}

                        {cropImage && (
                            <div className="mt-8 flex flex-col gap-4">
                                <div className="h-full sm:h-[400px]">
                                    <Cropper
                                        stencilComponent={CircleStencil}
                                        src={cropImage}
                                        ref={cropperRef}
                                        disabled={isLoadingLogoUpload}
                                        className={'cropper'}
                                        maxWidth={600}
                                        maxHeight={600}
                                    />
                                </div>
                                <div className="flex flex-col justify-end gap-4 md:flex-row">
                                    <Button disabled={isLoadingLogoUpload} onClick={onClickCancel} variant="secondary">
                                        Cancel
                                    </Button>
                                    <Button disabled={isLoadingLogoUpload} onClick={onClickPreview} variant="secondary">
                                        Preview
                                    </Button>
                                    <Button
                                        disabled={isLoadingLogoUpload}
                                        onClick={onClickUploadLogo}
                                        variant="secondary"
                                    >
                                        Change
                                    </Button>
                                    <Button disabled={isLoadingLogoUpload} onClick={onClickUpload} variant="primary">
                                        {isLoadingLogoUpload && (
                                            <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                                                <Spinner theme="dark" />
                                                {isPendingSignMessage && <span>wait for signing</span>}
                                                {!isPendingSignMessage && <span>upload logo</span>}
                                            </span>
                                        )}

                                        {!isLoadingLogoUpload && 'Upload'}
                                    </Button>
                                </div>
                            </div>
                        )}
                        <input
                            accept=".gif,.jpg,.jpeg,.png,.webp,.svg"
                            type="file"
                            id="file"
                            ref={inputFile}
                            onChange={onChangeFileInput}
                            style={{ display: 'none' }}
                        />
                    </>
                )}
            </Tile>
        </>

        // <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        //     <Tile className="w-full">
        //         <span className="flex-1 font-title text-xl font-bold">
        //             UI Appearance
        //         </span>
        //     </Tile>
        // </div>
    )
}
