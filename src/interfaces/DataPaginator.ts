export default interface DataPaginator {
    itemsPerPage: number;
    currentPage: number;
    lastPage: number;
    manager: 'client' | 'server';
};