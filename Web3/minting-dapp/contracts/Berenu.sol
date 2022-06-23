// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Berenu is ERC721Enumerable, Ownable {
  
  uint256 public currentSupply;
  string public baseURI;

  uint256 public immutable price = 0.1 ether;
  uint256 public immutable maxSupply = 5;
  
  constructor(string memory _name, string memory _symbol) ERC721 (_name, _symbol) {
    currentSupply = 0;
  }

  function mint() external payable {
    require(ERC721Enumerable.totalSupply() < maxSupply, "All the NFT's have been already minted");
    require(msg.value == price, "Error, you should send 0.1 Ether");

    currentSupply += 1;

    _mint(msg.sender, currentSupply);
  }

  function walletOfOwner(address owner) external view returns (uint256[] memory) {
    uint256 tokenCount = balanceOf(owner);

    uint256[] memory tokensId = new uint256[](tokenCount);
    
    for (uint256 i = 0; i < tokenCount; i++) {
      tokensId[i] = tokenOfOwnerByIndex(owner, i);
    }

    return tokensId;
  }
}