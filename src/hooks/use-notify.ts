'use client';
import { message, notification } from 'antd';

export const useNotify = () => {
    return {
        success: (content = 'Success', key?: number | string) => {
            message.success({ content, key, duration: 2 });
        },
        error: (content = 'Fail', key?: number | string) => {
            message.error({ content, key, duration: 3 });
        },
        warning: (content: string | React.ReactNode, key?: number | string) => {
            message.warning({ content, key, duration: 2 });
        },
        info: (content: string | React.ReactNode, key?: number | string) => {
            message.info({ content, key, duration: 2 });
        },
        loading: (content: string | React.ReactNode = 'Loading...', key?: number | string) => {
            message.loading({ content, key, duration: 60 });
        },
        destroy: () => {
            message.destroy();
        },
        boxInfo: (title: string | React.ReactNode, content: string | React.ReactNode, key: string, options = {}) => {
            notification.info({
                message: title,
                key,
                description: content,
                ...options,
            });
        },
    };
};
