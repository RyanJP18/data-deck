<script setup lang="ts">
import DataDeckTable from '@/components/DataDeckTable.vue';
import DataDeckCards from '@/components/DataDeckCards.vue';
</script>


<template>
    <div class="app">
        <DataDeckTable :headers="['Test', 'Test2']" :data="[['Val1', 'Val2'], ['Val3', 'Val4']]" />
        <DataDeckCards :headers="['Test', 'Test2']" :data="[['Val1', 'Val2'], ['Val3', 'Val4']]" />
    </div>
</template>


<style scoped lang="scss">
.app {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>