export default interface DataPaginator {
    itemsPerPage: number;
    currentPageNo: number;
    lastPageNo: number;
    manager: 'client' | 'server';
};