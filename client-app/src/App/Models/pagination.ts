export interface Pagination {
    currentPage: number;
    itemPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    datas: T;
    pagination: Pagination

    constructor(data: T, pagination: Pagination) {
        this.datas = data;
        this.pagination = pagination;
    }
}

export class PagingParams {
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, pageSize = 2) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize
    }
}