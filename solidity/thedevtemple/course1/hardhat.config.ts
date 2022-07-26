import { accounts, node_url } from './utils/network';
import 'dotenv/config';
import "hardhat-deploy";
import "@nomicfoundation/hardhat-chai-matchers"
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

module.exports = {
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
    rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby')
    },
    matic: {
      url: "https://polygon-rpc.com/",
      accounts: [process.env.MNEMONIC_MUMBAI]
    }
  },
  namedAccounts: {
    deployer: 0
  },
  gasReporter: {
    enabled: true,
    token: 'MATIC',
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  etherscan: {
    // apiKey: {
    //   rinkeby: ETHERSCAN_API_KEY,
    //   mumbai: POLYGONSCAN_API_KEY,
    // }
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
}