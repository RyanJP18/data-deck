import { ref, computed, watch } from 'vue';
import type DataDeckProps from '@/interfaces/DataDeckProps';

const useDataDeck = (props: DataDeckProps) => {
    const itemsPerPage = ref(props.paginator?.itemsPerPage ?? 2);
    const currentPage = ref(props.paginator?.currentPage ?? 1);

    const filteredData = computed(() => props.data);
    const processedData = computed(() => filteredData.value);

    const pageData = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return processedData.value.slice(start, end);
    });

    watch(() => props.paginator, newVal => {
        itemsPerPage.value = newVal?.value.itemsPerPage ?? itemsPerPage.value;
        currentPage.value = newVal?.value.currentPage ?? currentPage.value;
    }, { deep: true });

    return {
        currentPage,
        processedData,
        pageData
    }
};

export default useDataDeck;