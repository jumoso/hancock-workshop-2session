var web3js = require('../../utils/ethereum');

var web3 = web3js.getWeb3();

// exercice 1: create a basic account that returns an address and a private key

var account = web3.eth.accounts.create();

console.log(account);

process.exit();
