var web3js = require('../../utils/ethereum');

var web3 = web3js.getWeb3();

// exercice 4: modify the contract and call a view method.

// First, we have to create an instance of contract using the address of the contract deployed in the exercice 3

var myContract = new web3.eth.Contract([
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
	}],
	"0x42e8ee3BB55Ce55B676CDD2C3697A9C11419e4A4"
);

// let's call the method get to see the value of storedValue

myContract.methods.get().call().then((response) => {

  console.log("response of method get: " + response);
  var data = myContract.methods.set(1).encodeABI();

  myContract.methods.set(1).estimateGas({
    from: "0xC16967807fA6DAE4E180b9CAa98Fd7635abdadc7"
  })
  .then((gas) => {

    web3.eth.accounts.signTransaction(
      {
        gas: gas,
        to: "0x42e8ee3BB55Ce55B676CDD2C3697A9C11419e4A4",
        data
      }, '0x3CAA80A698AE22E8B9265C2BE6F8C9D8E59C0EDE451FB1F3CA6CA3BDD24F938B'
    ).then((response) => {

      //when the transaction is signed, it is ready to be sent

      console.log(response);
      web3.eth.sendSignedTransaction(response.rawTransaction)
      .on('receipt', (receipt) => {

        // this event is received when the transaction is mined
          
        console.log(receipt);
        
        myContract.methods.get().call().then((response) => {
          
          console.log("response of method get after set: " + response);
          process.exit();

        });
        
      })
      .on('error', (error) => {
        console.log(error);
        process.exit();
      });


    }).catch((error) => {
      console.log(error);
      process.exit();
    });

  });

});




