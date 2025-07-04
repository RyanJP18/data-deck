<script setup lang="ts">
import { ref, watch } from 'vue';
import type DataDeckProps from '@/interfaces/DataDeckProps';
import type HeaderMetadata from '@/interfaces/HeaderMetadata';
import type SelectionSettings from '@/interfaces/SelectionSettings';
import type QuerySettings from '@/interfaces/QuerySettings';
import type DataPaginator from '@/interfaces/DataPaginator';
import useDataDeck from '@/composables/useDataDeck';
import FooterPanel from '@/components/FooterPanel.vue';
import HeaderPanel from '@/components/HeaderPanel.vue';

const props = withDefaults(defineProps<DataDeckProps>(), {
    headerMetadata: () => [] as HeaderMetadata[],
    selection: () => [] as Record<string, string>[],
    selectionSettings: { readOnly: false } as SelectionSettings,
    querySettings: { filterQuery: '', sortColumn: '', sortDirection: 'A-Z' } as QuerySettings,
    paginator: { itemsPerPage: 2, currentPageNo: 1, lastPageNo: 1, manager: 'client' } as DataPaginator,
    loading: false,
});

const emit = defineEmits(['selected', 'deselected']);


const selection = ref(props.selection);
watch(selection, (newVal, oldVal) => {
    if (props.selectionSettings.fireAndForget) {
        emit('selected', selection.value);
    } else {

    }
}, { deep: true });

const querySettings = ref(props.querySettings);
const paginator = ref(props.paginator);

const { processedData, pageData, select } = useDataDeck({ data: props.data, headerMetadata: props.headerMetadata, querySettings: querySettings, selectionSettings: props.selectionSettings, paginator: paginator, selection: selection });

</script>


<template>
    <div>
        <HeaderPanel v-model="querySettings" :headerMetadata="headerMetadata" />
        <table>
            <thead>
                <tr>
                    <th v-for="header in headerMetadata" :key="header"><b>{{ header.label }}</b></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in pageData" :key="rowIndex" @click="select">
                    <td v-for="column in headerMetadata" :key="column">{{ row[column.value] }}</td>
                </tr>
            </tbody>
        </table>
        <FooterPanel v-model="paginator" :processed-data="processedData" @update:modelValue="$event => paginator = $event" />
    </div>
</template>