interface DataPaginator {
    itemsPerPage: number;
    currentPageNo: number;
    lastPageNo: number;
    manager: 'client' | 'server';
}

export type { DataPaginator as default };