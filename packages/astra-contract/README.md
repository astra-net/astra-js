# @astra-js/contract

This package provides a collection of apis to create, deploy, and interact with smart contracts. In Astra, smart contracts all fully EVM compatible and the formats and terminologies match 1-to-1 with EVM smart contracts.

## Installation

```
npm install @astra-js/contract
```

## Usage

Deploying a contract using `contractConstructor`
```javascript
const { ContractFactory } = require('@astra-js/contract');
const { Wallet } = require('@astra-js/account');
const { Messenger, HttpProvider } = require('@astra-js/network');
const { ChainID, ChainType, hexToNumber } = require('@astra-js/utils');

const wallet = new Wallet(
  new Messenger(
    new HttpProvider('https://rpc.s0.t.astranetwork.com'),
    ChainType.Astra,
    ChainID.AstraTestnet,
  ),
);
const factory = new ContractFactory(wallet);

const contractJson = require("./Counter.json");
const contract = factory.createContract(contractJson.abi);

const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
let options2 = { gasPrice: 1000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas

const options3 = { data: contractJson.bytecode }; // contractConstructor needs contract bytecode to deploy

contract.wallet.addByPrivateKey('1f054c21a0f57ebc402c00e14bd1707ddf45542d4ed9989933dbefc4ea96ca68');

contract.methods.contractConstructor(options3).estimateGas(options1).then(gas => {
  options2 = {...options2, gasLimit: hexToNumber(gas)};
  contract.methods.contractConstructor(options3).send(options2).then(response => {
    console.log('contract deployed at ' + response.transaction.receipt.contractAddress);
  });
});
```
Instead of `contract.methods.contractConstructor`, `contract.deploy` could be used and it will work.

Loading a contract object using the contract json and contract address for interacting with it
```javascript
const { Astra } = require("@astra-js/core");
const { ChainID, ChainType } = require("@astra-js/utils");
const astra = new Astra("https://rpc.s0.t.astranetwork.com", {
  chainType: ChainType.Astra,
  chainId: ChainID.AstraTestnet,
});

const contractJson = require("./Counter.json");
const contractAddr = "0x19f64050e6b2d376e52AC426E366c49EEb0724B1";

const contract = astra.contracts.createContract(contractJson.abi, contractAddr);
console.log(contract.methods);
```

Directly loading contract using `ContractFactory`
```javascript
const { ContractFactory } = require('@astra-js/contract');
const { Wallet } = require('@astra-js/account');
const { Messenger, HttpProvider } = require('@astra-js/network');
const { ChainID, ChainType, hexToNumber } = require('@astra-js/utils');

const wallet = new Wallet(new Messenger(
  new HttpProvider('https://rpc.s0.t.astranetwork.com'),
  ChainType.Astra,
  ChainID.AstraTestnet,
));
const factory = new ContractFactory(wallet);
const contract = factory.createContract(contractJson.abi, contractAddr);
```

Estimate gas for contract methods
```javascript
const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000

contract.methods.getCount().estimateGas(options1).then(gas => {
  console.log('gas required for getCount is ' + hexToNumber(gas));
});
```

Call contract read-only methods. Astra uses 1 Gwei gas price and gas limit of 21000 by default. Use the estimate gas api to correctly set the gas limit.
```javascript
const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
let options2 = { gasPrice: 1000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas

contract.methods.getCount().estimateGas(options1).then(gas => {
  options2 = {...options2, gasLimit: hexToNumber(gas)};
  contract.methods.getCount().call(options2).then(count => {
    console.log('counter value: ' + count);
  });
});
```

Invoking contract modification methods using `send` api. Need to add a signing account to the contract wallet, otherwise `send` api will not work.
```javascript
const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
let options2 = { gasPrice: 1000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas

contract.wallet.addByPrivateKey('1f054c21a0f57ebc402c00e14bd1707ddf45542d4ed9989933dbefc4ea96ca68');

contract.methods.incrementCounter().estimateGas(options1).then(gas => {
  options2 = {...options2, gasLimit: hexToNumber(gas)};
  contract.methods.incrementCounter().send(options2).then(response => {
    console.log(response.transaction.receipt);
  });
});
```

All the above apis can also be asynchronously executed using `async` and `await`.

Subscribing to the contract events requires web socket based messenger.
```javascript
const { ContractFactory } = require('@astra-js/contract');
const { Wallet } = require('@astra-js/account');
const { Messenger, WSProvider } = require('@astra-js/network');
const { ChainID, ChainType, hexToNumber } = require('@astra-js/utils');
const ws = new WSProvider('wss://ws.s0.t.astranetwork.com');

const wallet = new Wallet(
  new Messenger(
    ws,
    ChainType.Astra,
    ChainID.AstraTestnet,
  ),
);
const factory = new ContractFactory(wallet);

const contractJson = require("./Counter.json");
const contractAddr = '0x8ada52172abda19b9838eb00498a40952be6a019';

const contract = factory.createContract(contractJson.abi, contractAddr);

contract.events
  .IncrementedBy()
  .on('data', (event) => {
    console.log(event);
  })
  .on('error', console.error);
```