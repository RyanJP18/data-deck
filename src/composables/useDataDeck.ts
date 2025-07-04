import { ref, computed, watch } from 'vue';
import type DataDeckProps from '@/interfaces/DataDeckProps';

const useDataDeck = (props: DataDeckProps) => {
    const itemsPerPage = ref(props.paginator?.itemsPerPage ?? 2);
    const currentPageNo = ref(props.paginator?.currentPageNo ?? 1);

    
    // Selection logic
    // ---
    const select = (item: Record<string, string>) => {
        if (props.selectionSettings?.readOnly) { 
            return;
        }

        if (props.selectionSettings?.fireAndForget) {
            props.selection?.value.push(item);
            return;
        }

        const selectedIdx = props.selection?.value.indexOf(item);
        const alreadySelected = selectedIdx > -1;

        if (!alreadySelected) {
            if (!props.selectionSettings?.allowMultiple) {
                props.selection?.value.splice(0, 1);
            }

            props.selection?.value.push(item);
        } else {
            props.selection?.value.splice(selectedIdx, 1);
        }
    };
    // ---


    // Filter logic
    // ---
    const processedFilterQuery = computed(() => props.querySettings?.value.filterQuery.toLowerCase() || '');
    watch(processedFilterQuery, () => currentPageNo.value = 1);

    // Determine which columns are whitelisted for use in filtering
    const filterWhitelist = computed(() => props.headerMetadata
        .filter(metadata => metadata.useInFilter ?? true)
        .map(metadata => metadata.value)
    );

    // Apply filter
    const filteredData = computed(() => 
        props.data.filter(item => filterWhitelist.value.map(key => item[key]) // get any fields from the data that are in our filter keys
            .some(value => value.toLowerCase().includes(processedFilterQuery.value)))); // do a comparison against the filter
    // ---


    // Sort logic
    // ---
    const processedData = computed(() => {
        if (props.querySettings?.value.sortColumn === '') {
            return filteredData.value; // Just display data in its default array order if no sort is specified
        } 
    
        return filteredData.value.slice().sort((rawA, rawB) => {
            const a = (rawA[props.querySettings?.value.sortColumn]?.toString() || '').toLowerCase();
            const b = (rawB[props.querySettings?.value.sortColumn]?.toString() || '').toLowerCase();
            
            // If both values start with numbers, do a numerical sort instead
            const numMatchA = a.match(/^\d+/);
            const numMatchB = b.match(/^\d+/);
            if (numMatchA && numMatchB) {
                const numA = parseInt(numMatchA[0]);
                const numB = parseInt(numMatchB[0]);
                if (numA !== numB) {
                    return props.querySettings?.value.sortDirection === 'A-Z' ? numA - numB : numB - numA;
                }
            }

            // Default to a string sort
            if (a < b) return props.querySettings?.value.sortDirection === 'A-Z' ? -1 : 1;
            if (a > b) return props.querySettings?.value.sortDirection === 'A-Z' ? 1 : -1;
            return 0;
        });
    });
    // ---


    // Pagination logic
    // ---
    const pageData = computed(() => {
        const start = (currentPageNo.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return processedData.value.slice(start, end);
    });

    watch(() => props.paginator, newVal => {
        itemsPerPage.value = newVal?.value.itemsPerPage ?? itemsPerPage.value;
        currentPageNo.value = newVal?.value.currentPageNo ?? currentPageNo.value;
    }, { deep: true });
    // ---


    return { processedData, pageData, select }
};

export default useDataDeck;