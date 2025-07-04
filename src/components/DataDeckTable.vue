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
    selectionSettings: () => ({ readOnly: false, fireAndForget: true, allowMultiple: false }) as SelectionSettings,
    selection: () => [] as Record<string, string>[],
    querySettings: () => ({ filterQuery: '', sortColumn: '', sortDirection: 'A-Z' }) as QuerySettings,
    paginator: () => ({ itemsPerPage: 2, currentPageNo: 1, lastPageNo: 1, manager: 'client' }) as DataPaginator,
    loading: false,
});

const emit = defineEmits(['selected', 'deselected']);


const selection = ref(props.selection);
watch(selection, () => {
    if (props.selectionSettings.fireAndForget) {
        emit('selected', selection.value);
    } else {

    }
}, { deep: true });

const querySettings = ref(props.querySettings);
const paginator = ref(props.paginator);

const { processedData, pageData, select } = useDataDeck(props.data, props.headerMetadata, props.selectionSettings, selection, querySettings, paginator);
</script>


<template>
    <div>
        <HeaderPanel v-model="querySettings" :headerMetadata="headerMetadata" />
        <table>
            <thead>
                <tr>
                    <th v-for="header in headerMetadata" :key="header.value"><b>{{ header.label }}</b></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in pageData" :key="rowIndex" @click="select(row)">
                    <td v-for="column in headerMetadata" :key="column.value">{{ row[column.value] }}</td>
                </tr>
            </tbody>
        </table>
        <FooterPanel v-model="paginator" :processed-data="processedData" @update:modelValue="$event => paginator = $event" />
    </div>
</template>