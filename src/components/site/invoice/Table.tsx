import BooleanIcon from '@/components/shared/format/BooleanIcon';
import TimeFormat from '@/components/shared/format/TimeFormat';
import TableOperation from '@/components/shared/table/TableOperation';
import { statusOptionsObj } from '@/data/common/site/invoice';
import { useConfirmModal } from '@/hooks/use-confirm';
import { IInvoice } from '@/types';
import { Table as AntTable, Button, TableProps, Tag } from 'antd';
import { ColumnType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { FaDownload, FaFilePdf, FaPrint } from 'react-icons/fa';
import { TbMailFilled } from 'react-icons/tb';

export interface IInvoiceTableProps extends TableProps {
    actionLoading: boolean;
    onUpdate: (id: string) => void;
    onDelete: (id: string) => void;
}

function Table(props: IInvoiceTableProps) {
    const { actionLoading, onUpdate, onDelete, ...tableProps } = props;
    const tT = useTranslations('Common.table');
    const t = useTranslations('Invoice.table.columns');
    const confirmModal = useConfirmModal();

    const columns: ColumnType<IInvoice>[] = useMemo(
        () => [
            {
                key: 'id',
                title: t('id'),
                dataIndex: 'id',
                align: 'center',
                width: 120,
            },
            {
                key: 'billedTo',
                title: t('billedTo'),
                dataIndex: 'billedTo',
                align: 'left',
                width: 160,
            },
            {
                key: 'invoiceDate',
                title: t('invoiceDate'),
                dataIndex: 'invoiceDate',
                align: 'left',
                width: 160,
                render: (value) => <TimeFormat value={value} />,
            },
            {
                key: 'dueDate',
                title: t('dueDate'),
                dataIndex: 'dueDate',
                align: 'left',
                width: 160,
                render: (value) => <TimeFormat value={value} />,
            },
            {
                key: 'status',
                title: t('status'),
                dataIndex: 'status',
                align: 'center',
                width: 120,
                render: (value) => <Tag color={statusOptionsObj?.[value]?.color}>{statusOptionsObj?.[value]?.label}</Tag>,
            },
            {
                key: 'vat',
                title: t('vat'),
                dataIndex: 'vat',
                align: 'center',
                width: 80,
                render: (value) => <BooleanIcon value={value} />,
            },
            {
                key: 'export',
                title: t('export'),
                dataIndex: 'export',
                align: 'center',
                width: 180,
                render: () => (
                    <TableOperation
                        prefix={
                            <>
                                <Button size="small" shape="circle" type="link">
                                    <FaDownload />
                                </Button>
                                <Button size="small" shape="circle" type="link">
                                    <FaFilePdf />
                                </Button>
                                <Button size="small" shape="circle" type="link">
                                    <FaPrint />
                                </Button>
                                <Button size="small" shape="circle" type="link">
                                    <TbMailFilled />
                                </Button>
                            </>
                        }
                    />
                ),
            },
            {
                title: tT('columns.operation.label'),
                key: 'operation',
                fixed: 'right',
                width: 90,
                render: (_, record) => {
                    return (
                        <TableOperation
                            onUpdate={() => onUpdate(record.id)}
                            onDelete={() =>
                                confirmModal.confirm({
                                    content: tT('columns.operation.delete-confirm'),
                                    onOk: () => {
                                        onDelete(record.id);
                                    },
                                })
                            }
                        />
                    );
                },
            },
        ],
        [confirmModal, onDelete, onUpdate, t, tT],
    );

    return <AntTable {...tableProps} columns={columns} bordered rowKey={(record) => record.id} />;
}

export default Table;
