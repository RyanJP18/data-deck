<script setup lang="ts">
import DataDeckTable from '@/components/DataDeckTable.vue';
import DataDeckCards from '@/components/DataDeckCards.vue';

const gymData = [
    { 'name': 'John Doe', 'age': '35', 'gender': 'Male', 'membership_status': 'Active', 'mob': '03490234920' },
    { 'name': 'Jane Doe', 'age': '18', 'gender': 'Female', 'membership_status': 'Active', 'mob': '2425325425' },
    { 'name': 'John Smith', 'age': '19', 'gender': 'Male', 'membership_status': 'Inactive', 'mob': '1341414553' },
    { 'name': 'Jack Smith', 'age': '23', 'gender': 'Male', 'membership_status': 'Active', 'mob': '04895385' },
    { 'name': 'Amy Calahan', 'age': '29', 'gender': 'Female', 'membership_status': 'Active', 'mob': '03490234920' },
    { 'name': 'Ricky James', 'age': '31', 'gender': 'Male', 'membership_status': 'Active', 'mob': '0045839458' },
    { 'name': 'Kevin Thomas', 'age': '14', 'gender': 'Male', 'membership_status': 'Active', 'mob': '59043950430' },
    { 'name': 'Kate Jones', 'age': '15', 'gender': 'Female', 'membership_status': 'Inactive', 'mob': '706977075' },
    { 'name': 'Trevor Bond', 'age': '45', 'gender': 'Male', 'membership_status': 'Inactive', 'mob': '5740503924' },
    { 'name': 'Howard Bond', 'age': '42', 'gender': 'Male', 'membership_status': 'Active', 'mob': '2313030944' },
    { 'name': 'Sarah Bond', 'age': '48', 'gender': 'Female', 'membership_status': 'Inactive', 'mob': '43634394063' },
    { 'name': 'Aaron Johnson', 'age': '23', 'gender': 'Male', 'membership_status': 'Active', 'mob': '09503490539' },
    { 'name': 'Sam Johnson', 'age': '31', 'gender': 'Female', 'membership_status': 'Active', 'mob': '0905902595' },
    { 'name': 'George Davidson', 'age': '47', 'gender': 'Male', 'membership_status': 'Active', 'mob': '25032592' },
    { 'name': 'Gordon Davidson', 'age': '67', 'gender': 'Male', 'membership_status': 'Inactive', 'mob': '1312232134' },
    { 'name': 'Alice Connor', 'age': '22', 'gender': 'Female', 'membership_status': 'Active', 'mob': '1241049004' },
    { 'name': 'Ben Connor', 'age': '20', 'gender': 'Male','membership_status': 'Active', 'mob': '34290492034' },
    { 'name': 'Josh Trent', 'age': '30', 'gender': 'Male', 'membership_status': 'Active', 'mob': '32502590352' },
    { 'name': 'James Trent', 'age': '28', 'gender': 'Male', 'membership_status': 'Inactive', 'mob': '3042930429' },
    { 'name': 'Rebecca Matthews', 'age': '35', 'gender': 'Female', 'membership_status': 'Active', 'mob': '030929340' },
    { 'name': 'Adam Matthews', 'age': '34', 'gender': 'Male', 'membership_status': 'Active', 'mob': '340242903492' },
    { 'name': 'Kirsty Matthews', 'age': '31', 'gender': 'Female', 'membership_status': 'Active', 'mob': '324829348923' },
    { 'name': 'Caelan James', 'age': '18', 'gender': 'Male', 'membership_status': 'Active', 'mob': '12391023213' },
    { 'name': 'Catherine Ramsey', 'age': '24', 'gender': 'Female', 'membership_status': 'Inactive', 'mob': '349023492034' },
    { 'name': 'Kalie Ramsey', 'age': '23', 'gender': 'Female', 'membership_status': 'Inactive', 'mob': '94891814984' },
];

const metadata = [
    { value: 'name', label: 'Name' },
    { value: 'age', label: 'Age' },
    { value: 'gender', label: 'Gender' },
    { value: 'mob', label: 'Phone Number' },
    { value: 'membership_status', label: 'Membership' },
];

