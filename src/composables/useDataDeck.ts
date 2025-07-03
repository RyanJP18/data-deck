import { ref, computed, watch } from 'vue';
import type DataDeckProps from '@/interfaces/DataDeckProps';

const useDataDeck = (props: DataDeckProps) => {
    const itemsPerPage = ref(props.paginator?.itemsPerPage ?? 2);
    const currentPage = ref(props.paginator?.currentPage ?? 1);
    
    const totalPages = computed(() => props.paginator?.lastPage ?? Math.ceil(sortedData.value.length / itemsPerPage.value));

    const filteredData = computed(() => props.data);
    const sortedData = computed(() => filteredData.value);

    const displayData = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return sortedData.value.slice(start, end);
    });

    watch(() => props.paginator, newVal => {
        itemsPerPage.value = newVal?.itemsPerPage ?? itemsPerPage.value;
        currentPage.value = newVal?.currentPage ?? currentPage.value;
        // totalPages.value = newVal?.lastPage ?? totalPages.value;
    }, { deep: true });

    return {
        currentPage,
        totalPages,
        displayData
    }
};

export default useDataDeck;