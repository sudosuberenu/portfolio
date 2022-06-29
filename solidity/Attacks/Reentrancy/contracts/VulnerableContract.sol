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
    balances[msg.sender] += msg.value;
  }

  function withdraw() external {
    uint256 userBalance = balances[msg.sender];

    if (userBalance <= 0) {
      revert VulnerableContract__InsufficientFunds();
    }
    
    (bool success,) = msg.sender.call{ value: userBalance }("");
    require(success);
    
    balances[msg.sender] = 0;
  }
}