require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, 'https://ropsten.infura.io/v3/' + process.env.INFURA_KEY);
      },
      gas: 5000000,
      network_id: '*'
    }
  }
};
