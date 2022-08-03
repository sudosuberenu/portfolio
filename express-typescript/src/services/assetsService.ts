import axios from 'axios'
import "reflect-metadata"
import { injectable } from 'inversify'
import { PoolResponse } from '../types'

interface IAssetsService {
  getPoolsFromAssetId(assetId: string): Promise<PoolResponse>,
  getVolumeFromAssetIdWithRangeTime(assetId: string): Promise<Number>
}

@injectable()
export class AssetsService implements IAssetsService {
  private readonly uniswapUrl: string = "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-alt"

  constructor() {}

  public async getPoolsFromAssetId(assetId: string): Promise<PoolResponse> {
    const queryToken0: string = `{ pools (where: { token0: "${assetId}" }) { id } }`
    const queryToken1: string = `{ pools (where: { token1: "${assetId}" }) { id } }`
    let poolResponse: PoolResponse = { pools: [] };
    
    try {
      const promiseToken0: Promise<any> = axios.post(this.uniswapUrl, {query: queryToken0})
      const promiseToken1: Promise<any> = axios.post(this.uniswapUrl, {query: queryToken1})
  
      const results = await Promise.all([promiseToken0, promiseToken1])
      
      results.map(result => {
        poolResponse.pools = [...poolResponse.pools, ...result.data.data.pools]
      });
    } catch (error) {
      console.error(error)
    }
   
    return poolResponse
  }

  public async getVolumeFromAssetIdWithRangeTime(_assetId: string): Promise<Number> {
    const volume: Number = 0
    return volume
  }
}
