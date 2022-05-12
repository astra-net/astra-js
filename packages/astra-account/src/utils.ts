/**
 * @packageDocumentation
 * @module astra-account
 * @hidden
 */

import { HttpProvider, Messenger } from '@astra-js/network';
import { ChainType, ChainID } from '@astra-js/utils';

export const defaultMessenger = new Messenger(
  new HttpProvider('http://localhost:9500'),
  ChainType.Astra,
  ChainID.AstraLocal,
);
