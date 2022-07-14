const { ethers } = require("hardhat");
const { expect } = require("chai");

describe('The Dev Template NFT - Course 1 - Faucet', () => {
  it("When a user that is not the owner add a address to whitelist then throw error", async () => {
    const [ owner, student1 ] = await ethers.getSigners();

    // Setup
    const contractFactory = await ethers.getContractFactory("TDTNft1");
    const contract = await contractFactory.deploy();

    // Action and assert
    await expect(contract
      .connect(student1)
      .addAddressToWhitelist(student1.address)).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("When owner add a new user to whitelist then success", async () => {
    const [ owner, student1 ] = await ethers.getSigners();

    // Setup
    const contractFactory = await ethers.getContractFactory("TDTNft1");
    const contract = await contractFactory.deploy();
    const resultBefore = await contract.whitelist(student1.address);

    // Action
    await contract.addAddressToWhitelist(student1.address);

    // Assert
    const resultAfter = await contract.whitelist(student1.address);

    expect(resultBefore).to.be.equal(false);
    expect(resultAfter).to.be.equal(true);
  });

  it("A student in the whitelist can mint", async () => {
    const [ owner, student1 ] = await ethers.getSigners();

    // Setup
    const contractFactory = await ethers.getContractFactory("TDTNft1");
    const contract = await contractFactory.deploy();
    await contract.addAddressToWhitelist(student1.address);

    // Action
    await contract
      .connect(student1)
      .mintNft();
    
    const counter = await contract.getTokenCounter();
    
    // Asserts
    expect(counter).to.be.equal(1);
  });

  it("A student not in the whitelist cannot mint", async () => {
    const [ owner, student1 ] = await ethers.getSigners();

    // Setup
    const contractFactory = await ethers.getContractFactory("TDTNft1");
    const contract = await contractFactory.deploy();

    // Action and assert
    await expect(contract
      .connect(student1)
      .mintNft()).to.be.revertedWith("Transaction reverted without a reason string");
  });
});