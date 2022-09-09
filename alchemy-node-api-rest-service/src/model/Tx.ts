import { Alchemy, AssetTransfersCategory, AssetTransfersResult, toHex } from 'alchemy-sdk';
import { PrismaClient } from '@prisma/client';

import Logger from '../core/Logger';
import { alchemySettings, daiContract } from '../config';

const prisma = new PrismaClient();
const alchemy = new Alchemy(alchemySettings);

export class TxModel {
  static async fetchFromBlock(blockNumber: number): Promise<AssetTransfersResult[]> {
    const txs = await alchemy.core.getAssetTransfers({
      fromBlock: toHex(blockNumber),
      contractAddresses: [daiContract],
      excludeZeroValue: false,
      category: [AssetTransfersCategory.ERC20],
    });

    return txs.transfers;
  }

  static async create(tx: AssetTransfersResult) {
    try {
      await prisma.tx.create({
        data: {
          txhash: tx.hash,
          blocknum: parseInt(tx.blockNum, 16),
          fromaccount: tx.from,
          toaccount: tx.to
        }
      });
    } catch (err) {
      Logger.error(err);
    }

    return true;
  }

  static async getDaiTxs(offset: number, page: string) {
    const txs = await alchemy.core.getAssetTransfers({
      contractAddresses: [daiContract],
      excludeZeroValue: false,
      maxCount: offset,
      pageKey: page,
      category: [AssetTransfersCategory.ERC20],
    });

    return {
      txs: txs.transfers, 
      previousPageUrl: `/api/v1/tx/DAI/?offset=${offset}&page=${txs.pageKey}`
    };
  }

  static async getTxsFromSender(from: string) {
    const txs = await alchemy.core.getAssetTransfers({
      fromAddress: from,
      excludeZeroValue: false,
      category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20,
      AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155,
      AssetTransfersCategory.SPECIALNFT],
    });

    return {
      txs: txs.transfers,
    };
  }

  static async getTxsFromReceipt(to: string) {
    const txs = await alchemy.core.getAssetTransfers({
      toAddress: to,
      excludeZeroValue: false,
      category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20,
      AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155,
      AssetTransfersCategory.SPECIALNFT],
    });

    return {
      txs: txs.transfers,
    };
  }
}
