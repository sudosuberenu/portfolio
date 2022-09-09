import express from 'express';
import {authApiKey} from '../config';
import { AuthFailureError } from '../core/ApiError';
import asyncHandler from '../helpers/asyncHandlers';

const router = express.Router();

export default router.use(
  asyncHandler(async (req: express.Request, _res, next) => {
    const apiKey = req.header('x-api-key');

    const isValid = (apiKey === authApiKey);

    if (!isValid) {
      throw new AuthFailureError();
    }

    return next();
  }),
);