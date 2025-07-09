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
    paginator: () => ({ pagination: 'client', showFooter: true, itemsPerPage: 12, currentPageNo: 1 }) as DataPaginator,
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

const { processedData, pageData, select } = useDataDeck(props.data, props.fieldMetadata, props.selectionSettings, selection, clicked, querySettings, paginator);
</script>


<template>
    <div class="ddc">
        <HeaderPanel v-if="querySettings.showHeader" v-model="querySettings" :fieldMetadata="fieldMetadata" />
        <TransitionGroup
            tag="div"
            class="ddc_deck"
            name="pop"
            appear>
            <div v-for="(card, cardIndex) in pageData" :key="cardIndex">
                <slot
                    v-if="$slots.default"
                    :card="card" 
                    class="ddc_deck_card"
                    :class="selection.indexOf(card) > -1 ? 'selected' : ''"
                    tabindex="0"
                    @click="select(card)"
                    @keydown.enter.stop="select(card)"
                /> 
                <div
                    v-else
                    class="ddc_deck_card"
                    :class="selection.indexOf(card) > -1 ? 'selected' : ''"
                    tabindex="0"
                    @click="select(card)"
                    @keydown.enter.stop="select(card)"
                >
                    <div class="ddc_deck_card_row" v-for="column in fieldMetadata" :key="column.value"><b>{{ column.label ?? column.value }}</b>: {{ card[column.value] }} </div>
                </div>
            </div>
        </TransitionGroup>
        <FooterPanel v-if="paginator.showFooter && paginator.pagination !== 'none'" v-model="paginator" :processed-data="processedData" @update:modelValue="$event => paginator = $event" />
    </div>
</template>


<style scoped lang="scss">
.ddc {
    &_deck {
        display: flex;
        flex-wrap: wrap;
        gap: $spacing-3;

        &_card{
            width: 280px;
            overflow: hidden;
            padding: $spacing-3;
            border: 1px solid $greyscale-3;
            border-radius: $rounded;
            @include transition-hover;
            transition: all 0.3s $smooth-ease-out;

            &:hover, &:focus-visible, .selected {
                background-color: $greyscale-3;
                outline: 0;
            }

            &_row {
                & + & {
                    margin-top: $spacing-2;
                }
            }
        }
    }
}
</style>