// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract BerenuCoin {

  string private _name;
  string private _symbol;
  
  uint8 private _decimals = 18;
  uint256 private _totalSupply;

  mapping(address => uint256) private _balances;
  mapping(address => mapping(address => uint256)) private _allowances;

  event Transfer(address indexed sender, address indexed receiver, uint256 amount);
  event Approval(address indexed sender, address indexed spender, uint256 amount);

  constructor(string memory name_, string memory symbol_) {
    _name = name_;
    _symbol = symbol_;
    _totalSupply = 1000;
    _balances[0x627306090abaB3A6e1400e9345bC60c78a8BEf57] = _totalSupply;
  }

  function approve(address spender, uint256 amount) external returns(bool) {
    address sender = msg.sender;
    require(sender != spender, 'The sender and the spender cannot be the same address');

    _allowances[sender][spender] = amount;

    emit Approval(sender, spender, amount);
    
    return false;
  }

  function transferFrom(address sender, address receiver, uint256 amount) external returns(bool) {
    address spender = msg.sender;
    uint256 allowanceAmount = _allowances[sender][spender];

    require(allowanceAmount > 0, "The allowance address has not permission to send the tokens");
    require(allowanceAmount >= amount, "The allowance is smaller than the amount");

    _allowances[sender][spender] = allowanceAmount - amount;

    _transfer(sender, receiver, amount);

    return true;
  }

  function name() external view returns(string memory) {
    return _name;
  }

  function symbol() external view returns(string memory) {
    return _symbol;
  }

  function decimals() external view returns(uint8) {
    return _decimals;
  }

  function totalSupply() external view returns(uint256) {
    return _totalSupply;
  }

  function balanceOf(address owner) external view returns(uint256) {
    return _balances[owner];
  }

  function allowance(address sender, address spender) external view returns(uint256) {
    return _allowances[sender][spender];
  }

  function transfer(address receiver, uint256 amount) public returns(bool) {
    address sender = msg.sender;
    uint256 senderBalance = _balances[sender];

    require(senderBalance >= amount, "The amount of tokens exceeds from the sender balance");
    require(receiver != sender, "The sender address and the receiver address must be different");
    
    _transfer(sender, receiver, amount);

    return true;
  }

  function _transfer(address sender, address receiver, uint256 amount) private returns(bool) {
    _balances[sender] -= amount;
    _balances[receiver] += amount;

    emit Transfer(sender, receiver, amount);

    return true;
  }
}