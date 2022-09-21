import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';

const LocationDataTable = ({ data, selectedCity, setSelectedCity }) => {
  
  
  const columns = useMemo(() => [
    {
      header: 'City',
      accessorKey: 'city',
    },
    {
      header: 'State',
      accessorKey: 'state',
    },
    {
      header: 'Latitude',
      accessorKey: 'latitude',
    },
    {
      header: 'Longitude',
      accessorKey: 'longitude',
    }
  ], []);


  const handleCitySelectionChange = (currentSelect, allSelected) => {
    const result = allSelected.map(item => { return data.at(item.index) });
    const selectedIds = result.map(item => {
         return item.id;
    }); 
    console.log(selectedIds); 
  }

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableMultiRowSelection={false} //use radio buttons instead of checkboxes
      enableRowSelection
      options={{selection: true}}
      getRowId={(row) => row.userId} //give each row a more useful id
      //onRowSelectionChange={handleCitySelectionChange} //TODO: figure out why this does not work
    />
  );
}

export default LocationDataTable;