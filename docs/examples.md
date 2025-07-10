- [Design Customisation](#design-customisation)
  - [Cards Example](#cards-example)
  - [Table Example](#table-example)
    - [Row Override](#row-override)
    - [Table Override](#table-override)
  - [Header and Footer Replacement](#header-and-footer-replacement)

# Design Customisation
The DataDeck visual design is customised via CSS. This should be combined with proper [configuration](../README.md#configuration) to achieve unique and tailor-fit implementions.

Overriding the default styles is slightly different for the table and cards variants, but the underlying principle is the same.

## Cards Example
DataDeckCards requires only one override: the card itself. 

Simply assign a class to the DataDeckCards component, then insert a template definition for how the content should be laid out. You may choose to include as many (or few) fields from the data as desired; any HTML elements, CSS, conditional styles or vue attributes should work as normal. 

In this example, a header is formed from the forename and surname. The bottom half of the card is then designated as the body. A button is inserted at the bottom, which is provided click events using vue's @click handling.

``` html
<DataDeckCards :data="gymData" :field-metadata="gymMetadata" class="deck">
    <template #default="{ card }">
        <div class="deck_card">
            <div class="deck_card_header">
                <p>{{ card.name.split(' ')[0] }}</p>
                <p>{{ card.name.split(' ')[1] }}</p>
            </div>
            <div class="deck_card_body">
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
```

``` scss 
.deck {
    color: #071040;

    &_card {
        width: 320px;
        padding: 16px;
        border: 1px solid #cccccc;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease-out;

        &:hover, &:focus-visible {
            background-color: #4BB2F2;
            color: white;
            outline: 0;
        }
        
        &_header {
            display: flex;
            padding-bottom: 8px;
            border-bottom: 1px solid #cccccc;
            margin-bottom: 24px;
            font-size: 24px;

            & > p + p {
                font-weight: bold;
                margin-left: 4px;
            } 
        }

        &_body {
            & > div {
                display: flex;
                justify-content: space-between;
                margin: 8px 0;

                & > p:first-of-type {
                    font-weight: bold;
                }
            }

            & > button {
                width: 100%;
                padding: 8px;
                margin-top: 16px;
                border-radius: 6px;
                background-color: #1B52BF;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease-out;

                &:hover {
                    background-color: #44A1F2;
                }
            }
        }
    }
}
```

## Table Example
DataDeckTable is a little more complicated in that it requires two overrides: the table iteself and the rows. 

### Row Override
Styling the rows works the same as styling cards for DataDeckCards ([Cards Example](#cards-example))- Assign a class to the DataDeckTable component, provide a row template definition and then target each element in CSS. 

Column data can be combined as in the example below. However, while cards are relatively freeform, the row layout in tables should match the number of columns unless you are hiding the header row to avoid layout issues.

In this example, the table rows are spaced apart and the first field is bolded. Buttons and checkboxes are used to illustrate interactivity.

``` html
<DataDeckTable :data="gymData" :field-metadata="gymMetadata" class="table">
    <template #default="{ row }">
        <tr class="table_row">
            <td class="table_row_cell">
                <p>{{ row.name.split(' ')[0] }}</p>
                <p>{{ row.name.split(' ')[1] }}</p>
            </td>
            <td class="table_row_cell">{{ row.age }} {{ row.gender[0] }}</td> 
            <td class="table_row_cell">
                <button @click="callMember(row)">Call {{ row.mob }}</button>
            </td> 
            <td class="table_row_cell">
                <input type="checkbox" :checked="row.membership_status === 'Active'" @click="makeMember(row)" />
            </td> 
        </tr>
    </template>
</DataDeckTable>
```

``` scss
&_table {
    color: #071040;

    # ...table css here...
    
    &_row {
        &:hover td, &:focus-visible td, &.selected td {
            background-color: #44A1F2;
            color: white;
        }

        &_cell {
            height: 60px;
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            text-align: center; 
            vertical-align: middle;
            background-color: white;
            transition: all 0.3s ease-out;
            
            &:first-of-type {
                display: flex;
                align-items: center;
                padding-left: 16px;
                border-left: 1px solid #cccccc;
                font-size: 20px;
                text-align: left; 
                background-color: #eeeeee; 

                & > p + p {
                    font-weight: bold;
                    margin-left: 4px;
                } 
            }

            &:last-of-type {
                border-right: 1px solid #cccccc;
            }

            & > button {
                width: 160px;
                padding: 8px;
                border-radius: 6px;
                background-color: #1B52BF;
                color: white;
                transition: all 0.3s ease-out;

                &:hover {
                    background-color: #44A1F2;
                }
            }
        }
    }
}
```

### Table Override
Overriding the table can be achieved through pure CSS using the `:deep` selector. No HTML overriding is necessary.

.table {
    color: #071040;

    & :deep(table) {
        border-collapse: separate;
        border-spacing: 0 8px;

        & th {
            height: 40px;
            padding: 8px;
            vertical-align: middle;
            background-color: #071040;
            border: 1px solid #071040;
            color: white;
        }
    }

    # ...row css here...
}



## Header and Footer Replacement
Both the filter / sort header and the pagination footer are external to the main DataDeck components. This means replacing them is just a case of disabling them and hooking up the refs from a custom element in the QuerySettings ([see here](../README.md#query-settings)) and PaginationSettings ([see here](../README.md#pagination-settings)) respectively.