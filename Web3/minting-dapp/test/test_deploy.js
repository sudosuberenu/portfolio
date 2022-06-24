const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe('Berenu', () => {
  describe('Deployment', () => {
    it('Contract has been deployed successfully', async () => {
      const berenuContractFactory = await ethers.getContractFactory("Berenu");
      const berenuContract = await berenuContractFactory.deploy("BerenuNFT", "BRN");
      assert.ok(berenuContract);
    });
  });
});
