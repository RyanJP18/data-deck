<script setup lang="ts">
import { ref, computed } from 'vue';
import type DataPaginator from "./DataPaginator";

const props = withDefaults(defineProps<{
    modelValue: DataPaginator;
    dataCount: number;
}>(), {
});

const paginator = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);


const lastPage = computed(() => {
    if (paginator.value.manager === 'server') {
        return paginator.lastPage; // server dictates
    } else {
        return Math.ceil(props.dataCount / paginator.value.itemsPerPage); // calculate the last page on the fly
    }
});

const back = () => {
    if (paginator.value.currentPage <= 1) {
        return;
    }

    paginator.value.currentPage--;
    emit('update:modelValue', paginator.value);
};

const next = () => {
    if (paginator.value.currentPage >= lastPage.value) {
        return;
    }
    
    paginator.value.currentPage++;
    emit('update:modelValue', paginator.value);
};

</script>


<template>
    <div>
        <button @click="back">◄</button>
        <p>Page {{ modelValue.currentPage }} of {{ lastPage }}</p>
        <button @click="next">►</button>
    </div>
</template>