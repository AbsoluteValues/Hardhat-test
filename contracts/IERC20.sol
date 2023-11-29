// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

interface IERC20 {

    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address to, uint amount) external returns (bool);

    function allowance(address whitelist) external returns (uint);

    function approve(address whitelist) external returns (bool);

    function transferFrom(address spender, address to, uint endDate, uint amount) external returns (bool);

    function burnFrom(address spender, uint amount) external returns (bool);

    event Transfer(address from, address to, uint value);

    event Approval(address owner, address spender, uint value);
}
