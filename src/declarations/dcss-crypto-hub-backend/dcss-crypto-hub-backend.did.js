export const idlFactory = ({ IDL }) => {
  const Stats = IDL.Record({
    'cyclesConsumed' : IDL.Nat,
    'circulatingSupply' : IDL.Float64,
    'totalSupply' : IDL.Float64,
    'txCount' : IDL.Nat,
    'holders' : IDL.Nat,
  });
  const TokenInfo = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'lastUpdate' : IDL.Int,
    'price' : IDL.Float64,
    'symbol' : IDL.Text,
  });
  const Transaction = IDL.Record({
    'id' : IDL.Nat,
    'walletAddr' : IDL.Text,
    'network' : IDL.Text,
    'toAddr' : IDL.Text,
    'tokenSymbol' : IDL.Text,
    'fromAddr' : IDL.Text,
    'timestamp' : IDL.Int,
    'txType' : IDL.Text,
    'amount' : IDL.Float64,
  });
  const http_header = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const http_request_result = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(http_header),
  });
  const TransformationInput = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : http_request_result,
  });
  const TransformationOutput = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(http_header),
  });
  return IDL.Service({
    'closeVault' : IDL.Func([IDL.Nat], [], []),
    'fetchExternalUrl' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getBridgeFee' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Float64],
        [IDL.Float64, IDL.Nat],
        ['query'],
      ),
    'getStats' : IDL.Func([], [Stats], ['query']),
    'getTokenPrices' : IDL.Func([], [IDL.Vec(TokenInfo)], ['query']),
    'getTransactions' : IDL.Func([IDL.Text], [IDL.Vec(Transaction)], ['query']),
    'openVault' : IDL.Func([IDL.Nat], [IDL.Nat], []),
    'recordTransaction' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Float64,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
        ],
        [IDL.Nat],
        [],
      ),
    'transform' : IDL.Func(
        [TransformationInput],
        [TransformationOutput],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
