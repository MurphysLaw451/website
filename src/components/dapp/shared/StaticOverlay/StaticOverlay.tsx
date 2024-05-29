import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo, useState } from 'react'
import { MdClose } from 'react-icons/md'

type StaticOverlayProps = {
    open: boolean
    title: string
    canClose?: boolean
    onClose?: () => void
    children: any
}
export const StaticOverlay = ({
    open,
    title,
    canClose,
    onClose,
    children,
}: StaticOverlayProps) => {
    const [show, setShow] = useState(true)

    useMemo(() => setShow(open), [open])

    const onCloseHandler = () => {
        if (canClose) {
            setShow(false)
            if (onClose) onClose()
        }
    }

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onCloseHandler}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-dapp-blue-800  bg-opacity-70 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="max-h-50% pointer-events-none fixed inset-y-0 bottom-0 top-auto flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-y-full"
                                enterTo="translate-y-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-y-0"
                                leaveTo="translate-y-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen">
                                    <div className="flex h-full flex-col rounded-t-3xl bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex flex-row flex-wrap items-center leading-6">
                                                <Dialog.Title className="grow text-center text-base font-semibold  text-gray-900">
                                                    {title}
                                                </Dialog.Title>
                                                {canClose && (
                                                    <button
                                                        type="button"
                                                        className="shrink-[2] rounded-md text-right text-gray-900 hover:text-degenOrange focus:outline-none focus:ring-2 focus:ring-white"
                                                        onClick={onCloseHandler}
                                                    >
                                                        <MdClose
                                                            className="h-8 w-8"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="relative mt-6 px-4 text-gray-900 sm:px-6">
                                            {children}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
