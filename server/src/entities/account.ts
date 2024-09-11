export type Account = {
  number: string;
  name: string;
  iban: string;
  address?: string;
  amount: number;
  type: 'SENDING' | 'RECEIVING';
};
