import { Contract } from 'ethers';

import BerenuABI from '../artifacts/contracts/Berenu.sol/Berenu.json';

const SC_BERENU_ADDRESS = process.env.SC_BERENU_ADDRESS || "";
const NFT_ABI = BerenuABI.abi;

export const getContract = async function(provider) {
  if (provider) {
    const contract = new Contract(SC_BERENU_ADDRESS, NFT_ABI, provider.getSigner());
    const contractDeployed = await contract.deployed();
    return contractDeployed;
  }
}