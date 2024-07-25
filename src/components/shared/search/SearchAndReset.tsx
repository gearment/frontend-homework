import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useTranslations } from 'next-intl';

export type TSearchAndResetProps = {
    loading?: boolean;
    onSearch: () => void;
    onReset: () => void;
};
function SearchAndReset(props: TSearchAndResetProps) {
    const { loading, onSearch, onReset } = props;
    const t = useTranslations('Common.filter.action');

    return (
        <Space style={{ width: '100%', justifyContent: 'end' }}>
            <Button title={t('reset')} shape="circle" icon={<ClearOutlined />} loading={loading} onClick={onReset} />
            <Button title={t('search')} shape="circle" icon={<SearchOutlined />} loading={loading} onClick={onSearch} />
        </Space>
    );
}

export default SearchAndReset;
