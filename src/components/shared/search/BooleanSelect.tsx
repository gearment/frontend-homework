import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import SelectControl, { ISelectControlProps } from '@/components/controls/select/SelectControl';
import { BOOLEAN_ALL, BOOLEAN_FALSE, BOOLEAN_TRUE } from '@/data';

type TBooleanSelectProps = {
    isBoolean?: boolean;
} & ISelectControlProps;
function BooleanSelect({ isBoolean = false, ...props }: TBooleanSelectProps) {
    const tC = useTranslations('Common');

    const options = useMemo(() => {
        return [
            {
                value: BOOLEAN_ALL,
                label: isBoolean ? tC('dropdown.true_false.all') : tC('dropdown.boolean.all'),
            },
            {
                value: BOOLEAN_TRUE,
                label: isBoolean ? tC('dropdown.true_false.true') : tC('dropdown.boolean.true'),
            },
            {
                value: BOOLEAN_FALSE,
                label: isBoolean ? tC('dropdown.true_false.false') : tC('dropdown.boolean.false'),
            },
        ];
    }, [isBoolean, tC]);

    return <SelectControl {...props} childProps={{ ...props.childProps, options: options }} />;
}

export default BooleanSelect;
