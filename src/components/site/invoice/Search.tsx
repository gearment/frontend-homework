import RangePickerControl from '@/components/controls/date-picker/RangePickerControl';
import SelectControl from '@/components/controls/select/SelectControl';
import AddNewButton from '@/components/shared/search/AddNewButton';
import BooleanSelect from '@/components/shared/search/BooleanSelect';
import { TSearchAndResetProps } from '@/components/shared/search/SearchAndReset';
import { contractorOptions, statusOptions } from '@/data/common/site/invoice';
import { EInvoiceType, TInvoiceFilterValues } from '@/types';
import { Col, Form, Row, Tabs, TabsProps } from 'antd';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

type TSearchProps = {
    loading: boolean;
    onAdd: () => void;
} & TSearchAndResetProps;

function Search(props: TSearchProps) {
    const { loading, onAdd, ...SARProps } = props;
    const tF = useTranslations('Invoice.filter');

    const { setValue, watch } = useFormContext<TInvoiceFilterValues>();

    const type = watch('type') || 'all';

    const items: TabsProps['items'] = useMemo(
        () => [
            {
                key: 'all',
                label: 'All',
            },
            {
                key: EInvoiceType.Edit,
                label: 'Edit',
            },
            {
                key: EInvoiceType.InProcess,
                label: 'In Process',
            },
            {
                key: EInvoiceType.Draft,
                label: 'Draft',
            },
        ],
        [],
    );

    const onChangeType = (value: string) => {
        setValue('type', value);
        SARProps.onSearch();
    };

    return (
        <Form layout="vertical">
            <Row gutter={[12, 12]} align="top">
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Tabs activeKey={type} items={items} onChange={onChangeType} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <AddNewButton
                        onAddNew={onAdd}
                        rowProps={{ align: 'top' }}
                        buttonProps={{
                            children: tF('createNew'),
                        }}
                    />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <SelectControl name="billedTo" toggleError onChangeCallBack={SARProps.onSearch} childProps={{ placeholder: tF('billedTo.placeholder'), options: contractorOptions }} />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <BooleanSelect name="vat" toggleError onChangeCallBack={SARProps.onSearch} childProps={{ placeholder: tF('name.placeholder') }} />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <RangePickerControl name="date" toggleError onChangeCallBack={SARProps.onSearch} childProps={{ placeholder: [tF('date.placeholderFrom'), tF('date.placeholderTo')] }} />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <SelectControl name="status" toggleError onChangeCallBack={SARProps.onSearch} childProps={{ placeholder: tF('status.placeholder'), options: statusOptions }} />
                </Col>
            </Row>
        </Form>
    );
}

export default Search;
