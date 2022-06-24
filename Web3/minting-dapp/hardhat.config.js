// require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter");
// require("./tasks/block-number")
// require("@nomiclabs/hardhat-etherscan")
// require("dotenv").config()
require("solidity-coverage");

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
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
}