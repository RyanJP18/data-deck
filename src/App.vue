<script setup lang="ts">
import DataDeckTable from '@/components/DataDeckTable.vue';
import DataDeckCards from '@/components/DataDeckCards.vue';

const gymData = [
    { 'name': 'John Doe', 'age': 35, 'membership_status': 'Active' },
    { 'name': 'Jane Doe', 'age': 18, 'membership_status': 'Active' },
    { 'name': 'John Smith', 'age': 19, 'membership_status': 'Inactive' },
    { 'name': 'Jack Smith', 'age': 23, 'membership_status': 'Active' },
    { 'name': 'Amy Calahan', 'age': 29, 'membership_status': 'Active' },
    { 'name': 'Ricky James', 'age': 31, 'membership_status': 'Active' },
    { 'name': 'Kevin Thomas', 'age': 14, 'membership_status': 'Active' },
    { 'name': 'Kate Jones', 'age': 15, 'membership_status': 'Inactive' },
    { 'name': 'Trevor Bond', 'age': 45, 'membership_status': 'Inactive' },
    { 'name': 'Howard Bond', 'age': 42, 'membership_status': 'Active' },
    { 'name': 'Sarah Bond', 'age': 48, 'membership_status': 'Inactive' },
    { 'name': 'Aaron Johnson', 'age': 23, 'membership_status': 'Active' },
    { 'name': 'Sam Johnson', 'age': 31, 'membership_status': 'Active' },
    { 'name': 'George Davidson', 'age': 47, 'membership_status': 'Active' },
    { 'name': 'Gordon Davidson', 'age': 67, 'membership_status': 'Inactive' },
    { 'name': 'Alice Connor', 'age': 22, 'membership_status': 'Active' },
    { 'name': 'Ben Connor', 'age': 20, 'membership_status': 'Active' },
    { 'name': 'Josh Trent', 'age': 30, 'membership_status': 'Active' },
    { 'name': 'James Trent', 'age': 28, 'membership_status': 'Inactive' },
    { 'name': 'Rebecca Matthews', 'age': 35, 'membership_status': 'Active'},
    { 'name': 'Adam Matthews', 'age': 34, 'membership_status': 'Active'},
    { 'name': 'Kirsty Matthews', 'age': 31, 'membership_status': 'Active'},
    { 'name': 'Caelan James', 'age': 18, 'membership_status': 'Active' },
    { 'name': 'Catherine Ramsey', 'age': 24, 'membership_status': 'Inactive'},
    { 'name': 'Kyle Ramsey', 'age': 23, 'membership_status': 'Inactive'},
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