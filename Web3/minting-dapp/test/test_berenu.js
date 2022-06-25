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

  describe('mint', () => {
    let berenuContract;

    beforeEach(async () => {
      const berenuContractFactory = await ethers.getContractFactory("Berenu");
      berenuContract = await berenuContractFactory.deploy("Berenu", "BRN");
    });

    it(`When correct mint then currentSupply is incremented by one, the owner of the token is the sender
    and the balance is incremented`, async () => {
      const currentSupplyBeforeExpected = 0;
      const currentSupplyAfterExpected = 1;
      const [currentOwnerExpectedAfter] = await ethers.getSigners();
      const currentBalanceExpectedAfter = ethers.utils.parseEther("0.1");
      const currentBalanceExpectedBefore = ethers.utils.parseEther("0");

      const currentSupplyBefore = await berenuContract.totalSupply();
      const currentBalanceBefore = await berenuContract.provider.getBalance(berenuContract.address);
      await expect(berenuContract.ownerOf(1)).to.be.revertedWith("ERC721: owner query for nonexistent token");

      await berenuContract.mint({ value: currentBalanceExpectedAfter });

      const currentSupplyAfter = await berenuContract.totalSupply();
      const currentOwnerAfter = await berenuContract.ownerOf(1);
      const currentBalanceAfter = await berenuContract.provider.getBalance(berenuContract.address);

      expect(currentSupplyBefore).to.equal(currentSupplyBeforeExpected);
      expect(currentSupplyAfter).to.equal(currentSupplyAfterExpected);

      expect(currentOwnerAfter).to.equal(currentOwnerExpectedAfter.address);
      
      expect(currentBalanceBefore).to.equal(currentBalanceExpectedBefore);
      expect(currentBalanceAfter).to.equal(currentBalanceExpectedAfter);
    });
  });
});