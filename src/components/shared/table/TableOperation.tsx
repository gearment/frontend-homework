import { useRouting } from '@/stores/routing-store';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

type TTableOperationProps = {
    onUpdate?: () => void;
    onDelete?: () => void;
    prefix?: ReactNode;
    suffix?: ReactNode;
};
function TableOperation(props: TTableOperationProps) {
    const { prefix, suffix, onUpdate, onDelete } = props;
    const tC = useTranslations('Common.filter.action');
    const routing = useRouting();
    return (
        <Space direction="horizontal">
            {prefix}
            {onUpdate ? (
                <Button disabled={routing} size="small" shape="circle" type="link" title={tC('update')} onClick={onUpdate}>
                    <EditOutlined />
                </Button>
            ) : null}
            {onDelete ? (
                <Button disabled={routing} size="small" shape="circle" type="link" title={tC('delete')} onClick={onDelete}>
                    <DeleteOutlined />
                </Button>
            ) : null}
            {suffix}
        </Space>
    );
}

export default TableOperation;
