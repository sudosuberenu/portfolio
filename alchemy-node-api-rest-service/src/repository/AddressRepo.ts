import { AddressModel } from '../model/Address';
import Logger from '../core/Logger'

export default class AddressRepo {
  public static async getDAIBalance(ownerAddress: string): Promise<string> {
    const response = await AddressModel.getDAIBalance(ownerAddress);
    Logger.info(`Fetch DAI balance ${response} from ${ownerAddress}`);
    return response;
  }
}