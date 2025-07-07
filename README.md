- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
    - [Event Handling and Selection Settings](#event-handling-and-selection-settings)
    - [Query Settings](#query-settings)
    - [Pagination Settings](#pagination-settings)
  - [Layout Customisation](#layout-customisation)
- [Examples](#examples)

# About
A set of extensible and data-driven components for Vue, designed to display data in both table and card formats. DataDeck makes extensive use of Vue 3 composition in order to provide DataDeckTable and DataDeckCards; two functionally identical, yet visually distinct components. It has out of the box support for sorting, filtering, pagination, custom layouts via slots and more.

# Installation
Simply add data-deck to your project via your chosen package manager:
- NPM: run `npm install data-deck`
- Yarn: run `yarn add data-deck`

# Usage
The two primary components exported by this package are: DataDeckTable for tables and DataDeckCards for card galleries. Both use the same props and basic setup.

1) Import DataDeckTable or DataDeckCards (or both) at the top of your vue file: `import { DataDeckTable, DataDeckCards } from 'data-deck';`
2) Format data into an array of object literals, e.g. 
``` typescript
   const gymData = [
      { 'name': 'John Doe', 'age': '35', 'gender': 'Male', 'membership_status': 'Active', 'mob': '03490234920' },
      { 'name': 'Jane Doe', 'age': '18', 'gender': 'Female', 'membership_status': 'Active', 'mob': '2425325425' },
      { 'name': 'John Smith', 'age': '19', 'gender': 'Male', 'membership_status': 'Inactive', 'mob': '1341414553' }
   ];
```
3) Set up metadata for how the data should be read, e.g.
``` typescript 
   const gymMetadata = [
      { value: 'name', label: 'Name' },
      { value: 'age', label: 'Age' },
      { value: 'gender', label: 'Gender' },
      { value: 'mob', label: 'Phone Number' },
      { value: 'membership_status', label: 'Membership' }
   ];
```
4) Provide the data and metadata to the component, e.g.
``` html 
   <DataDeckTable :data="gymData" :header-metadata="gymMetadata" />
   <DataDeckCards :data="gymData" :header-metadata="gymMetadata"  />
```

This will render DataDeck components with default settings and styling.

## Configuration

### Event Handling and Selection Settings
There are two ways to process DataDeck selections: v-model and event listeners. By default, DataDeck is in `fireAndForget` mode, i.e. selecting cards or table rows will fire the `selection` event, but will not otherwise record the selection.


Selection Settings are optional properties that determine how click events are processed and stored by DataDeck.

``` typescript
interface SelectionSettings {
    readOnly: boolean; // default false
    fireAndForget: boolean; // default true
    allowMultiple: boolean; // default false
}
```

If `readOnly` is true, DataDeck blocks all clicks and no events will be fired or recorded.

If `fireAndForget` is `true`, the `selection` event provides the selected card or row on click, e.g.

``` html 
   <DataDeckTable 
      :data="gymData"
      :header-metadata="gymMetadata" 
      :selection-settings="{ readOnly: false, fireAndForget: true, allowMultiple: false }"
      @selection="someEventHandler" 
   />
```

``` typescript
> selection `{ 'name': 'John Doe', 'age': '35', 'gender': 'Male', 'membership_status': 'Active', 'mob': '03490234920' }, []`
```

If `fireAndForget` is `false`, the `selection` event fires on click, maintaining the selected state of the chosen element. If another element is selected, the initial selection is removed. Additionally, if a selected row is clicked again, the `deselection` event fires instead. Assigning a `v-model` also allows the current selection to be tracked reactively.

``` html 
   <DataDeckTable 
      v-model="selection"
      :data="gymData"
      :header-metadata="metadata"  
      :selection-settings="{ readOnly: false, fireAndForget: false, allowMultiple: false }"
      @selection="someEventHandler" 
      @deselection="someOtherEventHandler" 
   />
```

``` typescript
> selection `{ 'name': 'Jane Doe', 'age': '18', 'gender': 'Female', 'membership_status': 'Active', 'mob': '2425325425' }, [{ 'name': 'Jane Doe', 'age': '18', 'gender': 'Female', 'membership_status': 'Active', 'mob': '2425325425' }]`
> selection `{ 'name': 'John Doe', 'age': '35', 'gender': 'Male', 'membership_status': 'Active', 'mob': '03490234920' }, [{ 'name': 'John Doe', 'age': '35', 'gender': 'Male', 'membership_status': 'Active', 'mob': '03490234920' }]`
> deselection `{ 'name': 'John Doe', 'age': '35', 'gender': 'Male', 'membership_status': 'Active', 'mob': '03490234920' }, []`
```

If `fireAndForget` is `false` and `allowMultiple` is `true`, the `selection` and `deselection` events work the same as before, as does `v-model` handling. However, selecting additional elements does not cause the prior selections to be removed.

``` html 
   <DataDeckTable 
      v-model="selection"
      :data="gymData"
      :header-metadata="metadata"  
      :selection-settings="{ readOnly: false, fireAndForget: false, allowMultiple: true }"
      @selection="someEventHandler" 
      @deselection="someOtherEventHandler" 
   />
```

``` typescript
> selection `{ 'name': 'Jane Doe', 'age': '18', 'gender': 'Female', 'membership_status': 'Active', 'mob': '2425325425' }, [{ 'name': 'Jane Doe', 'age': '18', 'gender': 'Female', 'membership_status': 'Active', 'mob': '2425325425' }]`
> selection `{ 'name': 'John Doe', 'age': '35', 'gender': 'Male', 'membership_status': 'Active', 'mob': '03490234920' }, [{ 'name': 'Jane Doe', 'age': '18', 'gender': 'Female', 'membership_status': 'Active', 'mob': '2425325425' }, { 'name': 'John Doe', 'age': '35', 'gender': 'Male', 'membership_status': 'Active', 'mob': '03490234920' }]`
> deselection `{ 'name': 'John Doe', 'age': '35', 'gender': 'Male', 'membership_status': 'Active', 'mob': '03490234920' }, [{ 'name': 'Jane Doe', 'age': '18', 'gender': 'Female', 'membership_status': 'Active', 'mob': '2425325425' }]`
```

### Query Settings

### Pagination Settings





## Layout Customisation

# Examples
See [docs/examples.md](docs/examples.md).
