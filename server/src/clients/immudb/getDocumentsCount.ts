import { API_COLLECTION_URL } from './constants';
import { SearchQuery } from './types';
import { throwHttpException } from 'src/utils';

interface GetDocumentsCountResponse {
  collection: string;
  count: number;
}

export const getDocumentsCount = async (
  query?: SearchQuery
): Promise<GetDocumentsCountResponse> => {
  const response = await fetch(`${API_COLLECTION_URL}/documents/count`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': process.env.IMMUDB_API_KEY,
    },
    body: JSON.stringify(query || {}),
  });

  if (response.ok) {
    return response.json();
  }

  await throwHttpException(response);
};
