const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://kovan.infura.io/ws'));

const abi = [{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "name": "orderhash",
            "type": "bytes32"
        }
    ],
    "name": "OrderCancelled",
    "type": "event"
}];

async function doit() {
    const net = await web3.eth.net.getId();
    console.log("Connected: " + net);

    const contract = new web3.eth.Contract(abi, '0xea5689c6faf3dccf7232be0331b91cc5ecbbe04d');

    contract.events.allEvents({ filter: {}, fromBlock: 8970046 })
        .on('data', console.log)
        .on('error', console.error);
    console.log('waiting');
}

doit();