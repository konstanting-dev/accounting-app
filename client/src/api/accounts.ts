import api from './apiService';

import { Account, AccountData } from 'src/types/accounts';

interface GetAccountsParams {
  page: number;
  pageSize: number;
  field?: string;
  value?: string;
}

interface GetAccountsCountParams {
  field?: string;
  value?: string;
}

export const getAccounts = async ({ page, pageSize, field, value }: GetAccountsParams) => {
  let queryString = `?page=${page + 1}&perPage=${pageSize}`;

  if (value && field) {
    queryString += `&field=${field}&value=${value}`;
  }
  const { data } = await api.get<Account[]>(`/accounts${queryString}`);

  return data;
};

export const getAccountsCount = async ({ field, value }: GetAccountsCountParams) => {
  let queryString = '';

  if (value && field) {
    queryString += `?field=${field}&value=${value}`;
  }
  const { data } = await api.get<{ count: number }>(`/accounts/count${queryString}`);

  return data;
};

interface AddAccountResponse {
  documentId: string;
}

export const addAccount = async ({ accountData }: { accountData: AccountData }) => {
  const { data } = await api.post<AddAccountResponse>(`/accounts`, accountData);

  return data;
};
