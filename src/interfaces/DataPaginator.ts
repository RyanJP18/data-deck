interface DataPaginator {
    pagination: 'none' | 'client' | 'server'; // none = off (i.e. show everything in one page), server = the server is providing the pagination
    showFooter: boolean;
    itemsPerPage: number;
    currentPageNo: number;
    lastPageNo?: number; // Server-managed only
}

export type { DataPaginator as default };