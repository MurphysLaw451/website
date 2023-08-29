import clsx from 'clsx'

export const H1 = (props: { children: any; className?: string }) => {
    return (
        <h1
            className={clsx(
                props.className,
                'mb-3 text-4xl font-semibold text-dark dark:text-light-100'
            )}
        >
            {props.children}
        </h1>
    )
}
