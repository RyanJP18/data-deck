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
    selectionSettings: { readOnly: false, fireAndForget: true, allowMultiple: false } as SelectionSettings,
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

const { processedData, pageData, select } = useDataDeck({ data: props.data, headerMetadata: props.headerMetadata, selection: selection, querySettings: querySettings, selectionSettings: props.selectionSettings, paginator: paginator, selection: selection });

</script>


<template>
    <div>
        <HeaderPanel v-model="querySettings" :headerMetadata="headerMetadata" />
        <div v-for="(card, cardIndex) in pageData" :key="cardIndex" @click="select">
            <div v-for="column in headerMetadata" :key="column"><b>{{ column.label }}</b>: {{ card[column.value] }} </div>
        </div>
        <FooterPanel v-model="paginator" :processed-data="processedData" @update:modelValue="$event => paginator = $event" />
    </div>
</template>