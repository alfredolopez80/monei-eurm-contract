// SPDX-License-Identifier: MIT

/// @title EURM Token V1 / Polygon v1
/// @author Alfredo Lopez / MONEI EURM 2022.1 */

pragma solidity 0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./Blacklistable.sol";

/**
 * @title Circulating Supply Methods
 * @dev Allows update the wallets of EURM Foundation by Owner
 */
contract CirculatingSupply is OwnableUpgradeable, Blacklistable {
	// Array of address
    address[] internal eurm_wallets;

    event InEurmWallet(address indexed _account);
    event OutEurmWallet(address indexed _account);

	/**
     * @dev function to verify if the address exist in EurmWallet or not
     * @param _account The address to check
     */
	function isEurmWallet(address _account) public view returns (bool) {
		if (_account == address(0)) {
			return false;
		}
		uint256 index = eurm_wallets.length;
		for (uint256 i=0; i < index ; i++ ) {
			if (_account == eurm_wallets[i]) {
				return true;			}
		}
		return false;
	}

	/**
     * @dev Include the wallet in the wallets address of EURM Foundation Wallets
     * @param _account The address to include
     */
	function addEurmWallet(address _account) public validAddress(_account) onlyOwner() returns (bool) {
		require(!isEurmWallet(_account), "ERC20 EURM: wallet is already");
		eurm_wallets.push(_account);
		emit InEurmWallet(_account);
		return true;
	}

	/**
     * @dev Exclude the wallet in the wallets address of EURM Foundation Wallets
     * @param _account The address to exclude
     */
	function dropEurmWallet(address _account) public validAddress(_account) onlyOwner() returns (bool) {
		require(isEurmWallet(_account), "ERC20 EURM: Wallet don't exist");
		uint256 index = eurm_wallets.length;
		for (uint256 i=0; i < index ; i++ ) {
			if (_account == eurm_wallets[i]) {
				eurm_wallets[i] = eurm_wallets[index - 1];
				eurm_wallets.pop();
				emit OutEurmWallet(_account);
				return true;
			}
		}
		return false;
	}

	/**
     * @dev Getting the all wallets address of EURM Foundation Wallets
     */
	function getEurmWallets() public view returns (address[] memory) {
		return eurm_wallets;
	}

}
