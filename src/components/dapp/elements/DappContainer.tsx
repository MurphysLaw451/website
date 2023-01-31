import clsx from 'clsx'

export function DappContainer({ className = '', ...props }) {
    return (
        <div
            className={clsx('mx-auto max-w-full px-6', className)}
            {...props}
        />
    )
}
