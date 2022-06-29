// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

error VulnerableContract__InsufficientFunds();

/**@title A sample of Reentrancy Vulnerability
 * @author Belen Iniesta
 * @notice This contract is to force the Reentrancy Attack
 */
contract VulnerableContract {

  mapping(address => uint256) public balances;

  function deposit() external payable {
    require(msg.value == 1 ether);
    balances[msg.sender] += msg.value;
  }

  function withdraw(uint256 amount) external {
    if (balances[msg.sender] > amount) {
      revert VulnerableContract__InsufficientFunds();
    }
    
    (bool success,) = msg.sender.call{value: amount}("");

    require(success, "Fail");
  
    balances[msg.sender] -= amount;
  }
}