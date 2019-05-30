var web3js = require('../../utils/ethereum');

var web3 = web3js.getWeb3();

// exercice 2: ussing the account created in the previous exercice transfer ether to that address.


// first we are going to check our current balance, it should be 0

web3.eth.getBalance("0x6ac3b1c738054c5827efa15fc9df5435f6131662").then((balance) => {

  console.log("starting balance: " + balance);

});

// we need to calculate the gas necessary to make the transaction

web3.eth.estimateGas({
  from: "0xC16967807fA6DAE4E180b9CAa98Fd7635abdadc7",
  to: "0x6ac3b1c738054c5827efa15fc9df5435f6131662",
  value: "1000000000000000"
}).then((gas) => {

  //after the gas is calculated we can make the transaction. We need to sign it firts with the private key

  console.log("gas calculated: " + gas);
  web3.eth.accounts.signTransaction(
    {
      to: '0x6AC3b1c738054c5827efA15FC9Df5435F6131662',
      gas,
      value: "1000000000000000"
    }, '0x3CAA80A698AE22E8B9265C2BE6F8C9D8E59C0EDE451FB1F3CA6CA3BDD24F938B'
  ).then((response) => {

    //when the transaction is signed, it is ready to be sent

    console.log(response);
    web3.eth.sendSignedTransaction(response.rawTransaction)
    .on('receipt', (receipt) => {

      // this event is received when the transaction is mined
        
      console.log(receipt);

      // finally we check out balance again

      web3.eth.getBalance("0x6ac3b1c738054c5827efa15fc9df5435f6131662").then((balance) => {

        console.log("final balance: " + balance);
  
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

})


