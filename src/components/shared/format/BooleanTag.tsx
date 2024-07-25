import { Tag } from 'antd';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

export interface IBooleanTagProps {
    value: boolean;
    showFalse?: boolean;
    isBoolean?: boolean;
}

function BooleanTag(props: IBooleanTagProps) {
    const { value, showFalse = false, isBoolean = false } = props;
    const tC = useTranslations('Common');
    return (
        <Fragment>
            {value ? (
                <Tag color="success">{isBoolean ? tC('dropdown.true_false.true') : tC('dropdown.boolean.true')}</Tag>
            ) : showFalse ? (
                <Tag color="error">{isBoolean ? tC('dropdown.true_false.false') : tC('dropdown.boolean.false')}</Tag>
            ) : null}
        </Fragment>
    );
}

export default BooleanTag;
