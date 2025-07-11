import '@/styles/style.scss';
import '@/styles/transitions.scss';

import DataDeckCards from '@/components/DataDeckCards.vue';
import DataDeckTable from '@/components/DataDeckTable.vue';

import useDataDeck from '@/composables/useDataDeck';

import type DataDeckProps from '@/interfaces/DataDeckProps';
import type DataPaginator from '@/interfaces/DataPaginator';
import type FieldMetadata from '@/interfaces/FieldMetadata';
import type QuerySettings from '@/interfaces/QuerySettings';
import type SelectionSettings from '@/interfaces/SelectionSettings';

export { DataDeckCards, DataDeckTable, useDataDeck, type DataDeckProps, type DataPaginator, type FieldMetadata, type QuerySettings, type SelectionSettings };