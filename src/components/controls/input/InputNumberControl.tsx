import Label from '@/components/shared/form/Label';
import { CommonFormProps, Assign } from '@/types';
import { ErrorMessage } from '@hookform/error-message';
import { Form, InputNumber, InputNumberProps } from 'antd';
import React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';

export interface CusInputNumberChildProps extends InputNumberProps {
    format?: string;
}

export type CusInputNumberProps = Assign<
    CommonFormProps<CusInputNumberChildProps>,
    {
        onBlurCallBack?: (value: number) => void;
    }
>;

function InputNumberControl(props: CusInputNumberProps) {
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

    const handleOnBlur = (onBlur: () => void, value: number) => {
        return () => {
            onBlur();
            if (onBlurCallBack instanceof Function) {
                onBlurCallBack(value);
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
                    <InputNumber
                        style={{ width: '100%' }}
                        className="main-input-number"
                        {...childProps}
                        ref={ref}
                        id={name}
                        value={value}
                        onChange={handleOnChange(onChange)}
                        onBlur={handleOnBlur(onBlur, value)}
                    />
                </Form.Item>
            )}
        />
    );
}

export default InputNumberControl;
