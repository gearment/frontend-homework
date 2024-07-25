import { Button, ButtonProps, Row, RowProps } from 'antd';
import { useTranslations } from 'next-intl';
import { PlusCircleFilled } from '@ant-design/icons';

type TAddNewButtonProps = {
    buttonProps?: ButtonProps;
    rowProps?: RowProps;
    onAddNew?: () => void;
};

function AddNewButton(props: TAddNewButtonProps) {
    const { buttonProps, rowProps, onAddNew } = props;
    const t = useTranslations('Common.filter.action');
    return (
        <Row justify="end" {...rowProps}>
            <Button title={t('create')} icon={<PlusCircleFilled />} type="primary" {...buttonProps} onClick={onAddNew}>
                {buttonProps?.children || t('create')}
            </Button>
        </Row>
    );
}

export default AddNewButton;
