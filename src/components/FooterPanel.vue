<script setup lang="ts">
import { ref, watch } from 'vue';
import type DataPaginator from "./DataPaginator";

const props = withDefaults(defineProps<{
    modelValue: DataPaginator;
    processedData: Record<string, string>[];
}>(), {
});

const paginator = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);


watch(() => props.processedData, newVal => {
    if (paginator.value.manager === 'server') {
        return; // last page index is dictated by the server
    }

    // calculate last page index on the client
    paginator.value.lastPageNo = Math.ceil(props.processedData.length / paginator.value.itemsPerPage);
    emit('update:modelValue', paginator.value);
}, { deep: true, immediate: true });

const back = () => {
    if (paginator.value.currentPageNo <= 1) {
        return;
    }

    paginator.value.currentPageNo--;
    emit('update:modelValue', paginator.value);
};

const next = () => {
    if (paginator.value.currentPageNo >= paginator.value.lastPageNo) {
        return;
    }
    
    paginator.value.currentPageNo++;
    emit('update:modelValue', paginator.value);
};

</script>


<template>
    <div>
        <button @click="back">◄</button>
        <p>Page {{ paginator.currentPageNo }} of {{ paginator.lastPageNo }}</p>
        <button @click="next">►</button>
    </div>
</template>