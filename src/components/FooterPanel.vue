<script setup lang="ts">
import { ref } from 'vue';
import type DataPaginator from "./DataPaginator";

const props = withDefaults(defineProps<{
    modelValue: DataPaginator;
}>(), {
});

const paginator = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);


const back = () => {
    if (paginator.value.currentPage <= 1) {
        return;
    }

    paginator.value.currentPage--;
    emit('update:modelValue', paginator.value);
};

const next = () => {
    if (paginator.value.currentPage >= paginator.value.totalPages) {
        return;
    }
    
    paginator.value.currentPage++;
    emit('update:modelValue', paginator.value);
};

</script>


<template>
    <div>
        <button @click="back">◄</button>
        <p>Page {{ modelValue.currentPage }} of {{ modelValue.totalPages }}</p>
        <button @click="next">►</button>
    </div>
</template>