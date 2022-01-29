// SPDX-License-Identifier: ISC

/// @title EURM Token V1 / Polygon v1
/// @author Alfredo Lopez / MONEI EURM 2022.1 */

pragma solidity 0.8.4;

//** remove previous contract and create standard ERC20 contract */
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "../lib/Claimable.sol";

contract ERC20 is OwnableUpgradeable, ERC20Upgradeable, PausableUpgradeable, Claimable {
	using SafeMathUpgradeable for uint256;
	// Max Total Supply 100 billion
	uint256 private constant _maxTotalSupply = 100_000_000_000_000 * (uint256(10) ** uint256(18));
    function initialize() initializer public {
        __ERC20_init("EURM Token", "EURM");
		__Ownable_init();

		//mint all Token
		mint(_maxTotalSupply);
    }

	/**
     * @dev This Method permit getting Maximun total Supply .
     * See {ERC20-_burn}.
     */
	function getMaxTotalSupply() public pure returns (uint256) {
		return _maxTotalSupply;
	}

	/**
     * @dev Implementation / Instance of paused methods() in the ERC20.
     * @param status Setting the status boolean (True for paused, or False for unpaused)
     * See {ERC20Pausable}.
     */
    function pause(bool status) public onlyOwner() {
        if (status) {
            _pause();
        } else {
            _unpause();
        }
    }

	/**
     * @dev Circulating Supply Method for Calculated based on Wallets of EURM Foundation
     */
	function circulatingSupply() public view returns (uint256 result) {
		result = totalSupply().sub(balanceOf(owner()));
		for (uint256 i=0; i < eurm_wallets.length ; i++ ) {
			if ((eurm_wallets[i] != address(0)) && (result != 0)) {
				result -= balanceOf(eurm_wallets[i]);
			}
		}
	}
	/**
     * @dev Destroys `amount` tokens from the caller.
     * @param amount Amount token to burn
     * See {ERC20-_burn}.
     */
    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }

	/**
     * @dev Creates `amount` new tokens for `to`.
	 * @param _amount Amount Token to mint
     *
     * See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `OWNER`.
		 * - After upgrade the SmartContract and Eliminate this method
     */
    function mint( uint256 _amount) public onlyOwner() {
		require(getMaxTotalSupply() >= totalSupply().add(_amount), "ERC20: Can't Mint, it exceeds the maximum supply ");
        _mint(owner(), _amount);
    }

	function _beforeTokenTransfer(address sender, address recipient, uint256 amount) internal virtual override notBlacklisted(sender) {
		require(!isBlacklisted(recipient), "ERC20 EURM: recipient account is blacklisted");
		// Permit the Owner execute token transfer/mint/burn while paused contract
		if (_msgSender() != owner()) {
			require(!paused(), "ERC20 EURM: token transfer/mint/burn while paused");
		}
        super._beforeTokenTransfer(sender, recipient, amount);
    }
}
