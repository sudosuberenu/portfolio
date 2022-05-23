// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

// import "openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol";
import "./BerenuNft.sol";


contract WalletImplementer {

  address private _berenuNft;

  function setBerenuNft(address berenuNft) external {
    _berenuNft = berenuNft;
  }

  function safeTransferFrom(address from, address to, uint256 tokenId) external {
    BerenuNft(_berenuNft).safeTransferFrom(from, to, tokenId);
  }
  
  function onERC721Received(address sender, address from, uint256 tokenId, bytes memory data) external returns (bytes4 selector) {
    return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
  }
}