<script setup lang="ts">
import DataDeckTable from '@/components/DataDeckTable.vue';
import DataDeckCards from '@/components/DataDeckCards.vue';

const gymData = [
    { 'name': 'John Doe', 'age': 35, 'gender': "Male", 'membership_status': 'Active', 'mob': "03490234920" },
    { 'name': 'Jane Doe', 'age': 18, 'gender': "Female", 'membership_status': 'Active', 'mob': "2425325425" },
    { 'name': 'John Smith', 'age': 19, 'gender': "Male", 'membership_status': 'Inactive', 'mob': "1341414553" },
    { 'name': 'Jack Smith', 'age': 23, 'gender': "Male", 'membership_status': 'Active', 'mob': "04895385" },
    { 'name': 'Amy Calahan', 'age': 29, 'gender': "Female", 'membership_status': 'Active', 'mob': "03490234920" },
    { 'name': 'Ricky James', 'age': 31, 'gender': "Male", 'membership_status': 'Active', 'mob': "0045839458" },
    { 'name': 'Kevin Thomas', 'age': 14, 'gender': "Male", 'membership_status': 'Active', 'mob': "59043950430" },
    { 'name': 'Kate Jones', 'age': 15, 'gender': "Female", 'membership_status': 'Inactive', 'mob': "706977075" },
    { 'name': 'Trevor Bond', 'age': 45, 'gender': "Male", 'membership_status': 'Inactive', 'mob': "5740503924" },
    { 'name': 'Howard Bond', 'age': 42, 'gender': "Male", 'membership_status': 'Active', 'mob': "2313030944" },
    { 'name': 'Sarah Bond', 'age': 48, 'gender': "Female", 'membership_status': 'Inactive', 'mob': "43634394063" },
    { 'name': 'Aaron Johnson', 'age': 23, 'gender': "Male", 'membership_status': 'Active', 'mob': "09503490539" },
    { 'name': 'Sam Johnson', 'age': 31, 'gender': "Female", 'membership_status': 'Active', 'mob': "0905902595" },
    { 'name': 'George Davidson', 'age': 47, 'gender': "Male", 'membership_status': 'Active', 'mob': "25032592" },
    { 'name': 'Gordon Davidson', 'age': 67, 'gender': "Male", 'membership_status': 'Inactive', 'mob': "1312232134" },
    { 'name': 'Alice Connor', 'age': 22, 'gender': "Female", 'membership_status': 'Active', 'mob': "1241049004" },
    { 'name': 'Ben Connor', 'age': 20, 'gender': "Male",'membership_status': 'Active', 'mob': "34290492034" },
    { 'name': 'Josh Trent', 'age': 30, 'gender': "Male", 'membership_status': 'Active', 'mob': "32502590352" },
    { 'name': 'James Trent', 'age': 28, 'gender': "Male", 'membership_status': 'Inactive', 'mob': "3042930429" },
    { 'name': 'Rebecca Matthews', 'age': 35, 'gender': "Female", 'membership_status': 'Active', 'mob': "030929340" },
    { 'name': 'Adam Matthews', 'age': 34, 'gender': "Male", 'membership_status': 'Active', 'mob': "340242903492" },
    { 'name': 'Kirsty Matthews', 'age': 31, 'gender': "Female", 'membership_status': 'Active', 'mob': "324829348923" },
    { 'name': 'Caelan James', 'age': 18, 'gender': "Male", 'membership_status': 'Active', 'mob': "12391023213" },
    { 'name': 'Catherine Ramsey', 'age': 24, 'gender': "Female", 'membership_status': 'Inactive', 'mob': "349023492034" },
    { 'name': 'Kalie Ramsey', 'age': 23, 'gender': "Female", 'membership_status': 'Inactive', 'mob': "94891814984" },
];

const metadata = [
    { value: 'name', label: 'Name' },
    { value: 'age', label: 'Age' },
    { value: 'gender', label: 'Gender' },
    { value: 'mob', label: 'Phone Number' },
    { value: 'membership_status', label: 'Membership' },
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