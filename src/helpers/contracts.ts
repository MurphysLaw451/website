import { prepareWriteContract, readContract, writeContract } from '@wagmi/core'
import { Account, Address } from 'viem'
import { erc20ABI } from 'wagmi'
import controllerAbi from './../../src/abi/controller.json'
import vaultAbi from './../../src/abi/vault.json'

export const readControllerContract = async (args: {
  functionName: string
  args?: any[]
  account?: Address | Account
}) => {
  return await readContract({
    address: process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS! as Address,
    abi: controllerAbi,
    functionName: args.functionName,
    args: args.args,
    account: args.account,
  })
}

export const writeControllerContract = async (args: {
  functionName: string
  account: Address | Account
  args?: any[]
}) => {
  return await writeContract({
    address: process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS! as Address,
    abi: controllerAbi,
    functionName: args.functionName,
    args: args.args,
    account: args.account,
  })
}

export const simulateControllerContract = async (args: {
  functionName: string
  args?: any[]
  account?: Address | Account
}) => {
  return await prepareWriteContract({
    address: process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS! as Address,
    abi: controllerAbi,
    functionName: args.functionName,
    args: args.args,
    account: args.account,
  })
}

export const readVaultContract = async (args: {
  address: Address
  functionName: string
  args?: any[]
  account?: Address | Account
}) => {
  return await readContract({
    address: args.address,
    abi: vaultAbi,
    functionName: args.functionName,
    args: args.args,
    account: args.account,
  })
}

export const readTokenContract = async (args: {
  address: Address
  functionName: any
  args?: any[any]
  account?: Address | Account
}) => {
  return await readContract({
    address: args.address,
    abi: erc20ABI,
    functionName: args.functionName,
    args: args.args,
    account: args.account,
  })
}

export const writeTokenContract = async (args: {
  address: Address
  functionName: any
  args?: any[any]
  account?: Address | Account
}) => {
  return await writeContract({
    address: args.address,
    abi: erc20ABI,
    functionName: args.functionName,
    args: args.args,
    account: args.account,
  })
}
