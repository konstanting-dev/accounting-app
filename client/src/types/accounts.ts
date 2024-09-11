export type AccountData = {
  number: string;
  name: string;
  iban: string;
  address?: string;
  amount?: number;
  type: 'SENDING' | 'RECEIVING';
};

export type Account = {
  _id: string;
} & AccountData;
