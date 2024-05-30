export const StatsBoxTwoColumn = {
    Wrapper: (props: { children: any; className?: string }) => {
        return (
            <div className={props.className}>
                <div className="grid grid-cols-2">{props.children}</div>
            </div>
        )
    },
    LeftColumn: (props: { children: any }) => {
        return <div>{props.children}</div>
    },
    RightColumn: (props: { children: any }) => {
        return <div className="text-right">{props.children}</div>
    },
}
