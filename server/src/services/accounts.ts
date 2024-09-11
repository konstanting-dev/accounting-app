import { ImmuDbClient } from 'src/clients';
import { SearchQuery } from 'src/clients/immudb/types';
import { APP_ERROR_MESSAGE, HttpStatusCode } from 'src/constants';
import { Account } from 'src/entities/account';
import { HttpException } from 'src/exceptions/exception';

interface ListAccountsParams {
  page: number;
  perPage: number;
  field?: string;
  value?: string;
}

interface CountAccountsParams {
  field?: string;
  value?: string;
}

export const listAccounts = async ({ page, perPage, field, value }: ListAccountsParams) => {
  let searchQuery: SearchQuery | null = null;

  if (field && value) {
    searchQuery = {
      expressions: [
        {
          fieldComparisons: [{ field, operator: 'EQ', value }],
        },
      ],
    };
  }

  return ImmuDbClient.listDocuments<Account>({
    page,
    perPage,
    ...(searchQuery && { query: searchQuery }),
  });
};

export const countAccounts = async ({ field, value }: CountAccountsParams) => {
  let searchQuery: SearchQuery | undefined = undefined;

  if (field && value) {
    searchQuery = {
      expressions: [
        {
          fieldComparisons: [{ field, operator: 'EQ', value }],
        },
      ],
    };
  }

  return ImmuDbClient.getDocumentsCount(searchQuery);
};

export const addAccount = async (accountData: Account) => {
  const { number } = accountData;

  const accountsWithExistingNumber = await ImmuDbClient.listDocuments<Account>({
    page: 1,
    perPage: 1,
    query: {
      expressions: [
        {
          fieldComparisons: [{ field: 'number', operator: 'EQ', value: number }],
        },
      ],
    },
  });

  if (accountsWithExistingNumber.revisions[0]) {
    throw new HttpException(HttpStatusCode.BAD_REQUEST, APP_ERROR_MESSAGE.accountExists);
  }

  return ImmuDbClient.createDocument(accountData);
};
