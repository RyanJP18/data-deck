<script setup lang="ts">
import { ref, watch } from 'vue';
import type DataDeckProps from '@/interfaces/DataDeckProps';
import type SelectionSettings from '@/interfaces/SelectionSettings';
import type QuerySettings from '@/interfaces/QuerySettings';
import type DataPaginator from '@/interfaces/DataPaginator';
import useDataDeck from '@/composables/useDataDeck';
import FooterPanel from '@/components/FooterPanel.vue';
import HeaderPanel from '@/components/HeaderPanel.vue';
import IconAZ from '@/components/Icons/IconAZ.vue';
import IconZA from '@/components/Icons/IconZA.vue';

const props = withDefaults(defineProps<DataDeckProps>(), {
    selectionSettings: () => ({ readOnly: false, fireAndForget: true, allowMultiple: false }) as SelectionSettings,
    selection: () => [] as Record<string, string>[],
    querySettings: () => ({ showHeader: true, filterQuery: '', sortColumn: '', sortDirection: 'A-Z' }) as QuerySettings,
    paginator: () => ({ pagination: 'client', showFooter: true, itemsPerPage: 20, currentPageNo: 1 }) as DataPaginator,
    loading: false,
});

const emit = defineEmits(['selected', 'deselected']);


const clicked = ref<Record<string, string> | null>(null);
const selection = ref(props.selection);

let clickFlush = false;

watch(clicked, () => {
    if (clickFlush) {
        clickFlush = false;
        return;
    }

    if (props.selectionSettings.fireAndForget || (clicked.value && selection.value.indexOf(clicked.value) > -1)) {
        emit('selected', clicked.value, selection.value);
    } else {
        emit('deselected', clicked.value, selection.value);
    }

    clickFlush = true; 
    clicked.value = null;
}, { deep: true });

const querySettings = ref(props.querySettings);
const paginator = ref(props.paginator);

const headerClicked = (value: string) => {
    if (querySettings.value.sortColumn === value) {
        querySettings.value.sortDirection = querySettings.value.sortDirection === 'A-Z' ? 'Z-A' : 'A-Z';
    } else {
        querySettings.value.sortColumn = value;
    }
};

const { processedData, pageData, select } = useDataDeck(props.data, props.fieldMetadata, props.selectionSettings, selection, clicked, querySettings, paginator);
</script>


<template>
    <div class="ddt">
        <HeaderPanel v-if="querySettings.showHeader" v-model="querySettings" :fieldMetadata="fieldMetadata" />
        <table class="ddt_table">
            <thead class="ddt_table_head">
                <TransitionGroup class="ddt_table_head_row" tag="tr" name="pop" appear>
                    <th class="ddt_table_head_row_cell" v-for="header in fieldMetadata" :key="header.value" @click="headerClicked(header.value)">
                        <div>
                            <p>{{ header.label ?? header.value }}</p>
                            <IconAZ v-if="querySettings.sortColumn === header.value && querySettings.sortDirection === 'A-Z'" />
                            <IconZA v-else-if="querySettings.sortColumn === header.value && querySettings.sortDirection === 'Z-A'" />
                        </div>
                    </th>
                </TransitionGroup>
            </thead>
            <TransitionGroup
                v-if="$slots.default"
                tag="tbody"
                name="pop"
                appear
                class="ddt_table_body">
                <slot
                    :row="row" 
                    class="ddt_table_body_row"
                    :class="{ selected: selection.some(item => JSON.stringify(item) === JSON.stringify(row)) }"
                    v-for="(row, rowIndex) in pageData"
                    :key="rowIndex"
                    tabindex="0"
                    @click="select(row)"
                    @keydown.enter.stop="select(row)"
                /> 
            </TransitionGroup>
            <TransitionGroup
                v-else
                tag="tbody"
                name="pop"
                appear
                class="ddt_table_body">
                <tr
                    class="ddt_table_body_row"
                    :class="{ selected: selection.some(item => JSON.stringify(item) === JSON.stringify(row)) }"
                    v-for="(row, rowIndex) in pageData"
                    :key="rowIndex"
                    tabindex="0"
                    @click="select(row)"
                    @keydown.enter.stop="select(row)">
                    <td v-for="column in fieldMetadata" :key="column.value" class="ddt_table_body_row_cell">{{ row[column.value] }}</td>
                </tr>
            </TransitionGroup>
        </table>
        <FooterPanel v-if="paginator.showFooter && paginator.pagination !== 'none'" v-model="paginator" :processed-data="processedData" @update:modelValue="$event => paginator = $event" />
    </div>
</template>


<style scoped lang="scss">
.ddt {
    &_table {
        width: 100%;
        white-space: nowrap;

        &_head {
            &_row {
                height: 36px;
                border-bottom: 1px solid $greyscale-3;

                &_cell {
                    vertical-align: middle;
                    text-align: center;
                    @include transition-hover;
                    font-weight: bold;

                    &:hover, &:focus-visible {
                        background-color: $greyscale-3;
                    }

                    & > div {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        
                        & > svg {
                            height: 16px;
                            margin-left: 4px;
                        }
                    }
                }
            }
        }

        &_body { 
            &_row {
                height: 32px;
                background-color: white;
                @include transition-hover;
                transition: all 0.3s $smooth-ease-out;

                &:nth-child(even) {
                    background-color: $greyscale-4;
                }

                &:hover, &:focus-visible, &.selected {
                    background-color: $greyscale-3;
                }

                &_cell {
                    vertical-align: middle;
                    text-align: center;
                }
            }
        }
    }
}
</style>