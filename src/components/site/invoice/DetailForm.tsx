import InputControl from '@/components/controls/input/InputControl';
import InputNumberControl from '@/components/controls/input/InputNumberControl';
import TableFormControl from '@/components/controls/table/TableFormControl';
import { IInvoiceDetail } from '@/types';
import { ColumnType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const defaultValue = {
    name: undefined,
    unit: undefined,
    quantity: undefined,
    price: undefined,
    total: 0,
};

export interface IDetailTableFormProps {
    name: string;
    label: React.ReactNode;
    disabled: boolean;
}

function DetailTableForm(props: IDetailTableFormProps) {
    const { name, label, disabled } = props;

    const t = useTranslations('Invoice.form.details');

    const { setValue, getValues } = useFormContext();

    const onBlurCal = (index: number) => () => {
        const price = getValues(`${name}[${index}].price`) || 0;
        const quantity = getValues(`${name}[${index}].quantity`) || 0;

        setValue(`${name}[${index}].total`, price * quantity);
    };

    const columns: ColumnType<IInvoiceDetail>[] = [
        {
            align: 'left',
            title: t('name.title'),
            dataIndex: 'name',
            key: 'name',
            width: 300,
            render: (_, __, index) => <InputControl name={`${name}[${index}].name`} toggleError />,
        },
        {
            align: 'left',
            title: t('quantity.title'),
            dataIndex: 'quantity',
            key: 'quantity',
            width: 300,
            render: (_, __, index) => <InputNumberControl name={`${name}[${index}].quantity`} onBlurCallBack={onBlurCal(index)} toggleError />,
        },
        {
            align: 'left',
            title: t('unit.title'),
            dataIndex: 'unit',
            key: 'unit',
            width: 300,
            render: (_, __, index) => <InputControl name={`${name}[${index}].unit`} toggleError />,
        },
        {
            align: 'left',
            title: t('price.title'),
            dataIndex: 'price',
            key: 'price',
            width: 300,
            render: (_, __, index) => (
                <InputNumberControl
                    name={`${name}[${index}].price`}
                    onBlurCallBack={onBlurCal(index)}
                    toggleError
                    childProps={{
                        suffix: 'BGN',
                    }}
                />
            ),
        },
        {
            align: 'left',
            title: t('total.title'),
            dataIndex: 'total',
            key: 'total',
            width: 300,
            render: (_, __, index) => <InputNumberControl name={`${name}[${index}].total`} toggleError childProps={{ disabled: true, suffix: 'BGN' }} />,
        },
    ];

    return (
        <TableFormControl
            disabled={disabled}
            name={name}
            label={label}
            defaultValue={defaultValue}
            columns={columns as any}
            tableProps={{
                pagination: false,
                bordered: true,
            }}
            focusFieldAfterAdd="name"
        />
    );
}

export default DetailTableForm;
