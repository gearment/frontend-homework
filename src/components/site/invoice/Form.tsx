import DatePickerControl from '@/components/controls/date-picker/DatePickerControl';
import TextAreaControl from '@/components/controls/input/InputTextAreaControl';
import SelectControl from '@/components/controls/select/SelectControl';
import SwitchControl from '@/components/controls/switch/SwitchControl';
import FormWrapper from '@/components/shared/wrapper/FormWrapper';
import DetailTableForm from '@/components/site/invoice/DetailForm';
import { contractorOptions, paymentMethodOptions, statusOptions, typeOptions } from '@/data/common/site/invoice';
import { useConfirmModal } from '@/hooks/use-confirm';
import { IInvoice, TAction, TInvoiceFormValues } from '@/types';
import { formatNumberV2 } from '@/utils';
import { ProCard } from '@ant-design/pro-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface IInvoiceFormProps {
    action: TAction;
    data?: IInvoice;
    loading: boolean;
    onSuccess: (data: TInvoiceFormValues) => void;
}

function Form(props: IInvoiceFormProps) {
    const { data, action, loading, onSuccess } = props;

    const disabled = useMemo(() => action === 'view', [action]);

    const confirmModal = useConfirmModal();

    const tCF = useTranslations('Common.form.validate');
    const tM = useTranslations('Invoice');
    const tF = useTranslations('Invoice.form');

    const schema: yup.ObjectSchema<TInvoiceFormValues> = useMemo(() => {
        return yup.object({
            id: yup.string().optional(),
            billedTo: yup
                .string()
                .required(tCF('string.required'))
                .max(524, tCF('string.max', { max: 524 })),
            invoiceDate: yup.date().optional(),
            dueDate: yup.date().optional(),
            paymentMethod: yup.string().required(tCF('string.required')),
            type: yup.string().required(tCF('string.required')),
            status: yup.string().required(tCF('string.required')),
            vat: yup.boolean().optional(),
            note: yup.string().optional(),
            details: yup.array(
                yup.object({
                    name: yup.string().required(tCF('string.required')),
                    quantity: yup.number().required(tCF('number.required')),
                    unit: yup.string().required(tCF('string.required')),
                    price: yup.number().required(tCF('number.required')),
                    total: yup.number().required(tCF('number.required')),
                }),
            ),
        });
    }, [tCF]);

    const method = useForm<TInvoiceFormValues>({
        defaultValues: { billedTo: '', vat: false },
        resolver: yupResolver(schema),
    });

    const { setValue, handleSubmit, watch } = method;

    const onSubmit = (data: TInvoiceFormValues) => {
        confirmModal.confirmSave({
            onOk() {
                onSuccess(data);
            },
        });
    };

    const total = useMemo(() => watch('details')?.reduce((prev, cur) => prev + (cur.total || 0), 0), [watch]);
    console.log('🚀 ~ Form ~ total:', total);

    useEffect(() => {
        if (!data) return;

        if (action === 'update' || action === 'view') {
            setValue('billedTo', data.billedTo);
            setValue('invoiceDate', data.invoiceDate ? dayjs(data.invoiceDate) : undefined);
            setValue('dueDate', data.dueDate ? dayjs(data.dueDate) : undefined);
            setValue('paymentMethod', data.paymentMethod);
            setValue('vat', data.vat);
            setValue('status', data.status);
            setValue('type', data.type);
            setValue('note', data.note);
            setValue('details', data.details);
        }
    }, [data, action, setValue]);

    return (
        <FormWrapper
            action={action}
            loading={loading}
            title={tM('label')}
            showButtonSave={false}
            onSave={handleSubmit(onSubmit)}
            pageWrapperProps={{
                footer: [
                    <Space key="info" style={{}}>
                        {tF('total', { total: formatNumberV2(total || 0) })}
                    </Space>,

                    <Space key="action">
                        <Button type="primary" onClick={handleSubmit(onSubmit)}>
                            {tF('save')}
                        </Button>
                        <Button onClick={handleSubmit(onSubmit)}> {tF('saveDraft')}</Button>
                        <Button type="link"> {tF('cancel')}</Button>
                    </Space>,
                ],
            }}
        >
            <FormProvider {...method}>
                <ProCard>
                    <Row gutter={[12, 0]}>
                        <Col xs={24} md={8}>
                            <SelectControl name="type" label={tF('type.title')} wrapperProps={{ required: true }} childProps={{ disabled, options: typeOptions }} />
                        </Col>
                        <Col xs={24} md={8}>
                            <SelectControl name="billedTo" label={tF('billedTo.title')} wrapperProps={{ required: true }} childProps={{ disabled, options: contractorOptions }} />
                        </Col>
                        <Col xs={24} md={8}>
                            <SelectControl name="paymentMethod" label={tF('paymentMethod.title')} wrapperProps={{ required: true }} childProps={{ disabled, options: paymentMethodOptions }} />
                        </Col>
                        <Col xs={24} md={8}>
                            <SelectControl name="status" label={tF('status.title')} wrapperProps={{ required: true }} childProps={{ disabled, options: statusOptions }} />
                        </Col>
                        <Col xs={24} md={8}>
                            <DatePickerControl name="invoiceDate" label={tF('invoiceDate.title')} wrapperProps={{ required: true }} childProps={{ disabled }} />
                        </Col>
                        <Col xs={24} md={8}>
                            <DatePickerControl name="dueDate" label={tF('dueDate.title')} wrapperProps={{ required: true }} childProps={{ disabled }} />
                        </Col>

                        <Col xs={24} md={8}>
                            <SwitchControl name="vat" label={tF('vat.title')} childProps={{ disabled }} />
                        </Col>
                        <Col xs={24} md={24}>
                            <TextAreaControl name="note" label={tF('note.title')} childProps={{ disabled }} />
                        </Col>
                        <Col xs={24}>
                            <DetailTableForm name="details" label={tF('details.title')} disabled={disabled} />
                        </Col>
                    </Row>
                </ProCard>
            </FormProvider>
        </FormWrapper>
    );
}

export default Form;
