# @astra-js/staking

This package provides a collection of apis to create, sign/send staking transaction, and receive confirm/receipt.

## Installation

```
npm install @astra-js/staking
```

## Usage

Create a Astra instance connecting to testnet

```javascript
const { Astra } = require('@astra-js/core');
const {
  ChainID,
  ChainType,
  hexToNumber,
  numberToHex,
  fromWei,
  Units,
  Unit,
} = require('@astra-js/utils');

const astra = new Astra(
    'https://rpc.s0.t.astranetwork.com/',
    {
        chainType: ChainType.Astra,
        chainId: ChainID.AstraTestnet,
    },
);
```
Below, examples show how to send delegate, undelegate, and collect rewards staking transactions. First, set the chainId, gasLimit, gasPrice for all subsequent staking transactions
```javascript
astra.stakings.setTxParams({
  gasLimit: 25000,
  gasPrice: numberToHex(new astra.utils.Unit('1').asGwei().toWei()),
  chainId: 2
});
```
<span style="color:red">Note: create and edit validator transactions are not fully supported in the sdk</span>

Create delegate staking transaction
```javascript
const delegate = astra.stakings.delegate({
  delegatorAddress: '0xFF9a025FdC0fd4b68Ba4e9Bff46476de15ED8f4D',
  validatorAddress: '0x62400ea1a21468ADad8dfe8AC7dDc5a46fb29633',
  amount: numberToHex(new Unit(1000).asOne().toWei())
});
const delegateStakingTx = delegate.build();
```

Sign and send the delegate transaction and receive confirmation
```javascript
// key corresponds to 0xFF9a025FdC0fd4b68Ba4e9Bff46476de15ED8f4D, only has testnet balance
astra.wallet.addByPrivateKey('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');

astra.wallet.signStaking(delegateStakingTx).then(signedTxn => {
  signedTxn.sendTransaction().then(([tx, hash]) => {
    console.log(hash);
    signedTxn.confirm(hash).then(response => {
      console.log(response.receipt);
    });
  });
});
```

Similarily, undelegate and collect reward transactions can be composed, signed and sent
Create undelegate staking transaction
```javascript
const undelegate = astra.stakings.undelegate({
  delegatorAddress: '0xFF9a025FdC0fd4b68Ba4e9Bff46476de15ED8f4D',
  validatorAddress: '0x62400ea1a21468ADad8dfe8AC7dDc5a46fb29633',
  amount: numberToHex(new Unit(1000).asOne().toWei())
});
const undelegateStakingTx = undelegate.build();
```

Create collect rewards staking transaction
```javascript
const collectRewards = astra.stakings.collectRewards({
  delegatorAddress: '0xFF9a025FdC0fd4b68Ba4e9Bff46476de15ED8f4D'
});
const collectRewardsStakingTx = collectRewards.build();
```

Also, similar to normal transaction, signing and sending can be performed asynchronously.