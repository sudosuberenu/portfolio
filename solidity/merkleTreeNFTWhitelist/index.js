import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

const addresses = [
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
  "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"
]

const leaves = addresses.map(address => keccak256(address));

const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true});

const rootHash = merkleTree.getRoot().toString('hex');

// Prove 
const address = "0xdD870fA1b7C4700F2BD7f44238821C26f7392148";
const hashedAddress = keccak256(address);
const proof = merkleTree.getHexProof(hashedAddress);
console.log(proof);

const result = merkleTree.verify(proof, hashedAddress, rootHash);
console.log(result)