import { API_LEDGER_URL } from './constants';
import { CreateCollectionParams } from './types';
import { throwHttpException } from 'src/utils';

export const createCollection = async (collectionName: string, params: CreateCollectionParams) => {
  const response = await fetch(`${API_LEDGER_URL}/collection/${collectionName}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': process.env.IMMUDB_API_KEY,
    },
    body: JSON.stringify(params),
  });

  if (response.ok) {
    return { name: process.env.IMMUDB_API_COLLECTION };
  }

  await throwHttpException(response);
};
