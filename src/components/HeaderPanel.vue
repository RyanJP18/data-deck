<script setup lang="ts">
import type HeaderMetadata from '@/interfaces/HeaderMetadata';
import type QuerySettings from '@/interfaces/QuerySettings';

const props = withDefaults(defineProps<{
    modelValue: QuerySettings;
    headerMetadata: HeaderMetadata[];
}>(), {
});
</script>


<template>
    <div>
        <input v-model="modelValue.filterQuery" />
        <select v-model="modelValue.sortColumn">
            <option v-for="header in props.headerMetadata" :value="header.value" :key="header.value">{{ header.label }}</option>
        </select>
        <select v-model="modelValue.sortDirection">
            <option>A-Z
            </option>
            <option>Z-A</option>
        </select>
    </div>
</template>