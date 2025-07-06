<script setup lang="ts">
import { ref } from 'vue';
import type HeaderMetadata from '@/interfaces/HeaderMetadata';
import type QuerySettings from '@/interfaces/QuerySettings';
import IconSearch from '@/components/Icons/IconSearch.vue';

const props = withDefaults(defineProps<{
    modelValue: QuerySettings;
    headerMetadata: HeaderMetadata[];
}>(), {
});

const modelValue = ref(props.modelValue);
</script>


<template>
    <div class="hp">
        <div class="hp_filter">
            <IconSearch />
            <input v-model="modelValue.filterQuery" placeholder="Type to filter..." />
        </div>
        <div class="hp_sort">
            <select v-model="modelValue.sortColumn">
                <option v-for="header in props.headerMetadata" :value="header.value" :key="header.value">{{ header.label }}</option>
            </select>
            <select v-model="modelValue.sortDirection">
                <option>A-Z
                </option>
                <option>Z-A</option>
            </select>
        </div>
    </div>
</template>


<style scoped lang="scss">
.hp {
    display: flex;
    margin-bottom: 8px;
    justify-content: space-between;

    &_filter {
        display: flex;
        align-items: center;
        padding: 4px;
        border: 1px solid #cccccc;
        border-radius: 6px;

        & > svg {
            height: 18px;
            color: #cccccc;
            margin-right: 8px;
        }
    }

    &_sort {
        & > select {
            padding: 4px;
            background-color: #ffffff;
            border: 1px solid #cccccc;
            border-radius: 6px;

            &:first-of-type {
                width: 160px;
                margin-right: 8px;
            }
        }
    }
}
</style>