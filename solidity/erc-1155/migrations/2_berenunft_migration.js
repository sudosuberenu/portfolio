const BerenuNft = artifacts.require("BerenuNft");

module.exports = function (deployer) {
  deployer.deploy(BerenuNft);
};
