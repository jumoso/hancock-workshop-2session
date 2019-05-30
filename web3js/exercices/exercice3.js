var web3js = require('../../utils/ethereum');

var web3 = web3js.getWeb3();

// exercice 3: deploy a contract and call a function.

// we need to calculate the gas necessary to make the transaction

web3.eth.estimateGas({
  from: "0xC16967807fA6DAE4E180b9CAa98Fd7635abdadc7",
  data: "0x6080604052348015600f57600080fd5b5060a28061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806360fe47b11460375780636d4ce63c146053575b600080fd5b605160048036036020811015604b57600080fd5b5035606b565b005b60596070565b60408051918252519081900360200190f35b600055565b6000549056fea165627a7a72305820ec4c3efa440d7af21fe9762b3b635e58215af8397fae88ea19ef0e2ef05dd0e70029"
}).then((gas) => {

  //after the gas is calculated we can make the transaction. We need to sign it firts with the private key

  console.log("gas calculated: " + gas);
  web3.eth.accounts.signTransaction(
    {
      gas,
      data: "0x6080604052348015600f57600080fd5b5060a28061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806360fe47b11460375780636d4ce63c146053575b600080fd5b605160048036036020811015604b57600080fd5b5035606b565b005b60596070565b60408051918252519081900360200190f35b600055565b6000549056fea165627a7a72305820ec4c3efa440d7af21fe9762b3b635e58215af8397fae88ea19ef0e2ef05dd0e70029"
    }, '0x3CAA80A698AE22E8B9265C2BE6F8C9D8E59C0EDE451FB1F3CA6CA3BDD24F938B'
  ).then((response) => {

    //when the transaction is signed, it is ready to be sent

    console.log(response);
    web3.eth.sendSignedTransaction(response.rawTransaction)
    .on('receipt', (receipt) => {

      // this event is received when the transaction is mined
        
			console.log(receipt);
			
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


