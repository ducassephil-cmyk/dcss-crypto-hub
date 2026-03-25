import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface TokenInfo {
    id: bigint;
    name: string;
    lastUpdate: bigint;
    price: number;
    symbol: string;
}
export interface Stats {
    cyclesConsumed: bigint;
    circulatingSupply: number;
    totalSupply: number;
    txCount: bigint;
    holders: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface Transaction {
    id: bigint;
    walletAddr: string;
    network: string;
    toAddr: string;
    tokenSymbol: string;
    fromAddr: string;
    timestamp: bigint;
    txType: string;
    amount: number;
}
export interface backendInterface {
    closeVault(id: bigint): Promise<void>;
    fetchExternalUrl(url: string): Promise<string>;
    getBridgeFee(sourceChain: string, destChain: string, amount: number): Promise<[number, bigint]>;
    getStats(): Promise<Stats>;
    getTokenPrices(): Promise<Array<TokenInfo>>;
    getTransactions(walletAddr: string): Promise<Array<Transaction>>;
    openVault(collateral: bigint): Promise<bigint>;
    recordTransaction(txType: string, tokenSymbol: string, amount: number, fromAddr: string, toAddr: string, network: string, walletAddr: string): Promise<bigint>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
