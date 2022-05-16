/**
 * @packageDocumentation
 * @ignore
 */

import { getAddress, AstraAddress } from '../src/address';
import { randomBytes } from '../src/random';
import { toChecksumAddress, isValidChecksumAddress } from '../src/keyTool';
const bytes = randomBytes(20);
const bytesWith0x = '0x' + bytes;
const checksum = toChecksumAddress(bytesWith0x);

describe('test address', () => {
  it('should test address', () => {
    const address = new AstraAddress(bytes);
    expect(address.basic).toEqual(bytes);
    expect(address.basicHex).toEqual(bytesWith0x);
    expect(address.checksum).toEqual(checksum);
    expect(getAddress(bytes).basic).toEqual(bytes);
    expect(getAddress(bytes).basicHex).toEqual(bytesWith0x);
    expect(getAddress(bytes).checksum).toEqual(checksum);
    expect(AstraAddress.isValidBasic(bytes)).toEqual(true);
    expect(AstraAddress.isValidChecksum(checksum)).toEqual(true);
    expect(isValidChecksumAddress(checksum)).toEqual(true);
    try {
      // tslint:disable-next-line: no-unused-expression
      getAddress('111').checksum;
    } catch (error) {
      expect(error.message).toEqual(`"111" is an invalid address format`);
    }
  });
});
