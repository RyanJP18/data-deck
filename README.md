- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
  - [Configurations](#configurations)
  - [Design Customisation and Examples](#design-customisation-and-examples)

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
   <DataDeckTable :data="gymData" :field-metadata="gymMetadata" />
   <DataDeckCards :data="gymData" :field-metadata="gymMetadata"  />
```

This will render DataDeck components with default settings and styling.

## Configurations
DataDeck provides various configuration options. See [docs/configuration.md](docs/configuration.md) for instructions.

## Design Customisation and Examples
It is recommended that the basic default styles are overridden. See [docs/layout-examples.md](docs/layout-examples.md) for a guide on how to do this.
