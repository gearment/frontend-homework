import { FieldErrors, FieldValues } from 'react-hook-form';

export const getErrorMessage = (name: string, errors: FieldErrors<FieldValues>) => {
    const error = name.split('.').reduce((obj, key) => (obj ? obj[key] : undefined), errors as any);
    return typeof error === 'object' ? (error.message as string) : '';
};
