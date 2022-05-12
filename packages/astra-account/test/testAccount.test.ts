/**
 * @packageDocumentation
 * @module astra-account
 * @ignore
 */

import { Account } from '../src/account';
import { HttpProvider, Messenger } from '@astra-js/network';
import { ChainType, ChainID } from '@astra-js/utils';

const provider = new HttpProvider('http://localhost:9500');
const messenger = new Messenger(provider, ChainType.Astra, ChainID.AstraLocal);

describe('test account', () => {
  it('test Account.getBalance returns object that implements Balance interface', () => {
    const acc = Account.new();
    acc.setMessenger(messenger);
    acc.getBalance().then((res) => {
      expect(res).not.toBeNull();
      expect(res.balance).not.toBeNull();
      expect(res.nonce).not.toBeNull();
      expect(res.shardID).not.toBeNull();
    });
  });
});
