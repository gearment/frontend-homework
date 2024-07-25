import PageWrapper from '@/components/shared/wrapper/PageWrapper';
import { TAction } from '@/types';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { PageContainerProps, ProCard } from '@ant-design/pro-components';
import { Button, ButtonProps, Form, Spin } from 'antd';
import { FormProps } from 'antd/lib';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

type TFormWrapperProps = {
    loading: boolean;
    action: TAction;
    title?: string;
    saveProps?: ButtonProps;
    formProps?: FormProps;
    showButtonSave?: boolean;
    onSave: () => void;
    pageWrapperProps?: PageContainerProps;
};

function FormWrapper({ children, ...props }: PropsWithChildren<TFormWrapperProps>) {
    const { loading, action, title, saveProps, formProps, pageWrapperProps, showButtonSave = true, onSave } = props;
    const router = useRouter();
    const t = useTranslations('Common');

    return (
        <PageWrapper
            header={{
                backIcon: <ArrowLeftOutlined />,
                onBack: router.back,
                title: t(`form.${action}`, { data: title }),
                extra: showButtonSave && <Button onClick={onSave} htmlType="button" title={t('filter.action.save')} shape="circle" type="primary" icon={<SaveOutlined />} {...saveProps} />,
            }}
            {...pageWrapperProps}
        >
            <Form layout="vertical" onFinish={onSave} {...formProps}>
                <Spin spinning={loading}>
                    <ProCard
                        style={{
                            height: 'auto',
                            background: 'transparent',
                        }}
                        ghost
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 16,
                            }}
                        >
                            {children}
                        </div>
                    </ProCard>
                </Spin>
            </Form>
        </PageWrapper>
    );
}

export default FormWrapper;
