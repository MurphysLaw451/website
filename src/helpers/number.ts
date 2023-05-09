import BigNumber from "bignumber.js";
import { ethers } from "ethers";

export const BNtoNumber = (number: ethers.BigNumber | BigNumber, decimals: number | BigNumber) => {
    return BigNumber(number.toString()).div(BigNumber(10).pow(decimals)).toNumber()
}