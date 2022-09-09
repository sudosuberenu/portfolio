import { Network } from 'alchemy-sdk';

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const corsUrl = process.env.CORS_URL;
export const logDirectory = process.env.LOG_DIR;

export const authApiKey = process.env.AUTH_API_KEY;

export const alchemySettings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const daiContract = process.env.DAI_CONTRACT || "";