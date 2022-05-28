import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';

import BerenuABI from '../abis/Berenu.json';

const ETHEREUM_MAINNET_NETWORK_ID = 1;
const ETHEREUM_LOCAHOST_NETWORK_ID = 1337;

const NFT_ADDRESS = "0x8e2Ba46B939bf3C5Ebb51B7C18f438AB3b0c5a38";
const NFT_ABI = BerenuABI.abi;

export const connector = new InjectedConnector({
  supportedChainIds: [ETHEREUM_MAINNET_NETWORK_ID, ETHEREUM_LOCAHOST_NETWORK_ID]
});

export const getLibrary = function(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export const getSigner = function(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export const getProviderOrSigner = function(library, account,) {
  return account ? getSigner(library, account) : library;
}

export const getContract = async function(library, account) {
  if (library) {
    const contract = new Contract(NFT_ADDRESS, NFT_ABI, getProviderOrSigner(library, account));
    const contractDeployed = await contract.deployed();
    return contractDeployed;
  }
}