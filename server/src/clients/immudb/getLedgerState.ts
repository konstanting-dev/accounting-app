import { API_LEDGER_URL } from './constants';

interface LedgerState {
  db: string;
  txId: string;
  txHash: string;
  signature: {
    publicKey: string;
    signature: string;
  };
  precommittedTxId: string;
  precommittedTxHash: string;
}

export const getLedgerState = (): Promise<LedgerState> =>
  fetch(`${API_LEDGER_URL}/state`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': process.env.IMMUDB_API_KEY,
    },
  }).then((value) => value.json());
