<script setup lang="ts">
import DataDeckTable from '@/components/DataDeckTable.vue';
import DataDeckCards from '@/components/DataDeckCards.vue';

const gymData = [
    { 'name': 'John Doe', 'age': '35', 'membership_status': 'Active' },
    { 'name': 'Jane Doe', 'age': '18', 'membership_status': 'Active' },
    { 'name': 'John Smith', 'age': '19', 'membership_status': 'Inactive' },
    { 'name': 'Jack Smith', 'age': '23', 'membership_status': 'Active' },
    { 'name': 'Ricky James', 'age': '31', 'membership_status': 'Inactive' },
];

const metadata = [
    { value: 'name', label: 'Name' },
    { value: 'membership_status', label: 'Membership' },
    { value: 'age', label: 'Age' },
];

</script>


<template>
    <div class="app">
        This is a table:
        <br /><hr />
        <DataDeckTable :header-metadata="metadata" :data="gymData" />
        <br /><hr />
        These are cards:
        <br /><hr />
        <DataDeckCards :header-metadata="metadata" :data="gymData" />
    </div>
</template>


<style scoped lang="scss">
.app {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>