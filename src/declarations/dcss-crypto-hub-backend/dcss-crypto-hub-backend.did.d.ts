import type { Principal } from '@icp-sdk/core/principal';
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';

export interface Stats {
  'cyclesConsumed' : bigint,
  'circulatingSupply' : number,
  'totalSupply' : number,
  'txCount' : bigint,
  'holders' : bigint,
}
export interface TokenInfo {
  'id' : bigint,
  'name' : string,
  'lastUpdate' : bigint,
  'price' : number,
  'symbol' : string,
}
export interface Transaction {
  'id' : bigint,
  'walletAddr' : string,
  'network' : string,
  'toAddr' : string,
  'tokenSymbol' : string,
  'fromAddr' : string,
  'timestamp' : bigint,
  'txType' : string,
  'amount' : number,
}
export interface TransformationInput {
  'context' : Uint8Array | number[],
  'response' : http_request_result,
}
export interface TransformationOutput {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<http_header>,
}
export interface http_header { 'value' : string, 'name' : string }
export interface http_request_result {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<http_header>,
}
export interface _SERVICE {
  'closeVault' : ActorMethod<[bigint], undefined>,
  'fetchExternalUrl' : ActorMethod<[string], string>,
  'getBridgeFee' : ActorMethod<[string, string, number], [number, bigint]>,
  'getStats' : ActorMethod<[], Stats>,
  'getTokenPrices' : ActorMethod<[], Array<TokenInfo>>,
  'getTransactions' : ActorMethod<[string], Array<Transaction>>,
  'openVault' : ActorMethod<[bigint], bigint>,
  'recordTransaction' : ActorMethod<
    [string, string, number, string, string, string, string],
    bigint
  >,
  'transform' : ActorMethod<[TransformationInput], TransformationOutput>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
