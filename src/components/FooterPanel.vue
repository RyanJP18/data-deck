<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type DataPaginator from '@/interfaces/DataPaginator';
import IconPrevious from '@/components/Icons/IconPrevious.vue';
import IconNext from '@/components/Icons/IconNext.vue';

const props = withDefaults(defineProps<{
    modelValue: DataPaginator;
    processedData: Record<string, string>[];
}>(), {
});

const emit = defineEmits(['update:modelValue']);


const paginator = ref(props.modelValue);

watch(() => props.processedData, () => {
    if (paginator.value.pagination === 'server') {
        return; // last page index is dictated by the server
    }

    // calculate last page index on the client
    paginator.value.lastPageNo = Math.ceil(props.processedData.length / paginator.value.itemsPerPage);
    emit('update:modelValue', paginator.value);
}, { deep: true, immediate: true });

const rangeLimit = 5;
const pageRange = computed(() => {
    if (!paginator.value.lastPageNo) {
        return [];
    }

    // Set up a carousel of clickable pages, e.g. 1 ... 3 4 5 6 7 [8] 9 10 11 12 13 .. 24  

    // Determine start and end points
    const start = Math.max(1, paginator.value.currentPageNo - rangeLimit);
    const end = Math.min(paginator.value.lastPageNo, paginator.value.currentPageNo + rangeLimit);

    // Build up array of displayed values
    const pages = [] as string[];
    if (start > 1) pages.push('1');
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i.toString());
    if (paginator.value.lastPageNo > end + 1) pages.push('...');
    if (paginator.value.lastPageNo > end) pages.push(paginator.value.lastPageNo.toString());
    
    return pages;
});

const back = () => {
    if (paginator.value.currentPageNo <= 1) {
        return;
    }

    paginator.value.currentPageNo--;
    emit('update:modelValue', paginator.value);
};

const next = () => {
    if (!paginator.value.lastPageNo || paginator.value.currentPageNo >= paginator.value.lastPageNo) {
        return;
    }
    
    paginator.value.currentPageNo++;
    emit('update:modelValue', paginator.value);
};

const choose = (page: number) => {
    if (Number.isNaN(page) || !paginator.value.lastPageNo || paginator.value.currentPageNo === page || page < 1 || page > paginator.value.lastPageNo) {
        return;
    }
    
    paginator.value.currentPageNo = page;
    emit('update:modelValue', paginator.value);
};
</script>


<template>
    <div class="fp">
        <button @click="back">
            <IconPrevious /> 
            <p>Previous</p>
        </button>
        <p class="fp_carousel">
            <a
                class="fp_carousel_page"
                :class="{ active: parseInt(page) === paginator.currentPageNo }"
                :key="page"
                v-for="page in pageRange"
                @click="choose(parseInt(page))">{{ page }}</a>
        </p>
        <button @click="next">
            <p>Next</p> 
            <IconNext />
        </button>
    </div>
</template>


<style scoped lang="scss">
.fp {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;

    & > button {
        display: flex;
        align-items: center;
        cursor: pointer;

        & > p {
            margin-top: -1px;
        }

        & > svg {
            height: 18px;
            margin-left: $spacing-1;
            margin-right: $spacing-1;
        }
    }

    &_carousel {
        margin-left: $spacing-3;
        margin-right: $spacing-3;

        &_page {
            cursor: pointer; 
            & + & {
                margin-left: $spacing-2;
            }

            &.active {
                font-weight: bold;
            }
        }
    }
}
</style>