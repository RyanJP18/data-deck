interface DataPaginator {
    itemsPerPage: number;
    currentPageNo: number;
    lastPageNo?: number; // Server-managed only
    manager: 'client' | 'server';
}

export type { DataPaginator as default };