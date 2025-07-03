export default interface HeaderMetadata {
    value: string; // Required. The field containing the data for this column, e.g. dob (as in, data.dob)
    label: string; // Required. The header label to be used for this column, e.g. 'Date of Birth'
    sortBy?: string; // Optional. The field used to sort this column, e.g. dob_timedate
    filterBy?: boolean; // Optional. Whether this field be considered by the filter, default true
};