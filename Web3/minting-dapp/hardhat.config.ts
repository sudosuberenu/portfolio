import { accounts, node_url } from './utils/network';
import 'dotenv/config';
import "hardhat-deploy";
import "@nomicfoundation/hardhat-chai-matchers"
import "hardhat-gas-reporter";
import "solidity-coverage";
// require("@nomiclabs/hardhat-etherscan");

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";

module.exports = {
  solidity: "0.8.15",
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
    }
  },
  namedAccounts: {
    deployer: 0
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
}