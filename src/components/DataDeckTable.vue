<script setup lang="ts">
import { ref } from 'vue';
import type DataDeckProps from '@/interfaces/DataDeckProps';
import type HeaderMetadata from '@/interfaces/HeaderMetadata';
import type DataSettings from '@/interfaces/DataSettings';
import type DataPaginator from '@/interfaces/DataPaginator';
import useDataDeck from '@/composables/useDataDeck';
import FooterPanel from '@/components/FooterPanel.vue';
import HeaderPanel from '@/components/HeaderPanel.vue';

const props = withDefaults(defineProps<DataDeckProps>(), {
    headerMetadata: () => [] as HeaderMetadata[],
    dataSettings: { filterQuery: '', sortColumn: '', sortDirection: 'Ascending' } as DataSettings,
    paginator: { itemsPerPage: 2, currentPage: 1, lastPage: 1, manager: 'client' } as DataPaginator,
    loading: false,
});


const dataSettings = ref(props.dataSettings);
const paginator = ref(props.paginator);

const { processedData, pageData } = useDataDeck({ data: props.data, headerMetadata: props.headerMetadata, dataSettings: dataSettings, paginator: paginator });

</script>


<template>
    <div>
        <HeaderPanel v-model="dataSettings" :headerMetadata="headerMetadata" />
        <table>
            <thead>
                <tr>
                    <th v-for="header in headerMetadata" :key="header"><b>{{ header.label }}</b></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in pageData" :key="rowIndex">
                    <td v-for="column in headerMetadata" :key="column">{{ row[column.value] }}</td>
                </tr>
            </tbody>
        </table>
        <FooterPanel v-model="paginator" :processed-data="processedData" @update:modelValue="$event => paginator = $event" />
    </div>
</template>