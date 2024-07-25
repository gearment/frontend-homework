import { authApiKey } from './auth';
import { invoiceApiKey } from './invoice';

export const API_KEY = {
    ...authApiKey,
    ...invoiceApiKey,
};
