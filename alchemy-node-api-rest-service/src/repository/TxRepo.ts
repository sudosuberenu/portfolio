import { AssetTransfersResult } from 'alchemy-sdk';

import { TxModel } from '../model/Tx';
import Logger from '../core/Logger';

export default class TxRepo {
  public static async fetchFromBlock(blockNumber: number): Promise<AssetTransfersResult[]> {
    const txs = await TxModel.fetchFromBlock(blockNumber);
    Logger.info(`${txs.length} txs has been fetched from Alchemy`);
    return txs;
  }

  public static async createBatch(txs: AssetTransfersResult[]): Promise<boolean> {
    let promises: Promise<boolean>[] = [];
    
    txs.forEach(tx => {
      promises.push(this.create(tx));
    })

    await Promise.all(promises);
    return true;
  }

  public static async create(tx: AssetTransfersResult): Promise<boolean> {
    await TxModel.create(tx);
    Logger.info(`tx ${tx.hash} stored in owned database`);
    return true;
  }

  public static async getDaiTxs(offset: number, page: string): Promise<any> {
    const response = await TxModel.getDaiTxs(offset, page);
    Logger.info(`Fetched ${response.txs.length} DAI txs from 3rd repo`);
    return response;
  }

  public static async getTxsFromSender(from: string): Promise<any> {
    const response = await TxModel.getTxsFromSender(from);
    Logger.info(`Fetched ${response.txs.length} txs from sender ${from} from 3rd repo`);
    return response;
  }

  public static async getTxsFromReceipt(to: string): Promise<any> {
    const response = await TxModel.getTxsFromReceipt(to);
    Logger.info(`Fetched ${response.txs.length} txs from receipt ${to} from 3rd repo`);
    return response;
  }
}