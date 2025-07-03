import { ref, computed, watch } from 'vue';
import type DataDeckProps from '@/interfaces/DataDeckProps';

const useDataDeck = (props: DataDeckProps) => {
    const itemsPerPage = ref(props.paginator?.itemsPerPage ?? 2);
    const currentPage = ref(props.paginator?.currentPage ?? 1);


    // Filter logic
    const processedFilterQuery = computed(() => props.dataSettings?.value.filterQuery.toLowerCase() || '');
    watch(processedFilterQuery, () => currentPage.value = 1);

    // Determine which fields are going to be used in sort
    const filterKeys = computed(() => props.headerMetadata
        .filter(metadata => metadata.filterBy ?? true)
        .map(metadata => metadata.value)
    );

    const filteredData = computed(() => 
        props.data.filter(item => filterKeys.value.map(key => item[key]) // get any fields from the data that are in our filter keys
            .some(value => value.toLowerCase().includes(processedFilterQuery.value)))); // do a comparison against the filter


    // Sort logic
    const processedData = computed(() => {
        if (props.dataSettings?.value.sortColumn === '') {
            return filteredData.value; // Just display data in its default array order if no sort is specified
        } 
    
        return filteredData.value.slice().sort((rawA, rawB) => {
            const a = (rawA[props.dataSettings?.value.sortColumn]?.toString() || '').toLowerCase();
            const b = (rawB[props.dataSettings?.value.sortColumn]?.toString() || '').toLowerCase();
            
            // If both values start with numbers, do a numerical sort instead
            const numMatchA = a.match(/^\d+/);
            const numMatchB = b.match(/^\d+/);
            if (numMatchA && numMatchB) {
                const numA = parseInt(numMatchA[0]);
                const numB = parseInt(numMatchB[0]);
                if (numA !== numB) {
                    return props.dataSettings?.value.sortDirection === 'Ascending' ? numA - numB : numB - numA;
                }
            }

            // Default to a string sort
            if (a < b) return props.dataSettings?.value.sortDirection === 'Ascending' ? -1 : 1;
            if (a > b) return props.dataSettings?.value.sortDirection === 'Ascending' ? 1 : -1;
            return 0;
        });
    });


    // Pagination logic
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