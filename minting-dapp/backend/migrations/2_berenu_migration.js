const Berenu = artifacts.require("Berenu");

module.exports = function (deployer) {
  deployer.deploy(Berenu, 'Berenu NFT', 'BRN');
};
