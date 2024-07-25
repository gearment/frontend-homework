import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import { stringify } from 'querystring';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import { HEADER_LOGOUT } from '@/data/auth';
import { useAuthActions } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import { LOGIN_PATH } from '@/data';

export type GlobalHeaderRightProps = {
    menu?: boolean;
    children?: React.ReactNode;
};

export const AvatarName = () => {
    return <span className="anticon">{'name'}</span>;
};

const useStyles = createStyles(({ token }) => {
    return {
        action: {
            display: 'flex',
            height: '48px',
            marginLeft: 'auto',
            overflow: 'hidden',
            alignItems: 'center',
            padding: '0 8px',
            cursor: 'pointer',
            borderRadius: token.borderRadius,
            '&:hover': {
                backgroundColor: token.colorBgTextHover,
            },
        },
    };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
    const { logout } = useAuthActions();
    const router = useRouter();

    const onMenuClick = useCallback(
        (event: any) => {
            const { key } = event;
            if (key === HEADER_LOGOUT) {
                logout();
                router.push(LOGIN_PATH);
            }
        },
        [logout, router],
    );

    const menuItems = [
        {
            key: HEADER_LOGOUT,
            icon: <LogoutOutlined />,
            label: 'Logout',
        },
    ];

    return (
        <HeaderDropdown
            menu={{
                selectedKeys: [],
                onClick: onMenuClick,
                items: menuItems,
            }}
        >
            {children}
        </HeaderDropdown>
    );
};
