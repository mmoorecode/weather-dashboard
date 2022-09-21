import React from "react";
import DataTable from 'react-data-table-component';

const LocationDataTable = ({data}) => {
  const columns = [
    {
      name: 'City',
      selector: 'city',
      sortable: true,
    },
    {
      name: 'State',
      selector: 'state',
      sortable: true,
    },
    {
      name: 'Latitude',
      selector: 'latitude',
      sortable: true,
    },
    {
      name: 'Longitude',
      selector: 'longitude',
      sortable: true,
    }
  ];
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        selectableRows
      />
    </div>
  )
}

export default LocationDataTable;