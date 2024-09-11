import { ImmuDbClient } from 'src/clients';
import { CreateCollectionParams } from 'src/clients/immudb/types';

const ACCOUNT_COLLECTION_PARAMS: CreateCollectionParams = {
  fields: [
    {
      name: 'name',
    },
    {
      name: 'number',
    },
    {
      name: 'iban',
    },
    {
      name: 'address',
    },
    {
      name: 'amount',
      type: 'INTEGER',
    },
    {
      name: 'type',
    },
  ],
  indexes: [
    {
      fields: ['number'],
      isUnique: true,
    },
    {
      fields: ['name'],
      isUnique: false,
    },
    {
      fields: ['iban'],
      isUnique: false,
    },
  ],
};

export const init = async () => {
  try {
    const collection = await ImmuDbClient.getCollection(process.env.IMMUDB_API_COLLECTION);

    return collection;
  } catch (err) {
    if (err instanceof Error && err.message === 'Collection not found') {
      return ImmuDbClient.createCollection(
        process.env.IMMUDB_API_COLLECTION,
        ACCOUNT_COLLECTION_PARAMS
      );
    }

    throw err;
  }
};
