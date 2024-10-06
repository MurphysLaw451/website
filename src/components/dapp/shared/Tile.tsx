type TileProps = {
    className?: string | any
    children?: any
}
export const Tile = ({ children, className }: TileProps) => {
    return (
        <div
            className={`bg-dapp-blue-600 p-4 sm:p-8 text-dapp-cyan-50 sm:rounded-lg ${
                className ? className : ''
            }`}
        >
            {children}
        </div>
    )
}
