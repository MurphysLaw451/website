import { RouteObject } from "react-router-dom"
import { useAccount, useContractRead } from "wagmi"


export const ATMApp = (props: RouteObject) => {
    const { address, isConnected } = useAccount()

    if (!isConnected) {
        return <div className="font-bold">Please connect wallet</div>
    }

    return (
        <div>
            Hoi
        </div>
    )
}
