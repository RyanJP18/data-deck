<script setup lang="ts">

const props = withDefaults(defineProps<{
    modelValue: QuerySettings;
    headerMetadata: HeaderMetadata[];
}>(), {
});

const emit = defineEmits(['update:modelValue']);

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