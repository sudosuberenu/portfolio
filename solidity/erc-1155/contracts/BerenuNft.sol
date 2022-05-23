// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol";

contract BerenuNft {

  mapping(address => uint256) private _balances;
  mapping(uint256 => address) private _owners;
  mapping(uint256 => address) private _approvals;
  mapping(address => mapping(address => bool)) private _operatorApprovals;

  event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
  event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

  function mint(address to, uint256 tokenId) external {
    require(to != address(0), "Not possible to mint to zero address");
    require(_owners[tokenId] == address(0), "The token already exist");
    
    _owners[tokenId] = to;
    _balances[to] += 1;
  }

  function safeTransferFrom(address from, address to, uint256 tokenId) external {
    require(_isApprovedOrOwner(msg.sender, tokenId), "The caller is not owner nor approved");
    require(to.code.length > 0, "The to address is not an ERC-721 implementer");

    try IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, "") returns (bytes4 receiverSelector) {
      require(receiverSelector == IERC721Receiver.onERC721Received.selector, "The to address is not an ERC-721 implementer");
    } catch(bytes memory reason) {
      if (reason.length == 0) {
        revert("The to address is not an ERC-721 implementer");
      } else {
        // ??? check this
        assembly {
          revert(add(32, reason), mload(reason))
        }
      }
    }

    _transfer(from, to, tokenId);
  }

  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) external {
    require(_isApprovedOrOwner(msg.sender, tokenId), "The caller is not owner nor approved");
    require(to.code.length > 0, "The to address is not an ERC-721 implementer");

    try IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, "") returns (bytes4 receiverSelector) {
      require(receiverSelector == IERC721Receiver.onERC721Received.selector, "The to address is not an ERC-721 implementer");
    } catch(bytes memory reason) {
      if (reason.length == 0) {
        revert("The to address is not an ERC-721 implementer");
      } else {
        // ??? check this
        assembly {
          revert(add(32, reason), mload(reason))
        }
      }
    }

    _transfer(from, to, tokenId);
  }

  function approve(address to, uint256 tokenId) external {
    address sender = msg.sender;
    address owner = ownerOf(tokenId);

    require(sender == owner, "The caller does not own the tokenId");

    _approvals[tokenId] = to;

    emit Approval(owner, to, tokenId);
  }

  function setApprovalForAll(address operator, bool approved) external {
    address owner = msg.sender;

    _operatorApprovals[owner][operator] = approved;

    emit ApprovalForAll(owner, operator, approved);
  }

  function transferFrom(address from, address to, uint256 tokenId) external {
    require(msg.sender == ownerOf(tokenId), "The caller does not own the tokenId");

    _transfer(from, to, tokenId);
  }

  function balanceOf(address owner) external view returns (uint256) {
    return _balances[owner];
  }

  function ownerOf(uint256 tokenId) public view returns (address) {
    address owner = _owners[tokenId];
    require(owner != address(0), "TokenId is not owned by anyone");

    return owner;
  }

  function getApproved(uint256 tokenId) public view returns (address){
    return _approvals[tokenId];
  }

  function isApprovedForAll(address owner, address operator) public view returns (bool) {
    return _operatorApprovals[owner][operator];
  }

  function _transfer(address from, address to, uint256 tokenId) internal {
    _owners[tokenId] = to;
    _balances[from] -= 1;
    _balances[to] += 1;

    emit Transfer(from, to, tokenId);
  }

  function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool){
    address owner = ownerOf(tokenId);
    if (owner == spender || getApproved(tokenId) == spender || isApprovedForAll(owner, spender)) {
      return true;
    }

    return false;
  }
}