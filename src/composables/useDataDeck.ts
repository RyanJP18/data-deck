import { ref, computed, watch, type Ref } from 'vue';
import type HeaderMetadata from '@/interfaces/HeaderMetadata';
import type SelectionSettings from '@/interfaces/SelectionSettings';
import type QuerySettings from '@/interfaces/QuerySettings';
import type DataPaginator from '@/interfaces/DataPaginator';

const useDataDeck = (
    data: Record<string, string>[], 
    headerMetadata: HeaderMetadata[], 
    selectionSettings: SelectionSettings,
    selection: Ref<Record<string, string>[]>, 
    clicked: Ref<Record<string, string> | null>,
    querySettings: Ref<QuerySettings>,
    paginator: Ref<DataPaginator>) => {

    const itemsPerPage = ref(paginator.value.itemsPerPage);
    const currentPageNo = ref(paginator.value.currentPageNo);

    
    // Selection logic
    // ---
    const select = (item: Record<string, string>) => {
        if (selectionSettings.readOnly) { 
            return;
        }

        if (!selectionSettings.fireAndForget) {
            const selectedIdx = selection.value.indexOf(item);
            const alreadySelected = selectedIdx > -1;

            if (!alreadySelected) {
                if (!selectionSettings.allowMultiple) {
                    selection.value.splice(0, 1);
                }

                selection.value.push(item);
            } else {
                selection.value.splice(selectedIdx, 1);
            }
        }

        clicked.value = item;
    };
    // ---


    // Filter logic
    // ---
    const processedFilterQuery = computed(() => querySettings.value.filterQuery.toLowerCase() || '');
    watch(processedFilterQuery, () => currentPageNo.value = 1);

    // Determine which columns are whitelisted for use in filtering
    const filterWhitelist = computed(() => headerMetadata
        .filter(metadata => metadata.useInFilter ?? true)
        .map(metadata => metadata.value)
    );

    // Apply filter
    const filteredData = computed(() => 
        data.filter(item => filterWhitelist.value.map(key => item[key]) // get any fields from the data that are in our filter keys
            .some(value => value.toString().toLowerCase().includes(processedFilterQuery.value)))); // do a comparison against the filter
    // ---


    // Sort logic
    // ---
    const processedData = computed(() => {
        if (querySettings.value.sortColumn === '') {
            return filteredData.value; // Just display data in its default array order if no sort is specified
        } 
    
        return filteredData.value.slice().sort((rawA, rawB) => {
            const a = (rawA[querySettings.value.sortColumn]?.toString() || '').toLowerCase();
            const b = (rawB[querySettings.value.sortColumn]?.toString() || '').toLowerCase();
            
            // If both values start with numbers, do a numerical sort instead
            const numMatchA = a.match(/^\d+/);
            const numMatchB = b.match(/^\d+/);
            if (numMatchA && numMatchB) {
                const numA = parseInt(numMatchA[0]);
                const numB = parseInt(numMatchB[0]);
                if (numA !== numB) {
                    return querySettings.value.sortDirection === 'A-Z' ? numA - numB : numB - numA;
                }
            }

            // Default to a string sort
            if (a < b) return querySettings.value.sortDirection === 'A-Z' ? -1 : 1;
            if (a > b) return querySettings.value.sortDirection === 'A-Z' ? 1 : -1;
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

    watch(() => paginator, newVal => {
        itemsPerPage.value = newVal.value.itemsPerPage ?? itemsPerPage.value;
        currentPageNo.value = newVal.value.currentPageNo ?? currentPageNo.value;
    }, { deep: true });
    // ---


    return { processedData, pageData, select };
};

export default useDataDeck;