/**
 * @packageDocumentation
 * @module astra-core
 * @hidden
 */

import { HttpProvider, Messenger } from '@astra-js/network';
import { TransactionFactory, Transaction } from '@astra-js/transaction';
import { Wallet, Account } from '@astra-js/account';
import { ChainType, ChainID } from '@astra-js/utils';
import { Blockchain } from './blockchain';

export interface AstraModule {
  HttpProvider: HttpProvider;
  Messenger: Messenger;
  Blockchain: Blockchain;
  TransactionFactory: TransactionFactory;
  Wallet: Wallet;
  Transaction: Transaction;
  Account: Account;
}

export enum UrlType {
  http,
  ws,
}

export interface AstraSetting<T extends ChainType, I extends ChainID> {
  type: T;
  id: I;
}
