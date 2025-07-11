- [Configuration](#configuration)
  - [Data Mappings](#data-mappings)
  - [Event Handling and Selection Settings](#event-handling-and-selection-settings)
  - [Query Settings](#query-settings)
  - [Pagination Settings](#pagination-settings)


# Configuration
There are a number of configuration options that can be set. This should be combined with [layout customisation](../README.md#configuration) to achieve unique and tailor-fit implementions.

## Data Mappings
It is a common use case for data to be displayed, filtered or sorted differently to its raw form. These relationships can be defined in FieldMetadata.

``` typescript
interface FieldMetadata {
   value: string; // Required. The the actual data field, e.g. dob (as in, data.dob)
   label?: string; // Optional. The label to be used for this field, e.g. 'Date of Birth'
   sortMapping?: string; // Optional. A different field used to sort this one, e.g. we might want dob to invisibly use dob_timedate for sorting
   filterMapping?: string; // Optional. A different field used to filter this one, e.g. we might want forename to invisibly use full_name for filtering
   useInFilter?: boolean; // Optional. Whether this field (or its mapping) should be considered by the filter, default true
}
```

By default, only the value and label are required to display data. When displaying the data, DataDeck simply looks up the corresponding label for the provided value for use in a column header. 

`useInFilter` determines whether the value field corresponding to each record in this column is used against filter strings. `filterMapping` further allows a different field (as opposed to the value field) to be used in this filter. Finally, `sortMapping` allows a different field (as opposed to the value field) to be used to sort the column. Note that in both of the mapping cases, the field in question does not need to be a displayed field.

## Event Handling and Selection Settings
There are two ways to process DataDeck selections: setting event listeners and binding a `selection`. By default, DataDeck is in `fireAndForget` mode, i.e. selecting cards or table rows will fire the `selection` event, but will not record it.

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
      :field-metadata="gymMetadata" 
      :selection-settings="{ readOnly: false, fireAndForget: true, allowMultiple: false }"
      @selection="someEventHandler" 
   />
```

``` typescript
> selection `{ 'name': 'John Doe', 'age': '35', 'gender': 'Male', 'membership_status': 'Active', 'mob': '03490234920' }, []`
```

If `fireAndForget` is `false`, the `selection` event fires on click, maintaining the selected state of the chosen element. If another element is selected, the initial selection is removed. Additionally, if a selected row is clicked again, the `deselection` event fires instead. 

``` html 
   <DataDeckTable 
      :data="gymData"
      :field-metadata="metadata"  
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

If `fireAndForget` is `false` and `allowMultiple` is `true`, the `selection` and `deselection` events work the same as before. However, selecting additional elements does not cause the prior selections to be removed.

``` html 
   <DataDeckTable 
      :data="gymData"
      :field-metadata="metadata"  
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

Finally, binding a `selection` reactively also allows the current selection to be tracked (and optionally allows for a default selection to be set). For example:

``` typescript
   const selection = ref([] as Record<string, string>);
   watch(selection, newVal => console.log(newVal), { deep: true });
```

## Query Settings
Query Settings are optional properties that determine the filtering and sort applied by DataDeck.

``` typescript
interface QuerySettings {
   showHeader: boolean; // default true
   filterQuery: string; // default '' (bound reactively to the filter input in the header)
   sortColumn: string; // default '' (bound reactively to the sortColumn dropdown in the header)
   sortDirection: string; // default 'A-Z` (bound reactively to the sortDirection dropdown in the header)
}
```

By default, `showHeader` is `true`, meaning a basic header element with a filter field and sort dropdowns is placed above DataDeck. To override this functionality explicitly, `showHeader` should be set to `false` and the other interface values should be overridden with desired values. Note that if reactive values are supplied using vue `ref`s, DataDeck will respond to changes on the fly.

## Pagination Settings
Pagination Settings are optional properties that are used by DataDeck to configure the paginator.

``` typescript
interface DataPaginator {
   pagination: `none` | 'client' | 'server'; // default 'client' - note: server is not yet fully tested
   showFooter: boolean; // default true
   itemsPerPage: number; // default 12 for DataDeckCards, 20 for DataDeckTable
   currentPageNo: number; // default 1 (reactively bound to the selection in the footer)
   lastPageNo?: number; // default computed on the client at runtime (explicitly set if server-managed only)
}
```

By default, `pagination` is managed `client`-side. Pagination can be disabled entirely by setting `pagination` to `none`. This essentially causes all data provided to DataDeck to be shown in one page. Provided pagination is enabled in some capacity, DataDeck provides a basic pagination footer element if `showFooter` is `true`. Additionally, `itemsPerPage` and `currentPageNo` can be adjusted as desired.

If `pagination` is set to `server`, DataDeck will expect these fields to be updated through API calls and therefore no longer update them internally. 