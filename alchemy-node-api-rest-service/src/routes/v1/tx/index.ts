import express, { Request, Response } from 'express';
import { isHex } from 'alchemy-sdk';

import asyncHandler from '../../../helpers/asyncHandlers';
import authentication from '../../../auth/index';
import TxRepo from '../../../repository/TxRepo';
import { BadRequestResponse, SuccessResponse } from '../../../core/ApiResponse';

const router = express.Router();

router.use('/', authentication);

// TODO! Add checker for input validations
router.get('/DAI',
  asyncHandler(async (req: Request, res: Response) => {
    let offset = 100;
    const page = req.query.page as string;

    if (req.query.offset) {
      offset = parseInt(req.query.offset as string);
    }

    if (offset === NaN) {
      return new BadRequestResponse().send(res);
    }

    const txs = await TxRepo.getDaiTxs(offset, page);

    return new SuccessResponse('success', txs).send(res);
  }),
);

// TODO! Add middleware for input validations
router.get('/',
  asyncHandler(async (req: Request, res: Response) => {
    const { from, to } = req.query;

    if (from && isHex(from as string)) {
      const txs = await TxRepo.getTxsFromSender(from as string);
      return new SuccessResponse('success', txs).send(res);
    }

    if (to && isHex(to as string)) {
      const txs = await TxRepo.getTxsFromReceipt(to as string);
      return new SuccessResponse('success', txs).send(res);
    }

    return new BadRequestResponse().send(res);
  }),
);

export default router;