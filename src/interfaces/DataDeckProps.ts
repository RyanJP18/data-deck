import type HeaderMetadata from '@/interfaces/HeaderMetadata';
import type SelectionSettings from '@/interfaces/SelectionSettings';
import type QuerySettings from '@/interfaces/QuerySettings';
import type DataPaginator from '@/interfaces/DataPaginator';

interface DataDeckProps {
    data: Record<string, string>[];
    headerMetadata: HeaderMetadata[];
    selection?: Record<string, string>[];
    selectionSettings?: SelectionSettings;
    querySettings?: QuerySettings;
    paginator?: DataPaginator;
    loading?: boolean;
}

export type { DataDeckProps as default };