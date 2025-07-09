import type FieldMetadata from '@/interfaces/FieldMetadata';
import type SelectionSettings from '@/interfaces/SelectionSettings';
import type QuerySettings from '@/interfaces/QuerySettings';
import type DataPaginator from '@/interfaces/DataPaginator';

interface DataDeckProps {
    data: Record<string, string>[];
    fieldMetadata: FieldMetadata[];
    selection?: Record<string, string>[];
    selectionSettings?: SelectionSettings;
    querySettings?: QuerySettings;
    paginator?: DataPaginator;
    loading?: boolean;
}

export type { DataDeckProps as default };