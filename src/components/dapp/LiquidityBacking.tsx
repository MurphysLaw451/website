import { ethers } from "ethers"; 
import { RouteObject } from "react-router-dom"
import { Button } from "../Button"
import { useEffect } from "react";

import { getStats } from "../../helpers/liquidityBacking";

const provider = new ethers.JsonRpcProvider('https://avalanche-mainnet-fork.mastertoco.de/', {
    name: 'avalanche',
    chainId: 43114
});

export const LiquidityBacking = (props: RouteObject) => {
    useEffect(() => {
        getStats(provider)
    }, []);

    return (
        <div>
            <h1 className="text-4xl mb-4">Liquidity Backing</h1>
        </div>
    )
}
