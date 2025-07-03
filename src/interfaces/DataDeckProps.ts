import type DataPaginator from "./DataPaginator";
import type HeaderMetadata from "./HeaderMetadata";

export default interface ComponentProps {
    data: Record<string, string>[];
    headerMetadata: HeaderMetadata[];
    paginator?: DataPaginator;
    loading?: boolean;
};