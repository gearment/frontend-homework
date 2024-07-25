import { ErrorMessage } from '@hookform/error-message';
import { DatePicker, Form, TimePickerProps, Typography } from 'antd';
import React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { CommonFormProps } from '@/types';
import Label from '@/components/shared/form/Label';

const { TimePicker } = DatePicker;

function TimePickerControl(props: CommonFormProps<TimePickerProps>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;

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
                    label={label ? <Label disabled={childProps?.disabled} label={label} /> : undefined}
                    htmlFor={name}
                    help={errorElement}
                    validateStatus={isHaveError ? 'error' : undefined}
                >
                    <TimePicker
                        allowClear
                        {...childProps}
                        className={`${childProps?.className || ''} main-date-picker`}
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

export default TimePickerControl;
