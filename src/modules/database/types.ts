import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export type QueryHook<Entity> = (
    qb: SelectQueryBuilder<Entity>,
) => Promise<SelectQueryBuilder<Entity>>;

export interface PaginateMeta {
    // 总项目数量
    totalItems?: number;
    // 当前页项目数量
    itemCount: number;
    // 每页项目数量
    perPage: number;
    // 总页数
    totalPages?: number;
    // 当前页
    currentPage: number;
}

export interface PaginateOptions {
    page: number;
    limit: number;
}
export interface PaginateReturn<E extends ObjectLiteral> {
    meta: PaginateMeta;
    items: E[];
}
