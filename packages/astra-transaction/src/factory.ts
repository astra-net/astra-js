/**
 * ## hhahaha
 *
 * @packageDocumentation
 * @module astra-transaction
 */

import { getContractAddress, getAddress } from '@astra-js/crypto';
import { Messenger } from '@astra-js/network';
import { Transaction } from './transaction';
import { ShardingTransaction } from './shardingTransaction';
import { TxParams, TxStatus } from './types';

export class TransactionFactory {
  static getContractAddress(tx: Transaction) {
    const { from, nonce } = tx.txParams;
    return getAddress(
      getContractAddress(getAddress(from).checksum, Number.parseInt(`${nonce}`, 10)),
    ).checksum;
  }

  messenger: Messenger;
  constructor(messenger: Messenger) {
    this.messenger = messenger;
  }
  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  /**
   * Create a new Transaction
   * @params
   * ```
   * // to: Address of the receiver
   * // value: value transferred in wei
   * // gasLimit: the maximum gas would pay, can use string
   * // shardID: send token from shardID
   * // toShardId: send token to shardID
   * // gasPrice: you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
   * ```
   *
   * @example
   * ```javascript
   * const txn = astra.transactions.newTx({
   *   to: '0xd6ba69DA5b45eC98b53e3258d7DE756a567B6763',
   *   value: '10000',
   *   gasLimit: '210000',
   *   shardID: 0,
   *   toShardID: 0,
   *   gasPrice: new astra.utils.Unit('100').asGwei().toWei(),
   * });
   * ```
   */
  newTx(txParams?: TxParams | any, sharding: boolean = false): Transaction {
    if (!sharding) {
      return new Transaction(txParams, this.messenger, TxStatus.INTIALIZED);
    }
    return new ShardingTransaction(txParams, this.messenger, TxStatus.INTIALIZED);
  }

  /**
   * clone the transaction
   *
   * @param transaction
   *
   * @example
   * ```javascript
   * const cloneTxn = astra.transactions.clone(txn);
   * console.log(cloneTxn)
   * ```
   */
  clone(transaction: Transaction): Transaction {
    return new Transaction(transaction.txParams, this.messenger, TxStatus.INTIALIZED);
  }

  /**
   *
   * @example
   * ```javascript
   * txHash = '0xf8698085174876e8008252088080949d72989b68777a1f3ffd6f1db079f1928373ee52830186a08027a0ab8229ff5d5240948098f26372eaed9ab2e9be23e8594b08e358ca56a47f8ae9a0084e5c4d1fec496af444423d8a714f65c079260ff01a1be1de7005dd424adf44'
   *
   * const recoverTx = astra.transactions.recover(txHash);
   * console.log(recoverTx);
   * ```
   */
  recover(txHash: string): Transaction {
    const newTxn = new Transaction({}, this.messenger, TxStatus.INTIALIZED);
    newTxn.recover(txHash);
    return newTxn;
  }
}
