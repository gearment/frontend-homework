'use client';
import { DEFAULT_INDEX, DEFAULT_LIMIT, DEFAULT_REFRESH, DEFAULT_TOTAL } from '@/data';
import { TParam } from '@/types';
import { qsParseNumber, qsParseBoolean } from '@/utils';
import { useState } from 'react';

export interface IPaginationProps {
    page?: TParam;
    size?: TParam;
    [key: string]: TParam;
}

export interface IPaginationFilter {
    [key: string]: TParam;
}

export interface IPaginationStates {
    index: number;
    limit: number;
    refresh: boolean;
    total: number;
}

export const usePagination = ({ index, limit, total, refresh }: IPaginationProps) => {
    const [pagination, setPagination] = useState<IPaginationStates>(() => ({
        index: qsParseNumber(index, DEFAULT_INDEX),
        limit: qsParseNumber(limit, DEFAULT_LIMIT),
        refresh: qsParseBoolean(refresh, DEFAULT_REFRESH),
        total: qsParseNumber(total, DEFAULT_TOTAL),
    }));

    const onResetPagination = () => {
        setPagination((prev) => ({
            ...prev,
            index: DEFAULT_INDEX,
            limit: DEFAULT_LIMIT,
            refresh: DEFAULT_REFRESH,
            total: DEFAULT_TOTAL,
        }));
    };

    const backToFirstPage = () => {
        setPagination((prev) => ({
            ...prev,
            index: DEFAULT_INDEX,
            refresh: true,
        }));
    };

    const onChange = (index: number, limit?: number, total?: number) => {
        setPagination((prev) => ({
            ...prev,
            index,
            limit: limit ?? prev.limit,
            refresh: limit !== prev.limit,
            total: total ?? prev.total,
        }));
    };

    const getNextPage = (total: number) => {
        if (total > pagination.index * pagination.limit) {
            return pagination.index + 1;
        }
        return null;
    };

    const onChangeNextPage = (total?: number) => {
        setPagination((prev) => ({
            ...prev,
            index: prev.index + 1,
            total: total ?? prev.total,
            refresh: false,
        }));
    };

    const onReloadPagination = () => {
        setPagination((prev) => ({
            ...prev,
            refresh: true,
        }));
    };

    return {
        pagination,
        onReloadPagination,
        setPagination,
        getNextPage,
        onChange,
        onChangeNextPage,
        backToFirstPage,
        onResetPagination,
    };
};
