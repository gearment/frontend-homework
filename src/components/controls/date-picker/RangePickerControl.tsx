import Label from '@/components/shared/form/Label';
import { CommonFormProps } from '@/types';
import { ErrorMessage } from '@hookform/error-message';
import { DatePicker, Form, Typography } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { cloneDeep } from '@/utils';
import React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';

const { RangePicker } = DatePicker;

function RangePickerControl(props: CommonFormProps<RangePickerProps>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;
    const cloneChildDrop = cloneDeep(childProps) as any;
    const showTime = cloneChildDrop ? cloneChildDrop?.showTime : undefined;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (value: any) => {
            onChange(value);
            if (onChangeCallBack instanceof Function) {
                onChangeCallBack(value);
            }
        };
    };

    const handleOnBlur = (onBlur: () => void) => {
        return () => {
            onBlur();
            if (onBlurCallBack instanceof Function) {
                onBlurCallBack();
            }
        };
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && errors ? <ErrorMessage errors={errors} name={name} /> : null;
    }, [showError, errors, name]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, value, onChange, onBlur } }) => (
                <Form.Item
                    {...wrapperProps}
                    style={toggleError ? { marginBottom: isHaveError ? 24 : 0, ...(wrapperProps?.style || {}) } : { ...(wrapperProps?.style || {}) }}
                    label={label ? <Label disabled={!!childProps?.disabled} label={label} /> : undefined}
                    htmlFor={name}
                    help={errorElement}
                    validateStatus={isHaveError ? 'error' : undefined}
                >
                    <RangePicker
                        allowClear
                        style={{ width: '100%' }}
                        {...childProps}
                        className={`${childProps?.className || ''} main-date-picker`}
                        popupClassName={!!showTime ? 'date-picker-with-time' : ''}
                        ref={ref}
                        id={name}
                        value={value}
                        onChange={handleOnChange(onChange)}
                        onBlur={handleOnBlur(onBlur)}
                    />
                </Form.Item>
            )}
        />
    );
}

export default RangePickerControl;
