<script setup lang="ts">
import { ref, watch } from 'vue';
import type DataDeckProps from '@/interfaces/DataDeckProps';
import type SelectionSettings from '@/interfaces/SelectionSettings';
import type QuerySettings from '@/interfaces/QuerySettings';
import type DataPaginator from '@/interfaces/DataPaginator';
import useDataDeck from '@/composables/useDataDeck';
import FooterPanel from '@/components/FooterPanel.vue';
import HeaderPanel from '@/components/HeaderPanel.vue';

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

const { processedData, pageData, select } = useDataDeck(props.data, props.headerMetadata, props.selectionSettings, selection, clicked, querySettings, paginator);
</script>


<template>
    <div class="ddt">
        <HeaderPanel v-if="querySettings.showHeader" v-model="querySettings" :headerMetadata="headerMetadata" />
        <table class="ddt_table">
            <thead>
                <TransitionGroup tag="tr" name="pop" appear>
                    <th v-for="header in headerMetadata" :key="header.value">{{ header.label ?? header.value }}</th>
                </TransitionGroup>
            </thead>
            <tbody>
                <TransitionGroup 
                    tag="tr"
                    name="pop" 
                    appear
                    :class="selection.indexOf(row) > -1 ? 'selected' : ''"
                    v-for="(row, rowIndex) in pageData"
                    :key="rowIndex"
                    tabindex="0"
                    @click="select(row)"
                    @keydown.enter.stop="select(row)">
                    <slot v-if="$slots.default" :row="row" /> 
                    <td v-else v-for="column in headerMetadata" :key="column.value">{{ row[column.value] }}</td>
                </TransitionGroup>
            </tbody>
        </table>
        <FooterPanel v-if="paginator.showFooter && paginator.pagination !== 'none'" v-model="paginator" :processed-data="processedData" @update:modelValue="$event => paginator = $event" />
    </div>
</template>


<style scoped lang="scss">
.ddt {
    &_table {
        width: 100%;
        white-space: nowrap;

        & > thead {
            & > tr {
                height: 36px;
                border-bottom: 1px solid $greyscale-3;

                & > th {
                    vertical-align: middle;
                    text-align: center;
                    @include transition-hover;
                    font-weight: bold;

                    &:hover, &:focus-visible {
                        background-color: $greyscale-3;
                    }
                }
            }
        }

        & > tbody { 
            & > tr {
                height: 32px;
                @include transition-hover;

                &:nth-child(even) {
                    background-color: $greyscale-4;
                }

                & > td {
                    vertical-align: middle;
                    text-align: center;
                }

                &:hover td, &:focus-visible td {
                    background-color: $greyscale-3;
                }

                &.selected td {
                    background-color: $greyscale-3;
                }
            }
        }
    }
}
</style>