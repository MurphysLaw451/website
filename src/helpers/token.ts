import { ethers } from 'ethers'
import { Erc20__factory } from '../../types'

const cachedTokenData: Record<
  string,
  Promise<[string, number]> | [string, number]
> = {}

export const getTokenData = async (
  provider: ethers.providers.Provider,
  address: string
) => {
  if (cachedTokenData[address]) {
    return cachedTokenData[address]
  }

  const token = Erc20__factory.connect(address, provider)
  cachedTokenData[address] = Promise.all([token.name(), token.decimals()])
  return cachedTokenData[address]
}
