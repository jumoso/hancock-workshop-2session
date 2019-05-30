var web3js = require('../../utils/ethereum');

var web3 = web3js.getWeb3();

// exercice 3: deploy a contract and call a function.

// first we have to create an object of type contrat with the abi of the contract that we want to deploy

const myContract = new web3.eth.Contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);

// once we hace our contract object, we call deploy with the binary of the contract and the arguments of the contructor if necessary.

myContract.deploy({
  data: '0x6080604052348015600f57600080fd5b5060a28061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806360fe47b11460375780636d4ce63c146053575b600080fd5b605160048036036020811015604b57600080fd5b5035606b565b005b60596070565b60408051918252519081900360200190f35b600055565b6000549056fea165627a7a72305820ec4c3efa440d7af21fe9762b3b635e58215af8397fae88ea19ef0e2ef05dd0e70029',
  arguments: []
})
.send({
  from: '0x1234567890123456789012345678901234567891'
})
.on('error', (error) => console.log(error))
.on('receipt', (receipt) => {
 console.log(receipt) // contains the new contract address
});