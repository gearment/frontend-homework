'use client';
import invoiceApi from '@/apis/invoice';
import PageWrapper from '@/components/shared/wrapper/PageWrapper';
import Search from '@/components/site/invoice/Search';
import Table from '@/components/site/invoice/Table';
import { API_KEY, BOOLEAN_ALL, DEFAULT_INDEX, INVOICE_CREATE_PATH, INVOICE_PATH } from '@/data';
import { useConfirmModal } from '@/hooks/use-confirm';
import { useFilterParams } from '@/hooks/use-filter-params';
import { useNotify } from '@/hooks/use-notify';
import { usePagination } from '@/hooks/use-pagination';
import { TInvoiceFilterParams, TInvoiceFilterValues } from '@/types';
import { getPaginationFromSearchParams, getValueBooleanSelect, qsParseString } from '@/utils';
import { ProCard } from '@ant-design/pro-components';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

function Invoice() {
    const query = useSearchParams();
    const { index, limit, total, refresh } = getPaginationFromSearchParams(query);
    const { pagination, onResetPagination, onChange, backToFirstPage } = usePagination({ index, limit, total, refresh });

    const { onPushParams, onRefreshParams } = useFilterParams();
    const notify = useNotify();
    const confirmModal = useConfirmModal();
    const tC = useTranslations('Common');
    const router = useRouter();

    const methods = useForm<TInvoiceFilterValues>({
        defaultValues: {
            keyword: qsParseString(query.get('keyword')),
            isActive: qsParseString(query.get('isActive')),
            name: qsParseString(query.get('name')),
            code: qsParseString(query.get('code')),
            type: qsParseString(query.get('type')),
        },
    });

    const { watch, reset, handleSubmit } = methods;

    const { refetch, data, isPending, isFetching, isError } = useQuery({
        queryKey: [API_KEY.invoiceIndex, pagination],
        queryFn: () =>
            invoiceApi.getInvoices({
                ...pagination,
                ...getLoadParams(watch()),
            }),
        placeholderData: keepPreviousData,
    });

    const { mutate: deleteInvoice } = useMutation({
        mutationFn: invoiceApi.deleteInvoice,
        onSuccess: () => {
            refetch();
            notify.destroy();
            notify.success(tC('notify.delete'));
        },
        onError: (error: any) => {
            notify.destroy();
            confirmModal.error({ content: error?.message });
        },
    });

    const onChangePagination = (newPagination: TablePaginationConfig) => {
        const { current = DEFAULT_INDEX, pageSize } = newPagination;
        onChange(current, pageSize, data?.data?.total);
        onPushParams({ index: current, limit: pageSize });
    };

    const onReset = () => {
        onResetPagination();
        reset({ keyword: null, name: null, code: null, isActive: BOOLEAN_ALL });
        backToFirstPage();
        onRefreshParams();
        refetch();
    };

    const onSearch = (values: TInvoiceFilterValues) => {
        const { index, limit } = pagination;

        const newQuery = {
            index: DEFAULT_INDEX,
            limit,
            ...getQueryParams(values),
        };
        backToFirstPage();
        onPushParams(newQuery);
        if (index === DEFAULT_INDEX) {
            refetch();
        }
    };

    const onAdd = () => {
        router.push(INVOICE_CREATE_PATH);
    };

    const onEdit = (id: string) => {
        router.push(`${INVOICE_PATH}/${id}`);
    };

    const onDelete = (id: string) => {
        notify.loading();
        deleteInvoice(id);
    };

    return (
        <PageWrapper>
            <ProCard>
                <FormProvider {...methods}>
                    <Search loading={!isError && (isPending || isFetching)} onReset={onReset} onSearch={handleSubmit(onSearch)} onAdd={onAdd} />
                </FormProvider>
            </ProCard>
            <ProCard>
                <div style={{ minHeight: 600 }}>
                    <Table
                        dataSource={data?.data.items || []}
                        loading={!isError && (isPending || isFetching)}
                        actionLoading={false}
                        onDelete={onDelete}
                        onUpdate={onEdit}
                        pagination={{
                            current: pagination.index,
                            pageSize: pagination.limit,
                            total: data?.data?.total || 0,
                            showSizeChanger: true,
                            position: ['bottomLeft'],
                        }}
                        onChange={onChangePagination}
                    />
                </div>
            </ProCard>
        </PageWrapper>
    );
}

export default Invoice;

const getLoadParams = (data: TInvoiceFilterValues): TInvoiceFilterParams => {
    return {
        vat: data.vat ? getValueBooleanSelect(data.vat) : undefined,
        billTo: data.billTo ?? undefined,
        fromDate: data.date ? dayjs(data.date[0]).toISOString() : undefined,
        toDate: data.date ? dayjs(data.date[1]).toISOString() : undefined,
        status: data.status ?? undefined,
        type: data.type ?? 'all',
    };
};

const getQueryParams = (data: TInvoiceFilterValues) => {
    return {
        billTo: data.billTo ?? undefined,
        vat: data.vat ?? undefined,
        fromDate: data.date ? dayjs(data.date[0]).toISOString() : undefined,
        toDate: data.date ? dayjs(data.date[1]).toISOString() : undefined,
        status: data.status ?? undefined,
        type: data.type ?? 'all',
    };
};
