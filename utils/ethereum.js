
var web3 = require('web3');

module.exports = {
    getWeb3: function() {
        return new web3(new web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/26b4973de9174bb89d0df15937c4f97b'));
    }
}