import type HeaderMetadata from "@/interfaces/HeaderMetadata";
import type DataSettings from "@/interfaces/DataSettings";
import type DataPaginator from "@/interfaces/DataPaginator";

export default interface ComponentProps {
    data: Record<string, string>[];
    headerMetadata: HeaderMetadata[];
    dataSettings?: DataSettings;
    paginator?: DataPaginator;
    loading?: boolean;
};