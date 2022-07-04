// require("@nomiclabs/hardhat-waffle")
require("@nomicfoundation/hardhat-chai-matchers")
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");
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
  },
  namedAccounts: {
    deployer: {
      default: 0
    },
    player: {
      default: 1,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
}