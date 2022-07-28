import axios from 'axios'
import { PoolResponse } from '../types'

const UNISWAP_URL: string = "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-alt"

export const getPoolsFromAssetId = async (assetId: string): Promise<PoolResponse | undefined> => {
  const queryToken0 = `{ pools (where: { token0: "${assetId}" }) { id } }`
  const queryToken1 = `{ pools (where: { token1: "${assetId}" }) { id } }`
  let poolResponse: PoolResponse = { pools: [] };
  
  try {
    const promiseToken0 = axios.post(UNISWAP_URL, {query: queryToken0})
    const promiseToken1 = axios.post(UNISWAP_URL, {query: queryToken1})

    const results = await Promise.all([promiseToken0, promiseToken1])
    
    results.map(result => {
      poolResponse.pools = [...poolResponse.pools, ...result.data.data.pools]
    });
  } catch (error) {
    console.error(error)
  }
 
  return poolResponse
}

export const getVolumeFromAssetIdWithRangeTime = async (_assetId: string): Promise<Number | undefined> => {
  const volume = 0
  return volume
}
