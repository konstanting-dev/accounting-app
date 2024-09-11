import { throwHttpException } from 'src/utils';
import { API_COLLECTION_URL } from './constants';
import { Document, SearchQuery } from './types';

interface ListDocumentsParams {
  searchId?: string;
  keepOpen?: boolean;
  query?: SearchQuery;
  page: number;
  perPage: number;
}

interface ListDocumentsResponse<T> {
  searchId: string;
  revisions: Document<T>[];
  page: number;
  perPage: number;
}

export async function listDocuments<T>(
  params: ListDocumentsParams
): Promise<ListDocumentsResponse<T>> {
  const response = await fetch(`${API_COLLECTION_URL}/documents/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': process.env.IMMUDB_API_KEY,
    },
    body: JSON.stringify(params),
  });

  if (response.ok) {
    return response.json();
  }

  await throwHttpException(response);
}
