// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Whitelist.sol";

/// @author @sudosuberenu
/// @title Course 1 - Faucet - Soulbound NFT
contract TDTNft1 is ERC721URIStorage, Whitelist {
  string public constant TOKEN_URI =
        "ipfs://QmRzZrY18rhnitJCZmLnUGTPs98f9KHmq55R4QArZXCJAa";
  uint256 private s_counter;

  constructor() ERC721("The Dev Temple NFT - Course 1 - Faucet", "TDTF") {
    s_counter = 0;
  }

  /* Mint an NFT and increses the NFT counter.
     @dev Assign a new NFT to the msg.sender and `s_counter` increases by 1*/
  function mintNft() external onlyWhitelisted {
    _mint(msg.sender, s_counter);
    s_counter += 1;
  }

  /* Return the stored NFT counter.
     @dev retrieves the value of the state variable `s_counter`
     @return the stored value */
  function getTokenCounter() external view returns (uint256) {
    return s_counter;
  }

  /* Return the Uri of the NFT.
     @param tokenId the value of the NFT (not used)
     @dev retrieves the value of the constant `TOKEN_URI`
     @return the stored value */
  function tokenURI(
    uint256 /* tokenId */
  ) public view override returns (string memory) {
    return TOKEN_URI;
  }
}