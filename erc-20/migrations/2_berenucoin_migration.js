const BerenuCoin = artifacts.require("BerenuCoin");

module.exports = function (deployer) {
  deployer.deploy(BerenuCoin, 'BerenuCoin', 'BNC');
};