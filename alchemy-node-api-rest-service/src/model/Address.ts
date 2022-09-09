import { Alchemy } from 'alchemy-sdk';

import { alchemySettings, daiContract } from '../config';


export class AddressModel {
  public static async getDAIBalance(ownerAddress: string): Promise<string> {
    const alchemy = new Alchemy(alchemySettings);
    const result = await alchemy.core.getTokenBalances(
      ownerAddress,
      [daiContract]
    );

    return BigInt(result.tokenBalances[0].tokenBalance as string).toString(10);
  }
}