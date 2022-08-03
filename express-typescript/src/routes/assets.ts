import express from 'express'
import { AssetsService } from '../services/assetsService';

const router = express.Router()
const assetsService = new AssetsService();

router.get('/:id/pools', async (req, res) => {
  const assetId = req.params.id
  const pools = await assetsService.getPoolsFromAssetId(assetId)
  
  return pools 
    ? res.send(pools)
    : res.sendStatus(404)
})

router.get('/:id/volume', async (req, res) => {
  const assetId = req.params.id
  const volume = await assetsService.getVolumeFromAssetIdWithRangeTime(assetId);
  
  return volume
    ? res.send(volume)
    : res.sendStatus(404)
})

export default router
