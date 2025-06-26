<script setup lang="ts">

export interface ComponentProps {
    headers: string[];
    data: string[][];
};

withDefaults(defineProps<ComponentProps>(), {
});

</script>


<template>
    <table>
        <thead>
            <tr>
                <th v-for="header in headers" :key="header">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                <td v-for="cell in row" :key="cell">{{ cell }}</td>
            </tr>
        </tbody>
    </table>
</template>