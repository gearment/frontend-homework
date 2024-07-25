import { CommonFormProps } from '@/types';
import { ErrorMessage } from '@hookform/error-message';
import { Form } from 'antd';
import React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import OtpInput from 'react-otp-input';

type AllowedInputTypes = 'password' | 'text' | 'number' | 'tel';

interface OTPInputProps {
    numInputs?: number;
    shouldAutoFocus?: boolean;
    placeholder?: string;
    renderSeparator?: ((index: number) => React.ReactNode) | React.ReactNode;
    containerStyle?: React.CSSProperties | string;
    inputStyle?: React.CSSProperties | string;
    inputType?: AllowedInputTypes;
}

function InputOtpControl(props: CommonFormProps<OTPInputProps>) {
    const { name, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (value: any) => {
            onChange(value || null);
            if (onChangeCallBack && onChangeCallBack instanceof Function) {
                onChangeCallBack(value);
            }
        };
    };

    const isHaveError: any = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && isHaveError ? <ErrorMessage errors={errors} name={name} /> : undefined;
    }, [showError, errors, name, isHaveError]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <Form.Item
                    {...wrapperProps}
                    style={toggleError ? { marginBottom: isHaveError ? 24 : 0, ...(wrapperProps?.style || {}) } : { ...(wrapperProps?.style || {}) }}
                    htmlFor={name}
                    help={errorElement}
                    validateStatus={isHaveError ? 'error' : undefined}
                >
                    <OtpInput
                        {...childProps}
                        value={value}
                        onChange={handleOnChange(onChange)}
                        numInputs={6}
                        renderInput={(props) => (
                            <input {...props} style={{ width: '3rem', height: ' 3rem', margin: '0 6px', fontSize: '1.5rem', borderRadius: ' 4px', border: ' 1px solid rgba(0,0,0,.3)' }} />
                        )}
                    />
                </Form.Item>
            )}
        />
    );
}

export default InputOtpControl;
