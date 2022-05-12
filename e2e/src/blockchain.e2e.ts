import { astra } from './astra';

import demoAccounts from '../fixtures/testAccount.json';

const bc = astra.blockchain;

const testAccount = demoAccounts.Accounts[1];

describe('e2e test blockchain', () => {
  // net_*
  it('should test net_peerCount', async () => {
    const peerCount = await bc.net_peerCount();
    expect(astra.utils.isHex(peerCount.result)).toEqual(true);
  });

  it('should test net_version', async () => {
    const netVersion = await bc.net_version();
    const versionNumber = parseInt(netVersion.result as string, 10);
    expect(netVersion.result).toEqual(`${versionNumber}`);
  });
  it('should test astra_protocolVersion', async () => {
    const protocolVersion = await bc.getProtocolVersion();
    expect(astra.utils.isHex(protocolVersion.result)).toEqual(true);
  });

  // block chain info
  it('should test astra_blockNumber', async () => {
    const res = await bc.getBlockNumber();
    expect(res.responseType).toEqual('raw');
    expect(astra.utils.isHex(res.result)).toEqual(true);
  });
  it('should test astra_getBlockByNumber', async () => {
    const res = await bc.getBlockByNumber({ blockNumber: 'latest' });
    const size = res.result.size;
    expect(res.responseType).toEqual('raw');
    expect(astra.utils.isHex(size)).toEqual(true);
    expect(checkBlockData(res.result)).toEqual(true);
    const res2 = await bc.getBlockByNumber({ blockNumber: res.result.number });
    expect(res2.responseType).toEqual('raw');
    expect(astra.utils.isHex(res2.result.size)).toEqual(true);
    expect(checkBlockData(res2.result)).toEqual(true);
    const res3 = await bc.getBlockByNumber({ returnObject: true });
    expect(res3.responseType).toEqual('raw');
    expect(checkBlockData(res3.result)).toEqual(true);
  });

  it('should test astra_getBlockByHash', async () => {
    const latestBlock = await bc.getBlockByNumber({ blockNumber: 'latest' });
    const res = await bc.getBlockByHash({ blockHash: latestBlock.result.hash });
    expect(res.responseType).toEqual('raw');
    expect(latestBlock.result.hash).toEqual(res.result.hash);
    expect(astra.utils.isHex(res.result.size)).toEqual(true);
    expect(checkBlockData(res.result)).toEqual(true);
  });

  // account related
  it('should test astra_getBalance', async () => {
    const balance = await bc.getBalance({ address: testAccount.Address });
    expect(astra.utils.isHex(balance.result)).toEqual(true);
  });
});

function checkBlockData(data: any) {
  return astra.utils.validateArgs(
    data,
    {
      difficulty: [astra.utils.isNumber],
      // tslint:disable-next-line: no-shadowed-variable
      extraData: [(data: any) => data === '0x' || astra.utils.isHex(data)],
      gasLimit: [astra.utils.isHex],
      gasUsed: [astra.utils.isHex],
      hash: [astra.utils.isHash],
      logsBloom: [astra.utils.isHex],
      miner: [astra.utils.isBech32Address],
      mixHash: [astra.utils.isHash],
      nonce: [astra.utils.isNumber],
      number: [astra.utils.isHex],
      parentHash: [astra.utils.isHash],
      receiptsRoot: [astra.utils.isHash],
      size: [astra.utils.isHex],
      stateRoot: [astra.utils.isHash],
      timestamp: [astra.utils.isHex],
      transactionsRoot: [astra.utils.isHash],
      uncles: [astra.utils.isArray],
    },
    { transactions: [astra.utils.isArray] },
  );
}
