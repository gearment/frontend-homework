import { IPaginationStates } from '@/hooks/use-pagination';
import { Pagination, PaginationProps } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

export interface IMainPaginationProps extends PaginationProps {
    pagination: IPaginationStates;
    total?: number;
}

function MainPagination(props: IMainPaginationProps) {
    const { pagination, total = 0, ...paginationProps } = props;

    const tC = useTranslations('Common');

    return (
        <Pagination
            className="main-pagination"
            style={{ fontSize: 12 }}
            showTotal={(total) => tC('pagination.show-total', { total })}
            current={pagination.index}
            pageSize={pagination.limit}
            total={total}
            showSizeChanger={true}
            {...paginationProps}
            disabled={paginationProps.disabled}
        />
    );
}

export default MainPagination;
