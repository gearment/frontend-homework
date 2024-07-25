export interface IMainResponse<T> {
    code: number;
    reason: string;
    message: string;
    metadata: any;
    data: T;
}

export interface IMainResponseAffected {
    rows_affected: number;
}

export interface IMainUpdatePayload<T> {
    id: number | string;
    payload: T;
}

export interface IPaginationParams {
    index: number;
    limit: number;
    total: number;
    refresh: boolean;
}

export interface IItemIds {
    item_ids: number[];
}
