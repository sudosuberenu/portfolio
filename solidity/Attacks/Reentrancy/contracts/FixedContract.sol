// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

error EtherStore__InsufficientFunds();

/**@title A fix sample of Reentrancy Vulnerability
 * @author Belen Iniesta
 * @notice This contract design to avoid a Reentrancy Attack
 */
contract EtherStore {
  mapping(address => uint256) public balances;

  function deposit() external payable {
    balances[msg.sender] += msg.value;
  }

  function withdraw() external {
    uint256 userBalance = balances[msg.sender];

    if (userBalance == 0) {
      revert EtherStore__InsufficientFunds();
    }
    
    balances[msg.sender] = 0;
    
    (bool success,) = msg.sender.call{ value: userBalance }("");
    require(success);
  }
}