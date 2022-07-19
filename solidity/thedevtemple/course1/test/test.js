const { ethers } = require("hardhat");
const { expect } = require("chai");

describe('The Dev Template NFT - Course 1 - Faucet', () => {
  it("When a user that is not the owner add a address to whitelist then throw error", async () => {
    const [ , student1 ] = await ethers.getSigners();

    // Setup
    const contractFactory = await ethers.getContractFactory("TDTNft1");
    const contract = await contractFactory.deploy();

    // Action and assert
    await expect(contract
      .connect(student1)
      .addAddressToWhitelist(student1.address)).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("When owner add a new user to whitelist then success", async () => {
    const [ , student1 ] = await ethers.getSigners();

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
    const [ , student1 ] = await ethers.getSigners();

    // Setup
    const contractFactory = await ethers.getContractFactory("TDTNft1");
    const contract = await contractFactory.deploy();
    await contract.addAddressToWhitelist(student1.address);
    const balanceBefore = await contract.balanceOf(student1.address);

    // Action
    await contract
      .connect(student1)
      .mintNft();
    
    const counter = await contract.getTokenCounter();
    const balanceAfter = await contract.balanceOf(student1.address);

    
    // Asserts
    expect(counter).to.be.equal(1);
    expect(balanceBefore).to.be.equal(0);
    expect(balanceAfter).to.be.equal(1);
  });

  it("A student not in the whitelist cannot mint", async () => {
    const [ , student1 ] = await ethers.getSigners();

    // Setup
    const contractFactory = await ethers.getContractFactory("TDTNft1");
    const contract = await contractFactory.deploy();

    // Action and assert
    await expect(contract
       .connect(student1)
       .mintNft()).to.be.revertedWithoutReason();
    
    const result = await contract.whitelist(student1.address);
    expect(result).to.be.equal(false);
  });

  it("When owner add a multiple users to whitelist then can mint", async () => {
    const [ , student1, student2, student3 ] = await ethers.getSigners();

    // Setup
    const contractFactory = await ethers.getContractFactory("TDTNft1");
    const contract = await contractFactory.deploy();
    const resultBefore = await contract.whitelist(student1.address);

    // Action
    await contract.addAddressesToWhitelist([student1.address, student2.address, student3.address]);
    
    const result1 = await contract.whitelist(student1.address);
    const result2 = await contract.whitelist(student2.address);
    const result3 = await contract.whitelist(student3.address);

    const balance1Before = await contract.balanceOf(student1.address);
    const balance2Before = await contract.balanceOf(student2.address);
    const balance3Before = await contract.balanceOf(student3.address);

    await contract.connect(student1).mintNft();
    await contract.connect(student2).mintNft();
    await contract.connect(student3).mintNft();

    const balance1After = await contract.balanceOf(student1.address);
    const balance2After = await contract.balanceOf(student2.address);
    const balance3After = await contract.balanceOf(student3.address);

    const counter = await contract.getTokenCounter();

    // Assert
    expect(resultBefore).to.be.equal(false);
    
    expect(result1).to.be.true;
    expect(result2).to.be.true;
    expect(result3).to.be.true;

    expect(balance1Before).to.be.equal(0);
    expect(balance2Before).to.be.equal(0);
    expect(balance3Before).to.be.equal(0);

    expect(balance1After).to.be.equal(1);
    expect(balance2After).to.be.equal(1);
    expect(balance3After).to.be.equal(1);

    expect(counter).to.be.equal(3);
  });
});