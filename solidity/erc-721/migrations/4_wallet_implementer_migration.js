const WalletImplementer = artifacts.require("WalletImplementer");

module.exports = function (deployer) {
  deployer.deploy(WalletImplementer);
};
