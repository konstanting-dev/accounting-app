import { API_COLLECTION_URL } from './constants';
import { throwHttpException } from 'src/utils';

interface CreateDocumentResponse {
  transactionId: string;
  documentId: string;
}

export const createDocument = async (
  data: Record<string, unknown>
): Promise<CreateDocumentResponse> => {
  const response = await fetch(`${API_COLLECTION_URL}/document`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': process.env.IMMUDB_API_KEY,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  }

  await throwHttpException(response);
};
