<script setup lang="ts">
import { ref } from 'vue';
import type DataDeckProps from '@/interfaces/DataDeckProps';
import type HeaderMetadata from '@/interfaces/HeaderMetadata';
import useDataDeck from '@/composables/useDataDeck';

const props = withDefaults(defineProps<DataDeckProps>(), {
    headerMetadata: () => [] as HeaderMetadata[],
    paginator: { itemsPerPage: 2, currentPage: 1, lastPage: 1, manager: 'client' } as DataPaginator,
    loading: false,
});


const paginator = ref(props.paginator);

const { displayData } = useDataDeck({ data: props.data, headerMetadata: props.headerMetadata, paginator: paginator });

</script>


<template>
    <div>
        <div v-for="(card, cardIndex) in displayData" :key="cardIndex">
            <div v-for="column in headerMetadata" :key="column"><b>{{ column.label }}</b>: {{ card[column.value] }} </div>
        </div>
    </div>
</template>