// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitelist is Ownable {
  mapping(address => bool) public whitelist;
  
  event WhitelistedAddressAdded(address addr);
  event WhitelistedAddressRemoved(address addr);

  modifier onlyWhitelisted() {
    require(whitelist[msg.sender]);
    _;
  }

  function addAddressesToWhitelist(address[] memory addrs) onlyOwner external {
    for (uint256 i = 0; i < addrs.length; i++) {
      addAddressToWhitelist(addrs[i]);
    }
  }

  function removeAddressFromWhitelist(address addr) onlyOwner external {
    if (whitelist[addr]) {
      whitelist[addr] = false;
      emit WhitelistedAddressRemoved(addr);
    }
  }

  function addAddressToWhitelist(address addr) onlyOwner public {
    if (!whitelist[addr]) {
      whitelist[addr] = true;
      emit WhitelistedAddressAdded(addr);
    }
  }
}