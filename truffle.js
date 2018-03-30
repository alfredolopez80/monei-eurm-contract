const HDWalletProvider = require("truffle-hdwallet-provider");
const dotenv = require('dotenv');
dotenv.load();


module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, 'https://ropsten.infura.io/' + process.env.INFURA_KEY)
      },
      gas: 5000000,
      network_id: "*"
    }
  }
};
