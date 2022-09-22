// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MyNFT {
  bytes32 public root = 0x53c4e5e25bcbb26b82784b9793d8a74a02719aabab34c2d0358b26231e2f4bbe;

  function checkValidity(bytes32[] calldata _merkleProof) public view returns (bool) {
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(MerkleProof.verify(_merkleProof, root, leaf), "Incorrect proof");
    return true;
  }
}