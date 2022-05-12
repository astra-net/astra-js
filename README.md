# Astra JavaScript SDK

[![npm version](https://img.shields.io/npm/v/@astra-js/core.svg?style=flat-square)](https://www.npmjs.com/package/@astra-js/core)
[![Build Status](https://travis-ci.com/FireStack-Lab/Astra-sdk-core.svg?branch=master)](https://travis-ci.com/FireStack-Lab/Astra-sdk-core)

This is the Astra Javascript SDK which provides an easier way to interact with Astra blockchain.

Please read the [documentation](https://jssdk.doc.astranetwork.com/) for full API doc.

The SDK includes following packages with package-level documentation and examples inside each package.

1. [@astra-js/core](https://github.com/astra-one/sdk/tree/master/packages/astra-core)
2. [@astra-js/account](https://github.com/astra-one/sdk/tree/master/packages/astra-account)
3. [@astra-js/crypto](https://github.com/astra-one/sdk/tree/master/packages/astra-crypto)
4. [@astra-js/network](https://github.com/astra-one/sdk/tree/master/packages/astra-network)
5. [@astra-js/utils](https://github.com/astra-one/sdk/tree/master/packages/astra-utils)
6. [@astra-js/transaction](https://github.com/astra-one/sdk/tree/master/packages/astra-transaction)
7. [@astra-js/contract](https://github.com/astra-one/sdk/tree/master/packages/astra-contract)
8. [@astra-js/staking](https://github.com/astra-one/sdk/tree/master/packages/astra-staking)

# Examples

* [A Token Faucet Demo DApp](https://github.com/astra-one/token-faucet-demo-dapp)
* [Hackathon DApps](https://docs.astra.one/home/showcases/applications): DApps built during our internal hackathon
  * [soccerplayers](https://github.com/gupadhyaya/soccerplayers), [onemoji](https://github.com/peekpi/onemoji), [harmonauts](https://github.com/ivorytowerdds/harmonauts), [good-one](https://github.com/astra-one/dapp-demo-crowdfunding)
* [Cross-chain Apps](https://docs.astra.one/home/showcases/crosschain) [the link contains code, demo, and more information]
* [DeFi Apps](https://docs.astra.one/home/showcases/defi)
* [DevPost Hackathon Apps](https://docs.astra.one/home/showcases/hackathons)
* Eth<>Astra Bridge Components: [frontend](https://github.com/astra-one/ethastra-bridge.frontend), [backend](https://github.com/astra-one/ethastra-bridge.appengine), [smart contracts](https://github.com/astra-one/ethastra-bridge), [test scripts](https://github.com/astra-one/ethastra-bridge.tests)
* Eth<>Astra bridge SDKs: [main sdk](https://github.com/astra-one/ethastra-bridge.sdk), [bridge UI widget](https://github.com/astra-one/ethastra-bridge.ui-sdk)
* Swoop Dex: [interface](https://github.com/astra-one/swoop-interface), [cli](https://github.com/astra-one/swoop-cli), [sdk](https://github.com/astra-one/swoop-sdk), [deployment](https://github.com/astra-one/swoop-deployment), [misc](https://github.com/astra-one/swoop-misc), [lib](https://github.com/astra-one/swoop-lib), [periphery](https://github.com/astra-one/swoop-periphery), [core](https://github.com/astra-one/swoop-core), [testing](https://github.com/astra-one/swoop-testing), [utils](https://github.com/astra-one/swoop-utils)
* [Iris Bridge](https://github.com/astra-one/ethastra-bridge-v2): inspired from near's rainbow bridge
* [Animoca's BeastQuest Game](https://github.com/astra-one/BeastQuest)
* [Chainlink Testnet Integration Demo](https://github.com/astra-one/chainlink-demo-project)
* [NFT Store DApp](https://github.com/astra-one/nft-store)
* [old dapp-examples](https://github.com/astra-one/dapp-examples): some of them may be outdated!


# Installation

This library works on both nodejs and browser. Please use it according to your use case.

## Enviorment requirement

* Nodejs: 10.0+
* Browser: Latest Chrome and Firefox

## Install from npm/yarn

**Note: we added a @next tag to npm package, please use the following command to install with npm/yarn**

```bash

# npm
npm install @astra-js/core@next 

# yarn
yarn add @astra-js/core@next

# tslib is required, we'd better install it as well
npm install tslib
yarn add tslib

```

# Building from source files

## Install `lerna` and `typescript` globally

```bash
yarn global add lerna && yarn global add typescript
```
## Bootstrap and build

```bash
yarn bootstrap
```

## Bundle

Build `umd` and `esm` version javascript for each sub-packages, which can be accessed by `import` or `require`

```bash 
yarn dist
```
All files are exported in `packages/dist` folder, use `**.esm.js` or `**.umd.js` format


# Running Tests
## Unit tests
```bash
yarn test:src
```
## e2e tests

1. `.env` file defines configuration, edit if you have custom settings
   
2. Run astra node locally, follow the instructions: https://github.com/astra-one/astra
   
3. Wait for 1-2 mins, and run this:

```bash
yarn build && yarn test:e2e
```




