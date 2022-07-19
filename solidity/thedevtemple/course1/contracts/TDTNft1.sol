// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Whitelist.sol";

// TDTNft1.sol
contract TDTNft1 is ERC721URIStorage, Whitelist {
  string public constant TOKEN_URI =
        "ipfs://QmSfXqEBGydx2Fxn9MGrPXnAwap7vEQYknoY3A8Fb5xoET";
  uint256 private s_counter;

  constructor() ERC721("The Dev Temple NFT - Course 1 - Faucet", "TDT") {
    s_counter = 0;
  }

  function mintNft() external onlyWhitelisted {
    _mint(msg.sender, s_counter);
    s_counter += 1;
  }

  function tokenURI(
    uint256 /* tokenId */
  ) public view override returns (string memory) {
    return TOKEN_URI;
  }

  function getTokenCounter() external view returns (uint256) {
    return s_counter;
  }

}