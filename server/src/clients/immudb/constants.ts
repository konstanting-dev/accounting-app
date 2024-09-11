export const API_LEDGER_URL = `${process.env.IMMUDB_API_URI}${process.env.IMMUDB_API_LEDGER}`;

export const API_COLLECTION_URL = `${API_LEDGER_URL}/collection/${process.env.IMMUDB_API_COLLECTION}`;
