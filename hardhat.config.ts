import { task } from 'hardhat/config'
import 'hardhat-gas-reporter'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-typechain'
import '@typechain/ethers-v5'
import '@openzeppelin/hardhat-upgrades'
import 'hardhat-spdx-license-identifier'
import '@nomiclabs/hardhat-etherscan'
import 'dotenv/config'

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

const MNEMONIC =
  process.env.MNEMONIC ||
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'
const INFURAKEY = process.env.INFURAKEY || 'ffc8f8f8f8f8f8f8f8f8f8f8f8f8f8f8'
const count = parseInt(`${process.env.ACCOUNTS}`) || 1500
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  networks: {
    mainnet: {
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${INFURAKEY}`,
      gasPrice: 65000000000,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    ropsten: {
      chainId: 3,
      url: `https://ropsten.infura.io/v3/${INFURAKEY}`,
      gasPrice: 65000000000,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    rinkeby: {
      chainId: 4,
      url: `https://rinkeby.infura.io/v3/${INFURAKEY}`,
      gasPrice: 65000000000,
      accounts: {
        mnemonic: MNEMONIC,
        count: count,
      },
    },
    // bsc_mainnet: {
    //   chainId: 56,
    //   url: process.env.URL_BSC,
    //   gasPrice: 20000000000,
    //   accounts: {
    //     mnemonic: MNEMONIC,
    //   },
    // },
    bsc_testnet: {
      chainId: 97,
      url: process.env.URL_TESTNET_BSC,
      gasPrice: 20000000000,
      accounts: {
        mnemonic: MNEMONIC,
        count: count,
      },
    },
    polygon: {
      chainId: 137,
      url: `https://polygon-mainnet.infura.io/v3/${INFURAKEY}`,
      gasPrice: 65000000000,
      accounts: {
        mnemonic: MNEMONIC,
        count: count,
      },
    },
    mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.infura.io/v3/${INFURAKEY}`,
      gasPrice: 45000000000,
      accounts: {
        mnemonic: MNEMONIC,
        count: count,
      },
    },
    // moonbase: {
    //   // Need to go to Dicord channel and get DEV (coin in Moonbase Alphanet)
    //   // And Verify Procedure in https://docs.moonbeam.network/networks/testnet/
    //   // Faucet https://docs.moonbeam.network/getting-started/testnet/faucet/
    //   // And Explorer https://moonbase-blockscout.testnet.moonbeam.network/ (Recommend this, https://moonbase.subscan.io/ is too early)
    //   chainId: 1287,
    //   url: process.env.URL_MOONBEAM_TESTNET,
    //   gasPrice: 50000000000,
    //   accounts: {
    //     mnemonic: MNEMONIC,
    //   },
    // },
    localhost: {
      url: 'http://127.0.0.1:8545',
      gasPrice: 35000000000,
      blockGasLimit: 149000000,
    },
    hardhat: {
      gasPrice: 35000000000,
      blockGasLimit: 149000000,
      chainId: 31337,
      accounts: {
        mnemonic: MNEMONIC,
        count: count,
      },
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 500,
      },
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    // apiKey: process.env.ETHERSCAN_API_KEY
    // apiKey: process.env.BSCSCAN_API_KEY
    apiKey: process.env.POLYGON_API_KEY,
  },
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true,
  },
}