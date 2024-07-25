import { PageContainer, PageContainerProps, ProCard } from '@ant-design/pro-components';
import { PropsWithChildren, PropsWithoutRef } from 'react';

function PageWrapper({ children, ...props }: PropsWithChildren<PageContainerProps>) {
    return (
        <PageContainer
            token={{
                paddingInlinePageContainerContent: 16,
                paddingBlockPageContainerContent: 16,
            }}
            fixedHeader
            {...props}
        >
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
        </PageContainer>
    );
}

export default PageWrapper;
