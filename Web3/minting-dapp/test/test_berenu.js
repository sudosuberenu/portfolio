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

    it("When trying to mint more than the maxSupply then throw an error", async () => {
      const value = ethers.utils.parseEther("0.1");

      await berenuContract.mint({ value });
      await berenuContract.mint({ value });
      await berenuContract.mint({ value });
      await berenuContract.mint({ value });
      await berenuContract.mint({ value });

      await expect(berenuContract.mint({ value })).to.be.revertedWith("All the NFT's have been already minted");
    });

    it("When trying to mint with a different value then throw an error", async () => {
      const value = ethers.utils.parseEther("0.01");

      await expect(berenuContract.mint({ value })).to.be.revertedWith("Error, you should send 0.1 Ether");
    });
  });

  describe('walletOfOwner', () => {
    let berenuContract;

    beforeEach(async () => {
      const berenuContractFactory = await ethers.getContractFactory("Berenu");
      berenuContract = await berenuContractFactory.deploy("Berenu", "BRN");
    });

    it("When an owner is given then return his tokenIds", async () => {
      const [currentOwnerExpectedAfter] = await ethers.getSigners();
      const value = ethers.utils.parseEther("0.1");
      const tokenIdsExpected = [1,2];

      await berenuContract.mint({ value });
      await berenuContract.mint({ value });

      const tokenIds = await berenuContract.walletOfOwner(currentOwnerExpectedAfter.address);

      expect(tokenIds).to.deep.equal(tokenIdsExpected);
    });
  });
});