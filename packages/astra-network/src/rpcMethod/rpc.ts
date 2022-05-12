/**
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
 *
 * @packageDocumentation
 * @module astra-network
 */

/**@ignore */
export enum RPCMethod {
  // 1. astra_getBlockByHash
  GetBlockByHash = 'astra_getBlockByHash',
  // 2. astra_getBlockByNumber
  GetBlockByNumber = 'astra_getBlockByNumber',
  // 3. astra_getBlockTransactionCountByHash
  GetBlockTransactionCountByHash = 'astra_getBlockTransactionCountByHash',
  // 4. astra_getBlockTransactionCountByNumber
  GetBlockTransactionCountByNumber = 'astra_getBlockTransactionCountByNumber',
  // 5. astra_getCode
  GetCode = 'astra_getCode',
  // 6. astra_getTransactionByBlockHashAndIndex
  GetTransactionByBlockHashAndIndex = 'astra_getTransactionByBlockHashAndIndex',
  // 7. astra_getTransactionByBlockNumberAndIndex
  GetTransactionByBlockNumberAndIndex = 'astra_getTransactionByBlockNumberAndIndex',
  // 8. astra_getTransactionByHash
  GetTransactionByHash = 'astra_getTransactionByHash',

  GetTransactionReceipt = 'astra_getTransactionReceipt',

  GetCXReceiptByHash = 'astra_getCXReceiptByHash',
  // 9. astra_syncing
  Syncing = 'astra_syncing',
  // 10. net_peerCount
  PeerCount = 'net_peerCount',

  // 11. astra_getBalance
  GetBalance = 'astra_getBalance',
  // 12. astra_getStorageAt
  GetStorageAt = 'astra_getStorageAt',
  // 13. astra_getTransactionCount
  GetTransactionCount = 'astra_getTransactionCount',
  // 14. astra_sendTransaction
  SendTransaction = 'astra_sendTransaction',
  // 15. astra_sendRawTransaction
  SendRawTransaction = 'astra_sendRawTransaction',
  // 16. astra_subscribe
  Subscribe = 'astra_subscribe',
  // 17. astra_getlogs
  GetPastLogs = 'astra_getLogs',
  // 18. astra_getWork
  GetWork = 'astra_getWork',
  // 19. astra_submitWork
  // SubmitWork = 'astra_submitWork',
  // 20. astra_getProof
  GetProof = 'astra_getProof',
  // 21, astra_getFilterChanges
  GetFilterChanges = 'astra_getFilterChanges',
  // 22. astra_newPendingTransactionFilter
  NewPendingTransactionFilter = 'astra_newPendingTransactionFilter',
  // 23. astra_newBlockFilter
  NewBlockFilter = 'astra_newBlockFilter',
  // 24. astra_newFilter
  NewFilter = 'astra_newFilter',
  // 25. astra_call
  Call = 'astra_call',
  // 26. astra_estimateGas
  EstimateGas = 'astra_estimateGas',
  // 27. astra_gasPrice
  GasPrice = 'astra_gasPrice',
  // 28. astra_blockNumber
  BlockNumber = 'astra_blockNumber',
  // 29. astra_unsubscribe
  UnSubscribe = 'astra_unsubscribe',
  // 30. net_version
  NetVersion = 'net_version',
  // 31. astra_protocolVersion
  ProtocolVersion = 'astra_protocolVersion',
  // 32. astra_getShardingStructure
  GetShardingStructure = 'astra_getShardingStructure',
  // 33. astra_sendRawStakingTransaction
  SendRawStakingTransaction = 'astra_sendRawStakingTransaction',
  // 34. astra_getAccountNonce
  GetAccountNonce = 'astra_getAccountNonce',
  // 35. astra_getBlocks
  GetBlocks = 'astra_getBlocks',
}

/**@ignore */
export enum RPCErrorCode {
  // Standard JSON-RPC 2.0 errors
  // RPC_INVALID_REQUEST is internally mapped to HTTP_BAD_REQUEST (400).
  // It should not be used for application-layer errors.
  RPC_INVALID_REQUEST = -32600,
  // RPC_METHOD_NOT_FOUND is internally mapped to HTTP_NOT_FOUND (404).
  // It should not be used for application-layer errors.
  RPC_METHOD_NOT_FOUND = -32601,
  RPC_INVALID_PARAMS = -32602,
  // RPC_INTERNAL_ERROR should only be used for genuine errors in bitcoind
  // (for example datadir corruption).
  RPC_INTERNAL_ERROR = -32603,
  RPC_PARSE_ERROR = -32700,

  // General application defined errors
  RPC_MISC_ERROR = -1, // std::exception thrown in command handling
  RPC_TYPE_ERROR = -3, // Unexpected type was passed as parameter
  RPC_INVALID_ADDRESS_OR_KEY = -5, // Invalid address or key
  RPC_INVALID_PARAMETER = -8, // Invalid, missing or duplicate parameter
  RPC_DATABASE_ERROR = -20, // Database error
  RPC_DESERIALIZATION_ERROR = -22, // Error parsing or validating structure in raw format
  RPC_VERIFY_ERROR = -25, // General error during transaction or block submission
  RPC_VERIFY_REJECTED = -26, // Transaction or block was rejected by network rules
  RPC_IN_WARMUP = -28, // Client still warming up
  RPC_METHOD_DEPRECATED = -32, // RPC method is deprecated
}
