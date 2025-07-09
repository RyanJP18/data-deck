<script setup lang="ts">
import { ref } from 'vue';
import type FieldMetadata from '@/interfaces/FieldMetadata';
import type QuerySettings from '@/interfaces/QuerySettings';
import IconSearch from '@/components/Icons/IconSearch.vue';

const props = withDefaults(defineProps<{
    modelValue: QuerySettings;
    fieldMetadata: FieldMetadata[];
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
                <option value="" selected disabled hidden>Sort by...</option>
                <option v-for="header in props.fieldMetadata" :value="header.value" :key="header.value">{{ header.label ?? header.value }}</option>
            </select>
            <select v-model="modelValue.sortDirection">
                <option>A-Z</option>
                <option>Z-A</option>
            </select>
        </div>
    </div>
</template>


<style scoped lang="scss">
.hp {
    display: flex;
    margin-bottom: $spacing-2;
    justify-content: space-between;

    &_filter {
        display: flex;
        align-items: center;
        padding: $spacing-1;
        border: 1px solid $greyscale-3;
        border-radius: $rounded;

        & > svg {
            height: 18px;
            color: $greyscale-3;
            margin-right: $spacing-2;
        }
    }

    &_sort {
        & > select {
            padding: $spacing-1;
            background-color: white;
            border: 1px solid $greyscale-3;
            border-radius: $rounded;

            &:first-of-type {
                width: 160px;
                margin-right: $spacing-2;
            }
        }
    }
}
</style>