# @astra-js/network

This package provides a collection of apis to create messengers (HTTP, WebSocket) to connect to blockchain networks.

## Installation

```
npm install @astra-js/network
```

## Usage

```javascript
const { Messenger, HttpProvider, WSProvider } = require('@astra-js/network');
const { ChainID, ChainType } = require('@astra-js/utils');
const testnetHTTP = 'https://rpc.s0.t.astranetwork.com';
const testnetWS = 'wss://ws.s0.t.astranetwork.com';
const localHTTP = 'http://localhost:9500/';
const localWS = 'http://localhost:9800/';
const http = new HttpProvider(testnetHTTP); // for local use localHTTP
const ws = new WSProvider(testnetWS); // for local use testnetWS
const customHTTPMessenger = new Messenger(http, ChainType.Astra, ChainID.AstraTestnet); // for local ChainID.AstraLocal
const customWSMessenger = new Messenger(ws, ChainType.Astra, ChainID.AstraTestnet); // for local ChainID.AstraLocal
```