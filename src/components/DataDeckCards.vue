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

const { processedData, pageData, select } = useDataDeck(props.data, props.headerMetadata, props.selectionSettings, selection, clicked, querySettings, paginator);
</script>


<template>
    <div class="ddc">
        <HeaderPanel v-if="querySettings.showHeader" v-model="querySettings" :headerMetadata="headerMetadata" />
        <TransitionGroup
            tag="div"
            class="ddc_deck"
            name="pop"
            appear>
            <div
                class="ddc_deck_card"
                :class="selection.indexOf(card) > -1 ? 'selected' : ''"
                v-for="(card, cardIndex) in pageData"
                :key="cardIndex"
                tabindex="0"
                @click="select(card)"
                @keydown.enter.stop="select(card)">
                <slot v-if="$slots.default" :card="card" /> 
                <div class="ddc_deck_card_row" v-else v-for="column in headerMetadata" :key="column.value"><b>{{ column.label }}</b>: {{ card[column.value] }} </div>
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
        gap: 12px;

        &_card{
            width: 260px;
            overflow: hidden;
            padding: 12px 20px;
            border: 1px solid #cccccc;
            border-radius: 6px;
            @include transition-hover;

            &:hover, &:focus-visible {
                background-color: #cccccc;
                outline: 0;
            }

            &.selected {
                background-color: #cccccc;
            }

            &_row {
                & + & {
                    margin-top: 12px;
                }
            }
        }
    }
}


/* Transitions */
.pop {
    &-enter {
        &-active {
            transition: all 0.3s $smooth-ease-out;
        }

        &-from {
            transform: scale(0.7);
            opacity: 0;
        }
    }

    &-leave {
        &-active {
            transition: all 0.3s $smooth-ease-in;
        }

        &-to {
            transform: scale(0.7);
            opacity: 0;
        }
    }
}
</style>