const metadataCustom = [
    { value: 'name', label: 'Name' },
    { value: 'age', label: 'Bio' },
    { value: 'mob', label: 'Phone Number' },
    { value: 'membership_status', label: 'Active?' },
];

const callMember = (row: Record<string, string>) => {
    alert('Calling ' + row.name + ' on ' + row.mob + '...');
};

const makeMember = (row: Record<string, string>) => {
    alert(row.name + "'s membership status was changed.");
};

</script>


<template>
    <div class="app">
        <p class="app_title">DataDeck Examples</p>

        <p class="app_subheading">This is a default table:</p>
        <DataDeckTable :header-metadata="metadata" :data="gymData" />

        <p class="app_subheading">These are default cards:</p>
        <DataDeckCards :header-metadata="metadata" :data="gymData" />

        <p class="app_subheading">This is a custom layout table:</p>
        <DataDeckTable :header-metadata="metadataCustom" :data="gymData" class="app_table">
            <template #default="{ row }">
                <td>
                    <p>{{ row.name.split(' ')[0] }}</p>
                    <p>{{ row.name.split(' ')[1] }}</p>
                </td>
                <td>{{ row.age }} {{ row.gender[0] }}</td> 
                <td>
                    <button @click="callMember(row)">Call {{ row.mob }}</button>
                </td> 
                <td>
                    <input type="checkbox" :checked="row.membership_status === 'Active'" @click="makeMember(row)" />
                </td> 
            </template>
        </DataDeckTable>

        <p class="app_subheading">These are custom layout cards:</p>
        <DataDeckCards :header-metadata="metadata" :data="gymData" class="app_deck">
            <template #default="{ card }">
                <div class="app_deck_card">
                    <p>{{ card.name.split(' ')[0] }}</p>
                    <p>{{ card.name.split(' ')[1] }}</p>
                    <p>{{ card.age }} {{ card.gender[0] }}</p> 
                    <button @click="callMember(card)">Call {{ card.mob }}</button>
                    <input type="checkbox" :checked="card.membership_status === 'Active'" @click="makeMember(card)" />
                </div> 
            </template>
        </DataDeckCards>
    </div>
</template>


<style scoped lang="scss">
.app {
    font-family: sans-serif;
    height: 100vh;
    width: 804px;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;

    &_title {
        font-size: 48px;
        padding: 8px 8px;
    }

    &_subheading {
        font-size: 32px;
        padding: 4px 8px;
        margin-top: 24px;
        margin-bottom: 12px;
    }

    &_table {
        & :deep(table) {
            border-collapse: separate;
            border-spacing: 0 6px;
            color: #011140;
            font-size: 16px;

            & th {
                background-color: #011140;
                border: 1px solid #011140;

                &:first-child {
                    border-top-left-radius: 6px;
                    border-bottom-left-radius: 6px;
                }

                &:last-child {
                    border-top-right-radius: 6px;
                    border-bottom-right-radius: 6px;
                }
            }

            & tbody > tr {
                @include transition-hover;

                &:hover td {
                    background-color: #eeeeee;
                }

                & td {
                    border-top: 1px solid #eeeeee;
                    border-bottom: 1px solid #eeeeee;
                    height: 48px;
                    background-color: #ffffff;

                    & button {
                        border-radius: 6px;
                        background-color: #1E6FD9;
                        color: #ffffff;
                        width: 160px;
                        padding: 8px;
                        @include transition-hover;

                        &:hover {
                            background-color: #389BF2;
                        }
                    }
                    
                    &:first-of-type {
                        display: flex;
                        align-items: center;
                        border-left: 1px solid #eeeeee;
                        background-color: #eeeeee; 
                        text-align: left; 
                        padding-left: 16px;
                        font-size: 20px;

                        & > p + p {
                            margin-left: 4px;
                            font-weight: bold;
                        } 
                    }

                    &:last-of-type {
                        border-right: 1px solid #eeeeee;
                    }
                }
            }
        }
    }

    &_deck {
        & button {
            border-radius: 6px;
            background-color: #1E6FD9;
            color: #ffffff;
            width: 160px;
            padding: 8px;
            @include transition-hover;

            &:hover {
                background-color: #389BF2;
            }
        }
    }
}
</style>