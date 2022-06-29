// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

error EtherStore__InsufficientFunds();

/**@title A sample of Reentrancy Vulnerability
 * @author Belen Iniesta
 * @notice This contract is to force the Reentrancy Attack
 */
contract EtherStore {

  mapping(address => uint256) public balances;

  function deposit() external payable {
    balances[msg.sender] += msg.value;
  }

  function withdraw(uint256 amount) external {
    if (balances[msg.sender] >= amount) {
      revert EtherStore__InsufficientFunds();
    }
    
    (bool success,) = msg.sender.call{value: amount}("");

    require(success);
  
    balances[msg.sender] -= amount;
  }
}