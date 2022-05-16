import { astra } from './astra';
import txnJsons from '../fixtures/transactions.json';

const messenger = astra.messenger;

interface TransactionInfo {
  blockHash: string;
  index: string;
  blockNumber: string;
}

describe('e2e test transactions by RPC Method', () => {
  const txnHashesFixtures: any = [];
  const transactionInfoList: any = [];
  // net_*
  it('should test astra_sendRawTransaction', async () => {
    const { transactions } = txnJsons;

    for (const txn of transactions) {
      const sent = await messenger.send('astra_sendRawTransaction', txn.rawTransaction);
      expect(astra.utils.isHash(sent.result)).toEqual(true);
      txnHashesFixtures.push(sent.result);
    }
  });
  it('should test astra_getTransactionByHash', async () => {
    for (const txnHash of txnHashesFixtures) {
      const txnDetail = await astra.blockchain.getTransactionByHash({
        txnHash,
      });
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.hash).toEqual(txnHash);

        const transactionInfo = {
          blockHash: txnDetail.result.blockHash,
          blockNumber: txnDetail.result.blockNumber,
          index: txnDetail.result.transactionIndex,
        };
        transactionInfoList.push(transactionInfo);
      }
    }
  });
  it('should test astra_getTransactionByBlockHashAndIndex', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnDetail: any = await astra.blockchain.getTransactionByBlockHashAndIndex({
        blockHash: transactionInfo.blockHash,
        index: transactionInfo.index,
      });
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.blockHash).toEqual(transactionInfo.blockHash);
        expect(txnDetail.result.transactionIndex).toEqual(transactionInfo.index);
      }
    }
  });
  it('should test astra_getTransactionByBlockNumberAndIndex', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnDetail: any = await astra.blockchain.getTransactionByBlockNumberAndIndex({
        blockNumber: transactionInfo.blockNumber,
        index: transactionInfo.index,
      });
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.blockNumber).toEqual(transactionInfo.blockNumber);
        expect(txnDetail.result.transactionIndex).toEqual(transactionInfo.index);
      }
    }
  });
  it('should test astra_getTransactionCountByHash', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnCount: any = await astra.blockchain.getBlockTransactionCountByHash({
        blockHash: transactionInfo.blockHash,
      });
      expect(astra.utils.isHex(txnCount.result)).toEqual(true);
    }
  });
  it('should test astra_getTransactionCountByNumber', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnCount: any = await astra.blockchain.getBlockTransactionCountByNumber({
        blockNumber: transactionInfo.blockNumber,
      });
      expect(astra.utils.isHex(txnCount.result)).toEqual(true);
    }
  });
  it('should test astra_getTransactionReceipt', async () => {
    const { transactions } = txnJsons;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < txnHashesFixtures.length; i += 1) {
      const txnHash = txnHashesFixtures[i];
      const receipt: any = await astra.blockchain.getTransactionReceipt({
        txnHash,
      });

      if (receipt.result !== null) {
        expect(checkTransactionReceipt(receipt.result)).toEqual(true);
        expect(astra.crypto.getAddress(receipt.result.from).checksum).toEqual(
          transactions[i].senderAddress,
        );
        expect(astra.crypto.getAddress(receipt.result.to).checksum).toEqual(
          transactions[i].receiverAddress,
        );
        expect(receipt.result.blockHash).toEqual(transactionInfoList[i].blockHash);
        expect(receipt.result.blockNumber).toEqual(transactionInfoList[i].blockNumber);
        expect(receipt.result.transactionIndex).toEqual(transactionInfoList[i].index);
      }
    }
  });
  it('should test astra_getTransactionCount', async () => {
    const { transactions } = txnJsons;

    for (let i = 0; i < transactionInfoList; i += 1) {
      const transactionInfo: TransactionInfo = transactionInfoList[i];
      const nonce: any = await astra.blockchain.getTransactionCount({
        address: transactions[i].senderAddress,
        blockNumber: transactionInfo.blockNumber,
      });
      expect(nonce.result).toEqual(transactions[i].nonce);
    }
  });
});

function checkTransactionDetail(data: any) {
  return astra.utils.validateArgs(
    data,
    {
      blockHash: [astra.utils.isHash],
      blockNumber: [astra.utils.isHex],
      // tslint:disable-next-line: no-shadowed-variable
      from: [astra.utils.isValidAddress],
      gas: [astra.utils.isHex],
      gasPrice: [astra.utils.isHex],
      hash: [astra.utils.isHash],
      // tslint:disable-next-line: no-shadowed-variable
      input: [(data: any) => data === '0x' || astra.utils.isHex(data)],
      nonce: [astra.utils.isHex],
      // tslint:disable-next-line: no-shadowed-variable
      to: [(data: any) => data === '0x' || astra.utils.isValidAddress(data)],
      transactionIndex: [astra.utils.isHex],
      value: [astra.utils.isHex],
      v: [astra.utils.isHex],
      r: [astra.utils.isHex],
      s: [astra.utils.isHex],
    },
    {},
  );
}

function checkTransactionReceipt(data: any) {
  return astra.utils.validateArgs(
    data,
    {
      blockNumber: [astra.utils.isHex],
      contractAddress: [
        // tslint:disable-next-line: no-shadowed-variable
        (data: any) => data === null || astra.utils.isValidAddress,
      ],
      cumulativeGasUsed: [astra.utils.isHex],
      from: [astra.utils.isValidAddress],
      gasUsed: [astra.utils.isHex],
      logs: [astra.utils.isArray],
      logsBloom: [astra.utils.isHex],

      shardID: [astra.utils.isNumber],
      // tslint:disable-next-line: no-shadowed-variable
      to: [(data: any) => data === '0x' || astra.utils.isValidAddress],
      transactionHash: [astra.utils.isHash],
      transactionIndex: [astra.utils.isHex],
    },
    { blockHash: [astra.utils.isHash], root: [astra.utils.isHash] },
  );
}
