pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

/**
 * @title TanganyTestToken
 * @dev Very simple ERC20 Token example, where all 10000 tokens are pre-assigned to the creator.
 */
contract Token is ERC20, ERC20Detailed, ERC20Burnable {
    // modify token name
    string public constant NAME = "EURM";
    // modify token symbol
    string public constant SYMBOL = "EURM";
    // modify token decimals
    uint8 public constant DECIMALS = 2;
    // modify initial token supply
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(DECIMALS)); // 10000 tokens

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor () public ERC20Detailed(NAME, SYMBOL, DECIMALS) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
