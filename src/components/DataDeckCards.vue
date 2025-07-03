<script setup lang="ts">
import { ref } from 'vue';
import type DataDeckProps from '@/interfaces/DataDeckProps';
import type HeaderMetadata from '@/interfaces/HeaderMetadata';
import useDataDeck from '@/composables/useDataDeck';
import FooterPanel from '@/components/FooterPanel.vue';

const props = withDefaults(defineProps<DataDeckProps>(), {
    headerMetadata: () => [] as HeaderMetadata[],
    paginator: { itemsPerPage: 2, currentPage: 1, lastPage: 1, manager: 'client' } as DataPaginator,
    loading: false,
});


const paginator = ref(props.paginator);

const { processedData, pageData } = useDataDeck({ data: props.data, headerMetadata: props.headerMetadata, paginator: paginator });

</script>


<template>
    <div>
        <div v-for="(card, cardIndex) in pageData" :key="cardIndex">
            <div v-for="column in headerMetadata" :key="column"><b>{{ column.label }}</b>: {{ card[column.value] }} </div>
        </div>
        <FooterPanel v-model="paginator" :processed-data="processedData" @update:modelValue="$event => paginator = $event" />
    </div>
</template>