/**
 * @packageDocumentation
 * @module astra-transaction
 * @ignore
 */

import { Transaction } from '../src/transaction';
import { RLPSign } from '../src/utils';
import { TxStatus } from '../src/types';
import { HttpProvider, Messenger } from '@astra-js/network';
import { isAddress, ChainType, hexToBN, ChainID, isValidAddress } from '@astra-js/utils';
import { getAddressFromPrivateKey, getAddress } from '@astra-js/crypto';

import txnVectors from './transactions.fixture.json';
import reTxnVectors from './transactions.remake.fixture.json';
import { TransactionFactory } from '../src';

const provider = new HttpProvider('http://localhost:9500');

describe('test sign tranction', () => {
  it('should test sign transaction with ETH settings', () => {
    const ethMessenger = new Messenger(provider, ChainType.Ethereum, ChainID.Default);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < txnVectors.length; i += 1) {
      const vector: any = txnVectors[i];
      const address = getAddressFromPrivateKey(vector.privateKey);

      expect(isAddress(address)).toEqual(true);
      expect(address).toEqual(vector.accountAddress);

      const transaction: Transaction = new Transaction(
        {
          gasLimit: vector.gasLimit,
          gasPrice: vector.gasPrice,
          to: vector.to ? getAddress(vector.to).checksum : '0x',
          value: vector.value,
          data: vector.data,
          nonce: vector.nonce,
        },
        ethMessenger,
        TxStatus.INTIALIZED,
      );

      const unsigned = transaction.getRLPUnsigned();
      expect(unsigned[0]).toEqual(vector.unsignedTransaction);
      const signed = RLPSign(transaction, vector.privateKey);
      expect(signed[1]).toEqual(vector.signedTransaction);
    }
  });

  it('should test sign transaction with Astra settings', () => {
    const astraMessenger = new Messenger(provider, ChainType.Astra, ChainID.Default);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < reTxnVectors.length; i += 1) {
      const vector: any = reTxnVectors[i];
      const address = getAddressFromPrivateKey(vector.privateKey);

      expect(isValidAddress(address)).toEqual(true);
      expect(address).toEqual(vector.accountAddress);
      try {
        Transaction.normalizeAddress(getAddress(address).basicHex);
      } catch (error) {
        expect(error.message).toEqual('Address format is not supported');
      }

      const transaction: Transaction = new Transaction(
        {
          gasLimit: vector.gasLimit,
          gasPrice: vector.gasPrice,
          to: vector.to ? vector.toChecksumAddress : '0x',
          value: vector.value,
          data: vector.data,
          nonce: vector.nonce,
        },
        astraMessenger,
        TxStatus.INTIALIZED,
      );
      transaction.setMessenger(astraMessenger);

      const unsigned = transaction.getRLPUnsigned();

      expect(unsigned[0]).toEqual(vector.unsignedTransaction);
      const signed = RLPSign(transaction, vector.privateKey);
      expect(signed[1]).toEqual(vector.signedTransaction);
    }
  });

  it('should test recover from ETHSignedtransaction', () => {
    const ethMessenger = new Messenger(provider, ChainType.Ethereum, ChainID.Default);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < txnVectors.length; i += 1) {
      const vector = txnVectors[i];

      const transaction: Transaction = new Transaction({}, ethMessenger, TxStatus.INTIALIZED);

      transaction.recover(vector.signedTransaction);

      if (vector.gasLimit && vector.gasLimit !== '0x') {
        expect(transaction.txParams.gasLimit.toString()).toEqual(
          hexToBN(vector.gasLimit).toString(),
        );
      }
      if (vector.gasPrice && vector.gasPrice !== '0x') {
        expect(transaction.txParams.gasPrice.toString()).toEqual(
          hexToBN(vector.gasPrice).toString(),
        );
      }
      if (vector.nonce && vector.nonce !== '0x') {
        expect(transaction.txParams.nonce).toEqual(hexToBN(vector.nonce).toNumber());
      }
      if (vector.data) {
        expect(transaction.txParams.data).toEqual(vector.data);
      }
      if (vector.value && vector.value !== '0x') {
        expect(transaction.txParams.value.toString()).toEqual(hexToBN(vector.value).toString());
      }
      if (vector.to && vector.to !== '0x') {
        expect(transaction.txParams.to).toEqual(getAddress(vector.to).checksum);
      }
      expect(transaction.txParams.from.toLowerCase()).toEqual(vector.accountAddress.toLowerCase());
    }
  });
  it('should test recover from AstraSignedTransaction', () => {
    const astraMessenger = new Messenger(provider, ChainType.Astra, ChainID.Default);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < reTxnVectors.length; i += 1) {
      const vector = reTxnVectors[i];
      const factory = new TransactionFactory(astraMessenger);
      factory.setMessenger(astraMessenger);
      const transaction: Transaction = factory.recover(vector.signedTransaction);

      if (vector.gasLimit && vector.gasLimit !== '0x') {
        expect(transaction.txParams.gasLimit.toString()).toEqual(
          hexToBN(vector.gasLimit).toString(),
        );
      }
      if (vector.gasPrice && vector.gasPrice !== '0x') {
        expect(transaction.txParams.gasPrice.toString()).toEqual(
          hexToBN(vector.gasPrice).toString(),
        );
      }
      if (vector.nonce && vector.nonce !== '0x') {
        expect(transaction.txParams.nonce).toEqual(hexToBN(vector.nonce).toNumber());
      }
      if (vector.data) {
        expect(transaction.txParams.data).toEqual(vector.data);
      }
      if (vector.value && vector.value !== '0x') {
        expect(transaction.txParams.value.toString()).toEqual(hexToBN(vector.value).toString());
      }
      if (vector.to && vector.to !== '0x') {
        expect(getAddress(transaction.txParams.to).checksum).toEqual(
          getAddress(vector.to).checksum,
        );
      }
      expect(getAddress(transaction.txParams.from).checksum.toLowerCase()).toEqual(
        getAddress(vector.accountAddress).checksum.toLowerCase(),
      );
    }
  });
  it('should test transactionFactory', () => {
    const astraMessenger = new Messenger(provider, ChainType.Astra, ChainID.Default);
    const factory = new TransactionFactory(astraMessenger);
    factory.setMessenger(astraMessenger);
    const txn = factory.newTx({});
    expect(txn.getRLPUnsigned()[0]).toBeTruthy();
    const txn2 = factory.newTx({}, true);
    expect(txn2.getRLPUnsigned()[0]).toBeTruthy();
  });
});
