// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;
import "hardhat/console.sol";

import "./IERC20.sol";

contract NewToken is IERC20 {

    string public name;

    string public symbol;

    uint8 public decimals = 18;

    uint public override totalSupply;

    address private owner;


    constructor(string memory _name, string memory _symbol, uint256 _amount) {

        owner = msg.sender;
        name = _name;
        symbol = _symbol;

        mint(_amount * (10 ** uint256(decimals)));
    }

    mapping(address => uint) public balance;

    mapping(address => uint) public override allowance;


    function balanceOf(address account) external view override returns (uint) {
        return balance[account];
    }

    function transfer(
        address to,
        uint amount
    ) external override returns (bool) {

        require(msg.sender == owner, "You are not admin");

        balance[msg.sender] -= amount;
        balance[to] += amount;

        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function approve(
        address whitelist
    ) external override returns (bool) {

        require(msg.sender == owner, "You are not admin");

        allowance[whitelist] = 1;
        emit Approval(msg.sender, whitelist, 1);

        return true;
    }

    function transferFrom(
        address spender,
        address to,
        uint endDate,
        uint amount
    ) external override returns (bool) {

        if(endDate > block.timestamp) {

            if(allowance[to] == 1) {
                
                balance[spender] -= amount;
                balance[to] += amount;
            }

            else {
                revert("You have to send to whitelisted address");
            }
        }

        if(endDate < block.timestamp) {

            balance[spender] -= amount;
            balance[to] += amount;
        }

        return true;
    }

    function mint(uint amount) internal {

        require(msg.sender == owner, "You are not admin");

        balance[msg.sender] += amount;
        totalSupply += amount;
    }

    function burn(uint amount) external {

        require(msg.sender == owner, "You are not admin");

        balance[msg.sender] -= amount;
        totalSupply -= amount;
    }

    function burnFrom(
        address spender,
        uint amount
    ) external override returns (bool) {

        require(msg.sender == owner, "You are not admin");
        balance[spender] -= amount;

        return true;
    }
}
