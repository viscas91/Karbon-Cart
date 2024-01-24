import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'url', headerName: 'URL', width: 130 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 90,
  },    
];

const rows = [
  { id: 1, title: 'Snow', url: 'Jon', price: 35 },
  { id: 2, title: 'Lannister', url: 'Cersei', price: 42 },
  { id: 3, title: 'Lannister', url: 'Jaime', price: 45 },
  { id: 4, title: 'Stark', url: 'Arya', price: 16 },
  { id: 5, title: 'Targaryen', url: 'Daenerys', price: null },
  { id: 6, title: 'Melisandre', url: null, price: 150 },
  { id: 7, title: 'Clifford', url: 'Ferrara', price: 44 },
  { id: 8, title: 'Frances', url: 'Rossini', price: 36 },
  { id: 9, title: 'Roxie', url: 'Harvey', price: 65 },
];

export const VendorList: React.FC = () => {
  return (
    <>
    <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Vendors</Typography>
    
    <Paper>
        <Box mb={2}>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 50 },
            },
            }}
            pageSizeOptions={[10, 50]}
            checkboxSelection
        />
        </Box>
    </Paper>
    </>
  );
}   