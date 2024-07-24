import { IAccount } from './account';
import { ICreditCard } from './creditCard';

export interface IUser {
  id: string;
  email: string;
  name: string;
  personalSpreadSheet: string;
  sheetIds: string[];
  creditCards: ICreditCard[];
  subscriptions: string[];
  accounts: IAccount[];
}
