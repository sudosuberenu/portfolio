import Web3 from 'web3';
import { InjectedConnector } from '@web3-react/injected-connector';
import Contract from 'web3-eth-contract';


const ETHEREUM_MAINNET_NETWORK_ID = 1;
const ETHEREUM_LOCAHOST_NETWORK_ID = 1337;

export const connector = new InjectedConnector({
  supportedChainIds: [ETHEREUM_MAINNET_NETWORK_ID, ETHEREUM_LOCAHOST_NETWORK_ID]
});

export const getLibrary = function(provider) {
  const library = new Web3(provider);
  return library;
};

export const getSigner = function(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export const getProviderOrSigner = function(library, account,) {
  return account ? getSigner(library, account) : library;
}    

export const getContract = function(address, ABI, library, account) {
  return new Contract(ABI, address, getProviderOrSigner(library, account));
}