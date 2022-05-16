/**
 * @packageDocumentation
 * @module astra-crypto
 */

import { isAddress } from '@astra-js/utils';
import { toChecksumAddress } from './keyTool';

/**
 * ### How to use it?
 *
 * ```
 * // Step 1: import the class
 * const { AstraAddress } = require('@astra-js/crypto');
 *
 * // Step 2: call functions
 * const addr = '0xFF9a025FdC0fd4b68Ba4e9Bff46476de15ED8f4D'
 * const res = AstraAddress.isValidBasic(addr);
 * console.log(res);
 * ```
 */
export class AstraAddress {
  /**
   * @example
   * ```
   * const addr = '0xFF9a025FdC0fd4b68Ba4e9Bff46476de15ED8f4D'
   * const res = AstraAddress.isValidBasic(addr);
   * console.log(res);
   * ```
   */
  static isValidBasic(str: string) {
    const toTest = new AstraAddress(str);
    return toTest.raw === toTest.basic;
  }

  /**
   * @example
   * ```
   * const addr = '0xFF9a025FdC0fd4b68Ba4e9Bff46476de15ED8f4D'
   * const res = AstraAddress.isValidChecksum(addr);
   * console.log(res);
   * ```
   */
  static isValidChecksum(str: string) {
    const toTest = new AstraAddress(str);
    return toTest.raw === toTest.checksum;
  }

  raw: string;
  basic: string;

  /**
   * get basicHex of the address
   *
   * @example
   * ```
   * const addr = '0xFF9a025FdC0fd4b68Ba4e9Bff46476de15ED8f4D'
   * const instance = new AstraAddress(addr);
   * console.log(instance.basicHex);
   * ```
   */
  get basicHex() {
    return `0x${this.basic}`;
  }

  /**
   * @example
   * ```
   * const addr = '0xFF9a025FdC0fd4b68Ba4e9Bff46476de15ED8f4D'
   * const instance = new AstraAddress(addr);
   * console.log(instance.checksum);
   * ```
   */
  get checksum() {
    return toChecksumAddress(`0x${this.basic}`);
  }

  constructor(raw: string) {
    this.raw = raw;
    this.basic = this.getBasic(this.raw);
  }

  /**
   * Check whether the address has an valid address format
   *
   * @param addr string, the address
   *
   * @example
   * ```
   * const addr = '0xFF9a025FdC0fd4b68Ba4e9Bff46476de15ED8f4D'
   * const instance = new AstraAddress(addr);
   * const res = instance.getBasic(addr);
   * console.log(res)
   * ```
   */
  private getBasic(addr: string) {
    const basicBool = isAddress(addr);

    if (basicBool) {
      return addr.replace('0x', '').toLowerCase();
    }

    throw new Error(`"${addr}" is an invalid address format`);
  }
}

/**
 * Using this function to get Astra format address
 *
 * @param address
 *
 * @example
 * ```javascript
 * const { Astra } = require('@astra-js/core');
 * const { ChainID, ChainType } = require('@astra-js/utils');
 * const { randomBytes } = require('@astra-js/crypto')
 *
 * const astra = new Astra(
 *   'http://localhost:9500',
 *   {
 *   chainType: ChainType.Astra,
 *   chainId: ChainID.AstraLocal,
 *   },
 * );
 *
 * const bytes = randomBytes(20);
 * const hAddress = astra.crypto.getAddress(bytes);
 * console.log(hAddress)
 * ```
 */
export function getAddress(address: string) {
  try {
    return new AstraAddress(address);
  } catch (error) {
    throw error;
  }
}
