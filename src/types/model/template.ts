import { Assign } from '@/types';

export interface ITemplate {
    id: string;
    code: string;
    name: string;
    is_active: boolean;
    note: string;
}

export type TTemplateFormValues = Assign<
    ITemplate,
    {
        id?: string;
        note?: string;
    }
>;
