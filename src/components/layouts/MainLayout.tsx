import { config } from '@/components/layouts/configProps';
import { COLOR_PRIMARY, HOME_PATH, localeConfig } from '@/data';
import { HEADER_LOGOUT } from '@/data/auth';
import { usePathNameLocale } from '@/hooks/use-pathname-locale';
import { useAuthActions } from '@/stores/auth-store';
import { LogoutOutlined } from '@ant-design/icons';
import { ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import { ConfigProvider, Dropdown } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useCallback, useMemo } from 'react';
import { FaFileInvoiceDollar } from 'react-icons/fa6';

export const MainLayout = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const pathname = usePathNameLocale();
    const t = useTranslations('Common.site');
    const tC = useTranslations('Common');

    const { logout } = useAuthActions();

    const locale = useLocale();
    const localeAnt = localeConfig?.[locale as keyof typeof localeConfig]?.locale;

    const configTranslations = useMemo(() => {
        return {
            ...config,
            route: {
                ...config.route,
                routes: config.route?.routes.map((item) => ({
                    ...item,
                    name: t(item.name),
                    routes: item.routes?.map((itm) => ({
                        ...itm,
                        name: ['create', 'detail'] ? t(itm.name) : t(item.name),
                    })),
                })),
            },
        };
    }, [t]);

    const onMenuClick = useCallback(
        (event: any) => {
            const { key } = event;
            if (key === HEADER_LOGOUT) {
                logout();
            }
        },
        [logout, router],
    );

    if (typeof document === 'undefined') {
        return <div />;
    }

    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProConfigProvider hashed={false}>
                <ConfigProvider
                    locale={localeAnt}
                    getTargetContainer={() => {
                        return document.getElementById('test-pro-layout') || document.body;
                    }}
                    theme={{
                        token: {
                            colorPrimary: '#00127f',
                        },
                    }}
                >
                    <ProLayout
                        {...configTranslations}
                        fixSiderbar={true}
                        layout="mix"
                        splitMenus={false}
                        navTheme="light"
                        prefixCls="my-prefix"
                        location={{ pathname }}
                        siderMenuType="sub"
                        menu={{ collapsedShowGroupTitle: true }}
                        title={tC('title')}
                        logo={<FaFileInvoiceDollar color={COLOR_PRIMARY} />}
                        headerTitleRender={(logo, title, __) => {
                            return (
                                <Link href={HOME_PATH}>
                                    {logo}
                                    {title}
                                </Link>
                            );
                        }}
                        avatarProps={{
                            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                            size: 'small',
                            title: 'User',
                            render: (item, dom) => {
                                return (
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: HEADER_LOGOUT,
                                                    icon: <LogoutOutlined />,
                                                    label: 'Sign out',
                                                },
                                            ],
                                            onClick: onMenuClick,
                                        }}
                                    >
                                        {dom}
                                    </Dropdown>
                                );
                            },
                        }}
                        menuItemRender={(item, dom) => (
                            <div
                                onClick={() => {
                                    item.path && router.push(item.path);
                                }}
                            >
                                {dom}
                            </div>
                        )}
                        bgLayoutImgList={[
                            {
                                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                                left: 85,
                                bottom: 100,
                                height: '303px',
                            },
                            {
                                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                                bottom: -68,
                                right: -45,
                                height: '303px',
                            },
                            {
                                src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                                bottom: 0,
                                left: 0,
                                width: '331px',
                            },
                        ]}
                        colorPrimary={COLOR_PRIMARY}
                        token={{
                            header: {
                                colorHeaderTitle: COLOR_PRIMARY,
                            },
                        }}
                    >
                        {children}
                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
};

export default MainLayout;
