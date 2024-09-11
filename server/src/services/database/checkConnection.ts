import dotenv from 'dotenv';
import { ImmuDbClient } from 'src/clients';

export const checkConnection = () => ImmuDbClient.getLedgerState();
