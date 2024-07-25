import { FaHome } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa6';

export const config = {
    route: {
        path: '/',
        routes: [
            {
                path: '/',
                name: 'home',
                icon: <FaHome />,
            },
            {
                name: 'invoice',
                path: '/invoice',
                icon: <FaFileInvoiceDollar />,
                routes: [
                    {
                        path: '/invoice',
                        name: 'invoice',
                        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
                    },
                ],
            },
        ],
    },
    location: {
        pathname: '/',
    },
};
