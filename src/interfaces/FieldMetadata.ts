interface FieldMetadata {
    value: string; // Required. The the actual data field, e.g. dob (as in, data.dob)
    label?: string; // Optional. The label to be used for this field, e.g. 'Date of Birth'
    sortMapping?: string; // Optional. A different field used to sort this one, e.g. we might want dob to invisibly use dob_timedate for sorting
    filterMapping?: string; // Optional. A different field used to filter this one, e.g. we might want forename to invisibly use full_name for filtering
    useInFilter?: boolean; // Optional. Whether this field (or its mapping) should be considered by the filter, default true
}

export type { FieldMetadata as default };