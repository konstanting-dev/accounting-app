import { API_LEDGER_URL } from './constants';
import { Collection } from './types';
import { throwHttpException } from 'src/utils';

export const getCollection = async (collectionName: string): Promise<Collection> => {
  const response = await fetch(`${API_LEDGER_URL}/collection/${collectionName}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': process.env.IMMUDB_API_KEY,
    },
  });
  if (response.ok) {
    return response.json();
  }

  if (response.status === 404) throw new Error('Collection not found');

  await throwHttpException(response);
};
