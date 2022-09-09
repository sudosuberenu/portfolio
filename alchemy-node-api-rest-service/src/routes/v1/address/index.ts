import express from 'express';
import { isHex } from 'alchemy-sdk';

import asyncHandler from '../../../helpers/asyncHandlers';
import AddressRepo from '../../../repository/AddressRepo';
import { SuccessResponse } from '../../../core/ApiResponse';
import authentication from '../../../auth/index';
import { BadRequestResponse } from '../../../core/ApiResponse';

const router = express.Router();

router.use('/', authentication);

router.get('/:address/balance',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const address = req.params.address;

    if (!isHex(address) || address.length !== 42) {
      return new BadRequestResponse().send(res);
    }

    const balance = await AddressRepo.getDAIBalance(address);

    return new SuccessResponse('success', {DAIbalance: balance}).send(res);
  })
);

export default router;