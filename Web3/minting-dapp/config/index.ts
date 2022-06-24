import { Contract } from 'ethers';

import BerenuABI from '../build/contracts/Berenu.json';

const NFT_ADDRESS = "0x6D6Df90e428aE4Ea9BcD0287F3e0c68c09b364C2";
const NFT_ABI = BerenuABI.abi;

export const getContract = async function(provider) {
  if (provider) {
    const contract = new Contract(NFT_ADDRESS, NFT_ABI, provider.getSigner());
    const contractDeployed = await contract.deployed();
    return contractDeployed;
  }
}