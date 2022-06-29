const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe('Reentrancy Vulnerability', () => {
  it("Attacker call withdraw with the vulnerabilty", async () => {
    const [ attackerAccount, victimAccount1, victimAccount2 ] = await ethers.getSigners();

    // STEP 1. Setup the contracts
    const vulnerableContractFactory = await ethers.getContractFactory("VulnerableContract");
    const vulnerableContract = await vulnerableContractFactory.deploy();

    const attackerContractFactory = await ethers.getContractFactory("Attacker");
    const attackerContract = await attackerContractFactory.deploy(vulnerableContract.address);

    // STEP 2. The victims deposit Ethers in the vulnerable account
    let vulnerableContractConnected = await vulnerableContract.connect(victimAccount1);
    await vulnerableContractConnected.deposit({value: ethers.utils.parseEther("1")});
    vulnerableContractConnected = await vulnerableContract.connect(victimAccount2);
    await vulnerableContractConnected.deposit({value: ethers.utils.parseEther("1")});
    
    // STEP 3. Get the current balance from the Attacker and the Vulnerable SC
    const previousBalanceAttacker = await attackerAccount.provider.getBalance(attackerAccount.address);
    const previousBalanceVunerableSC = await vulnerableContract.provider.getBalance(vulnerableContract.address);

    // // STEP 4. Attack
    const attackerContractConnected = await attackerContract.connect(attackerAccount);
    // const tx = await attackerContractConnected.attack({value: ethers.utils.parseEther("1")});
    await expect(attackerContractConnected.attack({value: ethers.utils.parseEther("1")})).to.be.revertedWith("Fail");
    // await attackerContractConnected.collect();

    // // STEP 5. Get the current balance from the Attacker and the Vulnerable SC
    const currentBalanceAttacker = await attackerAccount.provider.getBalance(attackerAccount.address);
    const currentBalanceVunerableSC = await vulnerableContract.provider.getBalance(vulnerableContract.address);


    console.log(previousBalanceAttacker, currentBalanceAttacker)
    console.log(previousBalanceVunerableSC, currentBalanceVunerableSC)
    // expect(previousBalanceAttacker).to.be.equal(currentBalanceAttacker);
  });
});