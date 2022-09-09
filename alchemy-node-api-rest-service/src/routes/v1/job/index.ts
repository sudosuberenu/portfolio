import express from 'express';
import { Alchemy } from 'alchemy-sdk';

import Logger from '../../../core/Logger';
import asyncHandler from '../../../helpers/asyncHandlers';
import TxRepo from '../../../repository/TxRepo';
import { SuccessMsgResponse } from '../../../core/ApiResponse';
import authentication from '../../../auth/index';
import { alchemySettings } from '../../../config';

const alchemy = new Alchemy(alchemySettings);
const router = express.Router();

router.use('/', authentication);

router.get('/synchronize',
authentication,
  asyncHandler(async (_req, res) => {
    Logger.info(`starting synchronization`);

    alchemy.ws.on("block", async (blockNumber: any) => {
      Logger.info(`New block ${blockNumber}. Starting to store txs in database`);
      const txs = await TxRepo.fetchFromBlock(blockNumber);
      const isSuccess = await TxRepo.createBatch(txs);

      if (isSuccess) {
        Logger.info(`Txs for blockNumber ${blockNumber} successfully stored in database`);
      }
    })

    return new SuccessMsgResponse('Synchronization started').send(res);
  }),
);

export default router;