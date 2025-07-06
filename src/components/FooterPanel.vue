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
    if (paginator.value.manager === 'server') {
        return; // last page index is dictated by the server
    }

    // calculate last page index on the client
    paginator.value.lastPageNo = Math.ceil(props.processedData.length / paginator.value.itemsPerPage);
    emit('update:modelValue', paginator.value);
}, { deep: true, immediate: true });

const rangeLimit = 10;
const pageRange = computed(() => {
    if (!paginator.value.lastPageNo) {
        return [];
    }

    const pages = [] as string[];

    for (let i = 1; i <= Math.min(rangeLimit, paginator.value.lastPageNo); i++) {
        pages.push(i.toString());
    }
    
    if (paginator.value.lastPageNo > rangeLimit + 1) {
        pages.push('...');
    }

    if (paginator.value.lastPageNo > rangeLimit) {
        pages.push(paginator.value.lastPageNo.toString());
    }
    
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
    if (!paginator.value.lastPageNo || paginator.value.currentPageNo === page || page < 1 || page > paginator.value.lastPageNo) {
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
                :class="parseInt(page) === paginator.currentPageNo ? 'active' : ''"
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
    height: 28px;

    & > button {
        display: flex;
        align-items: center;
        cursor: pointer;

        & > p {
            margin-top: -1px;
        }

        & > svg {
            height: 18px;
            margin-left: 4px;
            margin-right: 4px;
        }
    }

    &_carousel {
        margin-left: 16px;
        margin-right: 16px;

        &_page {
            cursor: pointer; 
            & + & {
                margin-left: 8px;
            }

            &.active {
                font-weight: bold;
            }
        }
    }
}
</style>