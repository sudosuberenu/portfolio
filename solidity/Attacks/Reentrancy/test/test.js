const { ethers } = require("hardhat");
const { expect } = require("chai");

describe('Reentrancy Vulnerability', () => {
  it("Attacker call withdraw with the vulnerabilty and steal all the SC balance", async () => {
    const [ attackerAccount, victimAccount1, victimAccount2 ] = await ethers.getSigners();

    // STEP 1. Setup the contracts
    const vulnerableContractFactory = await ethers.getContractFactory("VulnerableContract");
    const vulnerableContract = await vulnerableContractFactory.deploy();

    const attackerContractFactory = await ethers.getContractFactory("Attacker");
    const attackerContract = await attackerContractFactory.deploy(vulnerableContract.address);

    // STEP 2. The victims deposit Ethers in the vulnerable account
    let vulnerableContractConnected = await vulnerableContract
      .connect(victimAccount1)
      .deposit({value: ethers.utils.parseEther("1")});
    vulnerableContractConnected = await vulnerableContract
      .connect(victimAccount2)
      .deposit({value: ethers.utils.parseEther("1")});
    
    // STEP 3. Get the current balance from the Vulnerable SC
    const previousBalanceVunerableSC = await vulnerableContract.provider.getBalance(vulnerableContract.address);

    // STEP 4. Attack
    const attackerContractConnected = await attackerContract.connect(attackerAccount);
    await attackerContractConnected.attack({value: ethers.utils.parseEther("1")});
    await attackerContractConnected.collect();

    // STEP 5. Get the current balance from the Attacker and the Vulnerable SC
    const currentBalanceAttacker = await attackerAccount.provider.getBalance(attackerAccount.address);
    const currentBalanceVunerableSC = await vulnerableContract.provider.getBalance(vulnerableContract.address);

    expect(currentBalanceVunerableSC).to.be.equal(0);
    expect(currentBalanceVunerableSC).to.not.be.equal(previousBalanceVunerableSC);
    expect(currentBalanceAttacker).to.be.equal("10001998834765228949388");
  });

  it("Attacker call withdraw without the vulnerability and cannot steal all the sc balance", async () => {
    const [ attackerAccount, victimAccount1, victimAccount2 ] = await ethers.getSigners();

    // STEP 1. Setup the contracts
    const fixedContractFactory = await ethers.getContractFactory("EtherStore");
    const fixedContract = await fixedContractFactory.deploy();

    const attackerContractFactory = await ethers.getContractFactory("AttackerFixed");
    const attackerContract = await attackerContractFactory.deploy(fixedContract.address);

    // STEP 2. The victims deposit Ethers in the vulnerable account
    let fixedContractConnected = await fixedContract
      .connect(victimAccount1)
      .deposit({value: ethers.utils.parseEther("1")});
    fixedContractConnected = await fixedContract
      .connect(victimAccount2)
      .deposit({value: ethers.utils.parseEther("1")});

    // STEP 3. Attack
    const attackerContractConnected = await attackerContract.connect(attackerAccount);
    await expect(attackerContractConnected.attack({value: ethers.utils.parseEther("1")})).to.be.revertedWith("Transaction reverted without a reason string");
    await attackerContractConnected.collect();

    // STEP 4. Get the current balance from the Attacker and the Vulnerable SC
    const currentBalanceSC = await fixedContract.provider.getBalance(fixedContract.address);

    expect(currentBalanceSC).to.be.equal(ethers.utils.parseEther("2"));
  });
});