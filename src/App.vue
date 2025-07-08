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

const paginatorCustomTable = { pagination: 'client', showFooter: true, itemsPerPage: 12, currentPageNo: 1 }; 
const paginatorCustomCards = { pagination: 'client', showFooter: true, itemsPerPage: 9, currentPageNo: 1 }; 

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
        <DataDeckTable :header-metadata="metadataCustom" :data="gymData" :paginator="paginatorCustomTable" class="app_table">
            <template #default="{ row }">
                <td class="app_table_row name">
                    <p>{{ row.name.split(' ')[0] }}</p>
                    <p>{{ row.name.split(' ')[1] }}</p>
                </td>
                <td class="app_table_row">{{ row.age }} {{ row.gender[0] }}</td> 
                <td class="app_table_row">
                    <button @click="callMember(row)">Call {{ row.mob }}</button>
                </td> 
                <td class="app_table_row">
                    <input type="checkbox" :checked="row.membership_status === 'Active'" @click="makeMember(row)" />
                </td> 
            </template>
        </DataDeckTable>

        <p class="app_subheading">These are custom layout cards:</p>
        <DataDeckCards :header-metadata="metadata" :data="gymData" :paginator="paginatorCustomCards" class="app_deck">
            <template #default="{ card }">
                <div class="app_deck_card">
                    <div class="app_deck_card_header">
                        <p>{{ card.name.split(' ')[0] }}</p>
                        <p>{{ card.name.split(' ')[1] }}</p>
                    </div>
                    <div class="app_deck_card_body">
                        <div>
                            <p>Bio</p>
                            <p>{{ card.age }} {{ card.gender[0] }}</p>
                        </div>
                        <div>
                            <p>Contact</p>
                            <p>{{ card.mob }}</p>
                        </div>
                        <div> 
                            <p>Membership</p>
                            <input type="checkbox" :checked="card.membership_status === 'Active'" @click="makeMember(card)" />
                        </div>
                        <button @click="callMember(card)">Contact</button>  
                    </div>
                </div> 
            </template>
        </DataDeckCards>
    </div>
</template>


<style scoped lang="scss">
.app {
    font-family: sans-serif;
    height: 100vh;
    max-width: 1168px;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;

    &_title {
        font-size: 48px;
        padding: $spacing-2 $spacing-2;
    }

    &_subheading {
        font-size: 32px;
        padding: $spacing-1 $spacing-2;
        margin-top: $spacing-4;
        margin-bottom: $spacing-3;
    }

    &_table {
        color: $blues-1;
        width: 800px;
        margin-left: auto;
        margin-right: auto;

        & :deep(table) {
            border-collapse: separate;
            border-spacing: 0 $spacing-2;

            & th {
                height: 60px;
                padding: $spacing-2;
                background-color: $blues-1;
                border: 1px solid $blues-1;
                color: white;
            }

            & tbody > tr {
                & td {
                    @include transition-hover;
                }

                &:hover td {
                    background-color: $greyscale-4;
                }
            }
            
        }

        &_row {
            border-top: 1px solid $greyscale-3;
            border-bottom: 1px solid $greyscale-3;
            height: 48px;
            background-color: white;
            text-align: center; 

            & > button {
                border-radius: $rounded;
                background-color: $blues-2;
                color: white;
                width: 160px;
                padding: $spacing-2;
                @include transition-hover;

                &:hover {
                    background-color: $blues-3;
                }
            }
            
            &:first-of-type {
                display: flex;
                align-items: center;
                border-left: 1px solid $greyscale-3;
                background-color: $greyscale-4; 
                text-align: left; 
                padding-left: $spacing-3;
                font-size: 20px;

                & > p + p {
                    margin-left: $spacing-1;
                    font-weight: bold;
                } 
            }

            &:last-of-type {
                border-right: 1px solid $greyscale-3;
            }
        }
    }

    &_deck {
        color: $blues-1;
        width: 992px;
        margin-left: auto;
        margin-right: auto;

        &_card {
            width: 320px;
            overflow: hidden;
            padding: $spacing-3;
            border: 1px solid $greyscale-3;
            border-radius: $rounded;
            @include transition-hover;
            transition: all 0.3s $smooth-ease-out;

            &:hover, &:focus-visible {
                background-color: $blues-4;
                color: white;
                outline: 0;
            }
            
            &_header {
                font-size: 24px;
                display: flex;
                padding-bottom: $spacing-2;
                border-bottom: 1px solid $greyscale-3;
                margin-bottom: $spacing-4;

                & > p + p {
                    margin-left: $spacing-1;
                    font-weight: bold;
                } 
            }

            &_body {
                & > div {
                    display: flex;
                    justify-content: space-between;
                    margin: $spacing-2 0;

                    & > p:first-of-type {
                        font-weight: bold;
                    }
                }

                & > button {
                    border-radius: $rounded;
                    background-color: $blues-2;
                    color: white;
                    width: 100%;
                    padding: $spacing-2;
                    margin-top: $spacing-3;
                    @include transition-hover;

                    &:hover {
                        background-color: $blues-3;
                    }
                }
            }
        }
    }
}
</style>