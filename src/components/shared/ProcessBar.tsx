'use client';

import { theme } from 'antd';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
    const { useToken } = theme;

    const { token } = useToken();
    return (
        <>
            {children}
            <ProgressBar height="3px" color={token.colorPrimary} options={{ showSpinner: false }} shallowRouting />
        </>
    );
};

export default ProgressBarProvider;
