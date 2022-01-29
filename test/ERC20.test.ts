import { ethers, upgrades } from 'hardhat';
import { BigNumber, Signer } from "ethers";
import  { expect, assert } from "chai";
import { skipBlocks } from '../utils/helpers';

describe("ERC20 Full Test except Vesting", async () => {

	let accounts: Signer[]

	beforeEach(async () => {
		accounts = await ethers.getSigners();
		// console.log("Get TimeStamp:", Math.floor((await ethers.provider.getBlock("latest")).timestamp));
	});

	//   ** Function Total Supply, Balance of, Name, Symbol, Decimals */
	//   ** 1. Test Initial Value of Smart Contract : How it is working - Test Case */
	//   ** t1. Getting Total Supply Value and verify is the same  Max Total Supply*/
	//   ** t2. Getting Balance of Owner Accounts Value and verify is the same  Max Total Supply */
	//   ** t3. Getting Name Value*/
	//   ** t4. Getting Symbol Value*/
	//   ** t5. Getting Decimals Value*/


	it("1. Should return the Total Supply, Balance of the Owner, Name, Symbol and Decimals", async () => {
		const EurmToken = await ethers.getContractFactory("ERC20");
		const eurmToken = await upgrades.deployProxy(EurmToken);

		// verify the Address
		console.log("EURM Token deployed to:", eurmToken.address);
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000000000');
		console.log("Total Supply: ", (await eurmToken.totalSupply()).toString(), "must be 638 million!!! in wei");
		expect(((await eurmToken.totalSupply()).toString())).to.be.equal('100000000000000000000000000000000');
		describe(' Basic Value', async () => {
			it("1.1.- Verify the Name of the Token", async () => {
				console.log("Name of The Token: ", (await eurmToken.name()).toString(), "=====> must be EURMODROME");
				expect(((await eurmToken.name()).toString())).to.be.equal('EURM Token');
			});
			it("1.2.- Verify the Tiker of the Token", async () => {
				console.log("Name of The Token: ", (await eurmToken.symbol()).toString(), "====> must be EURM");
				expect(((await eurmToken.symbol()).toString())).to.be.equal('EURM');
			});
			it("1.3.- Verify the Decimals of the Token", async () => {
				console.log("Name of The Token: ", (await eurmToken.decimals()), "=====> must be 18");
				expect((await eurmToken.decimals())).to.be.equal(18);
			});
		});
	});

	//   ** Function owner(), transferOwnership(), renounceOwnership() */
	//   ** 2. Test OwnerShip Functions of Smart Contract : How it is working - Test Case */
	//   ** t1. Getting Current Owner */
	//   ** t2. Setting Transfer OwnerShip */
	//   ** t3. Setting Renounce OwnerShip */
	//   ** t4. Verify Smart Contract Don't Have any Owner */

	it("2. Should be Setting and Getting the OwnerShip of the Smart Contract", async () => {
		const EurmToken = await ethers.getContractFactory("ERC20");
		const eurmToken = await upgrades.deployProxy(EurmToken);

		// verify the Address
		console.log("EURM Token deployed to:", eurmToken.address);
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000000000');
		console.log("Total Supply: ", (await eurmToken.totalSupply()).toString(), "must be 638 million!!! in wei");
		expect(((await eurmToken.totalSupply()).toString())).to.be.equal('100000000000000000000000000000000');

		describe('Verify All Main Method involve in OwnerShip', async () => {
			it('2.1.- Getting the Owner of the Contract:', async () => {
				console.log("Owner of th Smart Contract:", (await eurmToken.owner()).toString());
				expect(await eurmToken.owner()).to.equal(await accounts[0].getAddress());
			});
			it('2.2.- Transfer OwnerShip from Accounts[0] to Accounts[1]', async () => {
				await eurmToken.transferOwnership(await accounts[1].getAddress());
				console.log("New OwnerShip of th Smart Contract:", (await eurmToken.owner()).toString());
			});
			it('2.3.- Renounce OwnerShip of the Smart Contract', async () => {
				await eurmToken.connect(accounts[1]).renounceOwnership();
				console.log("Renounce Ownership of the Smart Contract:", (await eurmToken.owner()).toString());
				expect(await eurmToken.owner()).to.equal('0x0000000000000000000000000000000000000000');
			});
		});
	});

	//   ** Function / Methods Balanceof, Transfer, TransferFrom, Approve, IncreaseAllowance, DecreaseAllowance */
	//   ** 3. Test Basic Method of Smart Contract : How it is working - Test Case */
	//   ** t1. Getting Total Supply Value and verify is the same  Max Total Supply*/
	//   ** t2. Getting Balance of ANY Accounts Value and verify is the same EXPECT VALUE */
	//   ** t3. Testing Workflow Transfer*/
	//   ** t4. Testing Workflow TransferFrom*/
	//   ** t5. Testing Workflow Increase and Decrease Allowance */


	it("3. Should the right value for Balance Of, Transfer, Transfer From, and Approve, etc", async () => {
		const EurmToken = await ethers.getContractFactory("ERC20");
		const eurmToken = await upgrades.deployProxy(EurmToken);

		// verify the Address
		console.log("EURM Token deployed to:", eurmToken.address);
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000000000');
		console.log("Total Supply: ", (await eurmToken.totalSupply()).toString(), "must be 638 million!!! in wei");
		expect(((await eurmToken.totalSupply()).toString())).to.be.equal('100000000000000000000000000000000');

		describe('Verify Balance Of / Transfer', async () => {
			it("3.1.- Execute a Transfer, and Verify the changes in Owner Account, and Receipt Account", async () => {
				await eurmToken.transfer(await accounts[1].getAddress(), '10000000000000000000000000');
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 90000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99999990000000000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 10000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('10000000000000000000000000');
			});
			it("3.2.- Try Transfer a Value more than available in the Accounts, and Receive Revert", async () => {
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 10000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('10000000000000000000000000');
				console.log("We Expect Revert the Transaction:");
				await expect((eurmToken.connect(accounts[1]).transfer(await accounts[0].getAddress(), '30000000000000000000000000'))).to.be.revertedWith("ERC20: transfer amount exceeds balance");
			});
			it("3.3.- Send again the owner the Tokens with the Contract Paused", async () => {
				await eurmToken.connect(accounts[0]).pause(true)
				await expect((eurmToken.connect(accounts[1]).transfer(await accounts[0].getAddress(), '10000000000000000000000000'))).to.be.revertedWith("ERC20 EURM: token transfer/mint/burn while paused");
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 99999990000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99999990000000000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 30000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('10000000000000000000000000');
				await eurmToken.connect(accounts[0]).pause(false)
			});
			it("3.4.- Send again the owner the Tokens", async () => {
				await eurmToken.connect(accounts[1]).transfer(await accounts[0].getAddress(), '10000000000000000000000000');
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 150000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('100000000000000000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 0");
				expect(((await eurmToken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('0');
			});
		});

		describe('Verify Balance Of / IncreaseAllowance / TransferFrom', async () => {
			it("3.4.- Execute a IncreaseAllowance / TransferFrom workflow and Verify the changes in Owner Account, and Receipt Account", async () => {
				await eurmToken.increaseAllowance(await accounts[1].getAddress(), '10000000000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[1]:", (await eurmToken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString());
				expect((await eurmToken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString()).to.be.equal('10000000000000000000000000');
				await eurmToken.connect(accounts[1]).transferFrom(await accounts[0].getAddress(), await accounts[1].getAddress(), '10000000000000000000000000');
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 90000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99999990000000000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 10000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('10000000000000000000000000');
			});
			it("3.5.- Execute a IncreaseAllowance / TransferFrom more than Approval and Receive Revert ", async () => {
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 10000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('10000000000000000000000000');
				await eurmToken.increaseAllowance(await accounts[1].getAddress(), '10000000000000000000000000');
				expect((await eurmToken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString()).to.be.equal('10000000000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[1]:", (await eurmToken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString());
				console.log("We Expect Revert the Transaction:");
				await expect(eurmToken.connect(accounts[1]).transferFrom(await accounts[0].getAddress(), await accounts[1].getAddress(), '18888889000000000000000000')).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
			});
			it("3.6.- Execute a DecreaseAllowance / TransferFrom more than Approval and Receive Revert", async () => {
				console.log("Balance Before of Receipt: ", (await eurmToken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 10000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('10000000000000000000000000');
				await eurmToken.decreaseAllowance(await accounts[1].getAddress(), '9000000000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[1]:", (await eurmToken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString());
				expect((await eurmToken.allowance(await accounts[0].getAddress(), await accounts[1].getAddress())).toString()).to.be.equal('1000000000000000000000000');
				await eurmToken.connect(accounts[1]).transferFrom(await accounts[0].getAddress(), await accounts[1].getAddress(), '1000000000000000000000000');
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 150000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99999989000000000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 11000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('11000000000000000000000000');
			});
			it("3.7.- Execute a IncreaseAllowance / TransferFrom and send to the Owner all Token by Steps", async () => {
				console.log("Balance Before of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 89000000000000000000000000");
				console.log("Balance Before of Receipt: ", (await eurmToken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 11000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99999989000000000000000000000000');
				expect(((await eurmToken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('11000000000000000000000000');
				await eurmToken.connect(accounts[1]).increaseAllowance(await accounts[0].getAddress(), '9000000000000000000000000');
				console.log("Verify Allowance Accounts[1] to Accounts[0]:", (await eurmToken.allowance(await accounts[1].getAddress(), await accounts[0].getAddress())).toString());
				expect((await eurmToken.allowance(await accounts[1].getAddress(), await accounts[0].getAddress())).toString()).to.be.equal('9000000000000000000000000');
				console.log("We Expect Revert the Transaction: Try to send total balance of Receipt (Accounts[1])");
				await expect(eurmToken.transferFrom(await accounts[1].getAddress(), await accounts[0].getAddress(), '9777778000000000000000000')).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
				await eurmToken.transferFrom(await accounts[1].getAddress(), await accounts[0].getAddress(), '9000000000000000000000000');
				console.log("Verify Allowance After first Tx Accounts[1] to Accounts[0]:", (await eurmToken.allowance(await accounts[1].getAddress(), await accounts[0].getAddress())).toString());
				await eurmToken.connect(accounts[1]).increaseAllowance(await accounts[0].getAddress(), '2000000000000000000000000');
				console.log("Verify Allowance Before second Tx Accounts[1] to Accounts[0]:", (await eurmToken.allowance(await accounts[1].getAddress(), await accounts[0].getAddress())).toString());
				await eurmToken.transferFrom(await accounts[1].getAddress(), await accounts[0].getAddress(), '2000000000000000000000000');
				console.log("Verify Allowance After second Tx Accounts[1] to Accounts[0]:", (await eurmToken.allowance(await accounts[1].getAddress(), await accounts[0].getAddress())).toString());
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 150000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('100000000000000000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[1].getAddress())).toString(), "=====> must be 0");
				expect(((await eurmToken.balanceOf(await accounts[1].getAddress())).toString())).to.be.equal('0');
			});
		});
	});

	//   ** Function / Methods Blacklistable Wallet */
	//   ** 4. Test Black List Method's of Smart Contract : How it is working - Test Case */
	//   ** t1. Setting Multiples Wallet in the Blacklist */
	//   ** t2. Getting List of All blacklisted Wallet*/
	//   ** t3. Testing with blacklisted Wallet IncreaseAllowance, DecreaseAllowance, Transfer, TransferMany, Mint and Burn */
	//   ** t4. Testing drop blacklisted Wallet, and Testing again the methods*/


	it("4. Should the right value for add, drop or revert when i try to execute a transfer", async () => {
		const EurmToken = await ethers.getContractFactory("ERC20");
		const eurmToken = await upgrades.deployProxy(EurmToken);

		// verify the Address
		console.log("EURM Token deployed to:", eurmToken.address);
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000000000');
		console.log("Total Supply: ", (await eurmToken.totalSupply()).toString(), "must be 638 million!!! in wei");
		expect(((await eurmToken.totalSupply()).toString())).to.be.equal('100000000000000000000000000000000');

		describe("Add Wallet to the blacklist and getting the list, and drop someone, and update the list", async () => {
			it("4.1.- Add several list of Accounts in the Blacklist: ", async () => {
				console.log("Verify only the Owner can add wallet to the Blacklist: ");
				await expect(eurmToken.connect(accounts[1]).addBlacklist(await accounts[0].getAddress())).to.be.revertedWith("Ownable: caller is not the owner");
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(eurmToken.addBlacklist(walletZeroAddress)).to.be.revertedWith("ERC20 EURM: Not Add Zero Address");
				console.log("Add all odd accounts from 4 to 16 address:");
				for (let i=4; i <= 16; i+=2) {
					await expect(eurmToken.addBlacklist(await accounts[i].getAddress())).to.emit(eurmToken, 'InBlacklisted').withArgs(await accounts[i].getAddress());
					console.log("Account ", i, "Blacklisted ", await accounts[i].getAddress());
				}
				await expect(eurmToken.addBlacklist(await accounts[4].getAddress())).to.be.revertedWith("ERC20 EURM: sender account is blacklisted");
				await expect(eurmToken.addBlacklist(await accounts[8].getAddress())).to.be.revertedWith("ERC20 EURM: sender account is blacklisted");
				await expect(eurmToken.addBlacklist(await accounts[12].getAddress())).to.be.revertedWith("ERC20 EURM: sender account is blacklisted");
				const address:string[] = await eurmToken.getBlacklist()
				console.log("List of Address Blacklisted: ");
				for (let i=0; i < address.length ; i++) {
					console.log("Address Blacklisted : ", address[i], "Status :", await eurmToken.isBlacklisted(address[i]));
				}
			});

			it("4.2.- Drop some address from Blacklist, adn verify the changes", async () => {
				console.log("Drop accounts from positions 4, 8, 12 and 16 address:");
				for (let i=4; i <= 16; i+=4) {
					await expect(eurmToken.dropBlacklist(await accounts[i].getAddress())).to.emit(eurmToken, 'OutBlacklisted').withArgs(await accounts[i].getAddress());
					console.log("Account ", i, "Blacklisted ", await accounts[i].getAddress());
				}
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(eurmToken.dropBlacklist(walletZeroAddress)).to.be.revertedWith("ERC20 EURM: Not Add Zero Address");
				console.log("Revert for Drop a wrong wallet")
				await expect(eurmToken.dropBlacklist(await accounts[20].getAddress())).to.be.revertedWith("ERC20 EURM: Wallet don't exist");
				const address:string[] = await eurmToken.getBlacklist()
				console.log("List of Address Blacklisted: ");
				for (let i=0; i < address.length ; i++) {
					console.log("Address Blacklisted : ", address[i], "Status :", await eurmToken.isBlacklisted(address[i]));
				}
			});
			it("4.3.- IncreaseAllowance / Transfer / TransferFrom only the unBlacklisted Wallet", async () => {
				// Accounts[4]
				await eurmToken.increaseAllowance(await accounts[4].getAddress(), '8888889000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[4]:", (await eurmToken.allowance(await accounts[0].getAddress(), await accounts[4].getAddress())).toString());
				expect((await eurmToken.allowance(await accounts[0].getAddress(), await accounts[4].getAddress())).toString()).to.be.equal('8888889000000000000000000');
				await eurmToken.connect(accounts[4]).transferFrom(await accounts[0].getAddress(), await accounts[4].getAddress(), '8888889000000000000000000');
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 91111111000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99999991111111000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[4].getAddress())).toString(), "=====> must be 8888889000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[4].getAddress())).toString())).to.be.equal('8888889000000000000000000');
				// Accounts[8]
				await eurmToken.increaseAllowance(await accounts[8].getAddress(), '30000000000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[8]:", (await eurmToken.allowance(await accounts[0].getAddress(), await accounts[8].getAddress())).toString());
				expect((await eurmToken.allowance(await accounts[0].getAddress(), await accounts[8].getAddress())).toString()).to.be.equal('30000000000000000000000000');
				await eurmToken.connect(accounts[8]).transferFrom(await accounts[0].getAddress(), await accounts[8].getAddress(), '30000000000000000000000000');
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 61111111000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99999961111111000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[8].getAddress())).toString(), "=====> must be 30000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[8].getAddress())).toString())).to.be.equal('30000000000000000000000000');
			});

			it("4.4.- IncreaseAllowance / Mint / Burn only the unBlacklisted Wallet", async () => {
				// Accounts[4]
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				await eurmToken.increaseAllowance(await accounts[4].getAddress(), '8888889000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[4]:", (await eurmToken.allowance(await accounts[0].getAddress(), await accounts[4].getAddress())).toString());
				await expect((await eurmToken.allowance(await accounts[0].getAddress(), await accounts[4].getAddress())).toString()).to.be.equal('8888889000000000000000000');
				await expect(eurmToken.burn('8888889000000000000000000')).to.emit(eurmToken, 'Transfer').withArgs(await accounts[0].getAddress(), walletZeroAddress,'8888889000000000000000000');
				await expect(eurmToken.mint('8888889000000000000000000')).to.emit(eurmToken, 'Transfer').withArgs(walletZeroAddress, await accounts[0].getAddress(), '8888889000000000000000000');
				await expect(eurmToken.mint('8888889000000000000000000')).to.be.revertedWith("ERC20: Can't Mint, it exceeds the maximum supply");
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 61111111000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99999961111111000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[4].getAddress())).toString(), "=====> must be 8888889000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[4].getAddress())).toString())).to.be.equal('8888889000000000000000000');
				// Accounts[8]
				await eurmToken.increaseAllowance(await accounts[8].getAddress(), '30000000000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[8]:", (await eurmToken.allowance(await accounts[0].getAddress(), await accounts[8].getAddress())).toString());
				await expect((await eurmToken.allowance(await accounts[0].getAddress(), await accounts[8].getAddress())).toString()).to.be.equal('30000000000000000000000000');
				await expect(eurmToken.burn('8888889000000000000000000')).to.emit(eurmToken, 'Transfer').withArgs(await accounts[0].getAddress(), walletZeroAddress,'8888889000000000000000000');
				await expect(eurmToken.mint('8888889000000000000000000')).to.emit(eurmToken, 'Transfer').withArgs(walletZeroAddress, await accounts[0].getAddress(), '8888889000000000000000000');
				await expect(eurmToken.mint('8888889000000000000000000')).to.be.revertedWith("ERC20: Can't Mint, it exceeds the maximum supply");
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 61111111000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99999961111111000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[8].getAddress())).toString(), "=====> must be 30000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[8].getAddress())).toString())).to.be.equal('30000000000000000000000000');
			});

			it("4.5.- IncreaseAllowance / Transfer / TransferFrom only the Blacklisted Wallet", async () => {
				// Accounts[6]
				await eurmToken.increaseAllowance(await accounts[6].getAddress(), '8888889000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[6]:", (await eurmToken.allowance(await accounts[0].getAddress(), await accounts[6].getAddress())).toString());
				expect((await eurmToken.allowance(await accounts[0].getAddress(), await accounts[6].getAddress())).toString()).to.be.equal('8888889000000000000000000');
				console.log("We Expect Revert the Transaction: Try to send total balance of Receipt (Accounts[6])");
				await expect(eurmToken.connect(accounts[6]).transferFrom(await accounts[0].getAddress(), await accounts[6].getAddress(), '8888889000000000000000000')).to.be.revertedWith("ERC20 EURM: recipient account is blacklisted");
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 91111111000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99999961111111000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[6].getAddress())).toString(), "=====> must be 0");
				expect(((await eurmToken.balanceOf(await accounts[6].getAddress())).toString())).to.be.equal('0');
				// Accounts[10]
				await eurmToken.increaseAllowance(await accounts[10].getAddress(), '30000000000000000000000000');
				console.log("Verify Allowance Accounts[0] to Accounts[10]:", (await eurmToken.allowance(await accounts[0].getAddress(), await accounts[10].getAddress())).toString());
				expect((await eurmToken.allowance(await accounts[0].getAddress(), await accounts[10].getAddress())).toString()).to.be.equal('30000000000000000000000000');
				console.log("We Expect Revert the Transaction: Try to send total balance of Receipt (Accounts[10])");
				await expect(eurmToken.connect(accounts[10]).transferFrom(await accounts[0].getAddress(), await accounts[10].getAddress(), '30000000000000000000000000')).to.be.revertedWith("ERC20 EURM: recipient account is blacklisted");
				console.log("Balance After of Account Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "=====> must be 600000000000000000000000000");
				expect(((await eurmToken.balanceOf(await accounts[0].getAddress())).toString())).to.be.equal('99999961111111000000000000000000');
				console.log("Balance After of Receipt: ", (await eurmToken.balanceOf(await accounts[10].getAddress())).toString(), "=====> must be 0");
				expect(((await eurmToken.balanceOf(await accounts[10].getAddress())).toString())).to.be.equal('0');
			});
		});
	});

	//   ** Function / Methods Circulating Supply */
	//   ** 5. Test Circulating Supply Method's of Smart Contract : How it is working - Test Case */
	//   ** t1. Include Multiples Wallet in the EURM Wallets Array */
	//   ** t2. Getting List of All EURM Wallets Array */
	//   ** t3. Exclude Multiples Wallets in the EURM Wallets Array */
	//   ** t4. Verify in all cases the right value of the Circulating Supply */


	it("5. Should the right value of the Circulating Supply for add, drop any wallets in the Array for EURM Wallets", async () => {
		const EurmToken = await ethers.getContractFactory("ERC20");
		const eurmToken = await upgrades.deployProxy(EurmToken);

		// verify the Address
		console.log("EURM Token deployed to:", eurmToken.address);
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000000000');
		console.log("Total Supply: ", (await eurmToken.totalSupply()).toString(), "must be 638 million!!! in wei");
		expect(((await eurmToken.totalSupply()).toString())).to.be.equal('100000000000000000000000000000000');
		await expect(eurmToken.transfer((await accounts[19].getAddress()).toString(),'10000000000000000000000000')).to.emit(eurmToken, 'Transfer').withArgs(await accounts[0].getAddress(), await accounts[19].getAddress(), '10000000000000000000000000');

		describe("Add Wallet to the blacklist and getting the list, and drop someone, and update the list", async () => {
			it("5.1.- Sending Token to Different Wallets and Verify the Circulating Supply with zero EURM Wallets", async () => {
				console.log("Verify the Circulating Supply with Start:", (await eurmToken.circulatingSupply()).toString());
				expect((await eurmToken.circulatingSupply()).toString()).to.equal('10000000000000000000000000');
				console.log("Verify Owner Address Balance with Start: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString());
				expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('99999990000000000000000000000000');
				console.log("Execute multiples Transfer for all odd Account from 4 to 18")
				for (let i=4; i <= 18; i+=2) {
					await expect(eurmToken.transfer(await accounts[i].getAddress(),'1000000000000000000000000')).to.emit(eurmToken, 'Transfer').withArgs(await accounts[0].getAddress(), await accounts[i].getAddress(), '1000000000000000000000000');
					console.log("Account ", i, "Receipt Address for Verify Circulating: ", await accounts[i].getAddress());
				}
				console.log("Circulating Supply After Sending Tokens to Several Accounts: ", (await eurmToken.circulatingSupply()).toString());
				expect((await eurmToken.circulatingSupply()).toString()).to.equal('18000000000000000000000000');
				console.log("Verify Owner Address Balance After: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString());
				expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('99999982000000000000000000000000');
			})

			it("5.2.- Add several list of Accounts in the EURM Wallets Array: ", async () => {
				console.log("Verify only the Owner can add wallet to the EURM Wallets Array: ");
				await expect(eurmToken.connect(accounts[1]).addEurmWallet(await accounts[0].getAddress())).to.be.revertedWith("Ownable: caller is not the owner");
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(eurmToken.addEurmWallet(walletZeroAddress)).to.be.revertedWith("ERC20 EURM: Not Add Zero Address");
				console.log("Add EURM Wallets array, Accounts 4, 8, 12 and 16:");
				for (let i=4; i <= 16; i+=4) {
					await expect(eurmToken.addEurmWallet(await accounts[i].getAddress())).to.emit(eurmToken, 'InEurmWallet').withArgs(await accounts[i].getAddress());
					console.log("Account ", i, "EURM Wallets Address", await accounts[i].getAddress());
				}
				console.log("Revert for Add again in the CaneWallet Arrays");
				await expect(eurmToken.addEurmWallet(await accounts[4].getAddress())).to.be.revertedWith("ERC20 EURM: wallet is already");
				await expect(eurmToken.addEurmWallet(await accounts[8].getAddress())).to.be.revertedWith("ERC20 EURM: wallet is already");
				await expect(eurmToken.addEurmWallet(await accounts[12].getAddress())).to.be.revertedWith("ERC20 EURM: wallet is already");
				const address:string[] = await eurmToken.getEurmWallets();
				console.log("List of Address EURM Wallets: ");
				for (let i=0; i < address.length ; i++) {
					console.log("Address EURM Wallets: ", address[i], "Status :", await eurmToken.isEurmWallet(address[i]));
				}
			});

			it("5.3.- Verify the Circulating Supply After add Money the EURM Wallets  ", async () => {
				console.log("Transfer Token for Several Wallet and Very:");
				console.log("Circulating Supply After Sending Several Accounts: ", (await eurmToken.circulatingSupply()).toString());
				expect((await eurmToken.circulatingSupply()).toString()).to.equal('14000000000000000000000000');
				console.log("Verify Owner Address Balance After: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString());
				expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('99999982000000000000000000000000');
			});

			it("5.4.- Drop some address from EURM Wallets, and verify the changes", async () => {
				console.log("Drop accounts from positions 4, 8, 12 and 16 address:");
				const address:string[] = await eurmToken.getEurmWallets();
				for (let i=4; i <= 16; i+=4) {
					await expect(eurmToken.dropEurmWallet(await accounts[i].getAddress())).to.emit(eurmToken, 'OutEurmWallet').withArgs(await accounts[i].getAddress());
					console.log("Account ", i, "EURM Wallets Address ", await accounts[i].getAddress());
				}
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(eurmToken.dropEurmWallet(walletZeroAddress)).to.be.revertedWith("ERC20 EURM: Not Add Zero Address");
				console.log("Revert for Drop an not exist address")
				await expect(eurmToken.dropEurmWallet(await accounts[20].getAddress())).to.be.revertedWith("ERC20 EURM: Wallet don't exist");
				const address2:string[] = await eurmToken.getEurmWallets();
				expect(address2.length).to.be.equal(address.length-4);
				console.log("List of Address EURM Wallets: ");
				for (let i=0; i < address2.length ; i++) {
					console.log("Address EURM Wallets: ", address[i], "Status :",  await eurmToken.isEurmWallet(address[i]));
				}
			});

			it("5.5.- Verify the Circulating Supply After Drop all EURM Wallets  ", async () => {
				console.log("Circulating Supply After drop All EURM Wallets: ", (await eurmToken.circulatingSupply()).toString());
				expect((await eurmToken.circulatingSupply()).toString()).to.equal('18000000000000000000000000');
				console.log("Verify Owner Address Balance After: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString());
				expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('99999982000000000000000000000000');
			});

			it("5.6.- Sending token another Count not included in EURM Wallets: ", async () => {
				await expect(eurmToken.connect(accounts[1]).addEurmWallet(await accounts[0].getAddress())).to.be.revertedWith("Ownable: caller is not the owner");
				console.log("Transfer Token to Accounts 2, 6, 10, 14 and 18:");
				for (let i=2; i <= 18; i+=4) {
					await expect(eurmToken.transfer(await accounts[i].getAddress(),'1000000000000000000000000')).to.emit(eurmToken, 'Transfer').withArgs(await accounts[0].getAddress(), await accounts[i].getAddress(), '1000000000000000000000000');
					console.log("Account ", i, "Receipt Address for Verify Circulating: ", await accounts[i].getAddress());
					console.log("Balance Receipt Address for Verify Circulating: ", (await eurmToken.balanceOf(await accounts[i].getAddress())).toString());
				}
				console.log("Circulating Supply After drop All EURM Wallets: ", (await eurmToken.circulatingSupply()).toString());
				expect((await eurmToken.circulatingSupply()).toString()).to.equal('23000000000000000000000000');
				console.log("Verify Owner Address Balance After: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString());
				expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('99999977000000000000000000000000');
			});

			it("5.7.- Verify the Circulating Supply if include the accounts 2, 6, 10, 14 and 18 in the EURM Wallets Array: ", async () => {
				await expect(eurmToken.connect(accounts[1]).addEurmWallet(await accounts[0].getAddress())).to.be.revertedWith("Ownable: caller is not the owner");
				console.log("Add EURM Wallets array the Accounts 2, 6, 10, 14 and 18:");
				for (let i=2; i <= 18; i+=4) {
					await expect(eurmToken.addEurmWallet(await accounts[i].getAddress())).to.emit(eurmToken, 'InEurmWallet').withArgs(await accounts[i].getAddress());
					console.log("Account ", i, "EURM Wallets Address", await accounts[i].getAddress());
				}
				console.log("Circulating Supply After drop All EURM Wallets: ", (await eurmToken.circulatingSupply()).toString());
				expect((await eurmToken.circulatingSupply()).toString()).to.equal('14000000000000000000000000');
				console.log("Verify Owner Address Balance After: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString());
				expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.equal('99999977000000000000000000000000');
			});

		});
	});

	//   ** Function / Methods Claim Token and Native Coins */
	//   ** 6. Test Claim Method's of Smart Contract : How it is working - Test Case */
	//   ** t1. Sending Native Coin and Claim with the Methods */
	//   ** t2. Sending Token ERC20 and Clain with the Methods */

	it("6. Should the right value of the Claim wallets in the Array for EURM Wallets", async () => {
		const CaneToken = await ethers.getContractFactory("ERC20");
		const Erc20Token = await ethers.getContractFactory("ERC20Token");
		const eurmToken = await upgrades.deployProxy(CaneToken);
		const erc20Token = await upgrades.deployProxy(Erc20Token);

		// verify the Address
		console.log("EURM Token deployed to:", eurmToken.address);
		console.log("ERC20 Token deployed to:", erc20Token.address);
		// Verify the balance of the Owner
		console.log("Balance of the Owner: ", (await eurmToken.balanceOf(await accounts[0].getAddress())).toString(), "must be 100 million!!! in wei");
		expect((await eurmToken.balanceOf(await accounts[0].getAddress())).toString()).to.be.equal('100000000000000000000000000000000');
		console.log("Total Supply: ", (await eurmToken.totalSupply()).toString(), "must be 638 million!!! in wei");
		expect(((await eurmToken.totalSupply()).toString())).to.be.equal('100000000000000000000000000000000');
		describe("Sending Native Token and ERC20 Token and after Claim with the Methods", async () => {
			it("6.1.-  Sending Native Token and After Claim with the Method", async () => {
				console.log("Verify the Balance before send ETH: ", (await ethers.provider.getBalance(eurmToken.address)).toString());
				const value = ethers.utils.parseEther('1000.0');
				const value2 = ethers.utils.parseEther('1000.0');
				await accounts[3].sendTransaction({to: await accounts[0].getAddress(), value: value});
				console.log("Verify Balance of ETH Accounts[0] before claim : ", (await ethers.provider.getBalance(await accounts[0].getAddress())).toString());
				await accounts[0].sendTransaction({to: eurmToken.address, value: value2});
				//await expect(accounts[0].sendTransaction({to: eurmToken.address, value: 10})).to.be.revertedWith("ERC20 EURM: Sending Ether for Error, revert!!!");
				console.log("Verify the Balance After send ETH: ", (await ethers.provider.getBalance(eurmToken.address)).toString());
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(eurmToken.claimValues('0x0000000000000000000000000000000000000000', walletZeroAddress)).to.be.revertedWith("ERC20 EURM: Not Add Zero Address");
				const address = await accounts[15].getAddress();
				console.log("Verify Balance of ETH Accounts[15] before claim: ", (await ethers.provider.getBalance(address)).toString());
				await eurmToken.claimValues('0x0000000000000000000000000000000000000000', address);
				console.log("Verify Balance of ETH Accounts[15] After claim: ", (await ethers.provider.getBalance(address)).toString());
				console.log("Verify Balance of ETH Accounts[0] After claim : ", (await ethers.provider.getBalance(await accounts[0].getAddress())).toString());

			});

			it("6.2- Sending ERC20 token and After Claim with Method", async () => {
				await erc20Token.mintToWallet(eurmToken.address,'9000000000000000000');
				console.log("Balance ERC20 Token of Smart Contract EURM before Claim: ", (await erc20Token.balanceOf(eurmToken.address)).toString());
				const walletZeroAddress = '0x0000000000000000000000000000000000000000';
				console.log("Revert for WalletAddressZero");
				await expect(eurmToken.claimValues(erc20Token.address, walletZeroAddress)).to.be.revertedWith("ERC20 EURM: Not Add Zero Address");
				const address = await accounts[15].getAddress();
				console.log("Balance ERC20 Token of Accounts[15] before Claim: ", (await erc20Token.balanceOf(address)).toString());
				await eurmToken.claimValues(erc20Token.address, address);
				console.log("Balance ERC20 Token of Accounts[15] After Claim: ", (await erc20Token.balanceOf(address)).toString());
				console.log("Balance ERC20 Token of Smart Contract EURM After Claim: ", (await erc20Token.balanceOf(eurmToken.address)).toString());
			})
		});
	});

});
