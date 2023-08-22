import clsx from 'clsx'

export const H2 = (props: { children: any; className?: string }) => {
    return (
        <h2
            className={clsx(
                'mb-3 text-2xl font-bold text-dark dark:text-light-100',
                props.className,
            )}
        >
            {props.children}
        </h2>
    )
}
