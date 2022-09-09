import express from 'express';
import job from './job/index';
import tx from './tx/index';
import address from './address/index';

const router = express.Router();

router.use('/job', job);
router.use('/tx', tx);
router.use('/address', address);

export default router;