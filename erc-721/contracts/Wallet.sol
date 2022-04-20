// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "./BerenuNft.sol";

contract Wallet {

  address private _berenuNft;

  function setBerenuNft(address berenuNft) external {
    _berenuNft = berenuNft;
  }

  function safeTransferFrom(address from, address to, uint256 tokenId) external {
    BerenuNft(_berenuNft).safeTransferFrom(from, to, tokenId);
  }
}