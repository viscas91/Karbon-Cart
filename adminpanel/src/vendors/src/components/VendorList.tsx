import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Typography } from '@mui/material';
import { useGetAllVendorsQuery } from '../features/vendorSlice';
import { Link } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { 
      field: 'title', 
      headerName: 'Title', 
      renderCell: (params) => (
      <Link to={`/admin/vendors/${params.row.id}/edit`}>
        {params.value}
      </Link>
    ), 
  },
  { field: 'url', headerName: 'URL', width: 130 },    
];

interface DataGridOnChangeProps {
  page: number,
  pageSize: number
}

const VendorList: React.FC = () => {
  const [page, setPage] = React.useState(0);

  const { data, isLoading } = useGetAllVendorsQuery();

  const rows = data?.vendors || []

  const handleChange = (e: DataGridOnChangeProps) => {
    setPage(e.page);
}

  return (
    <>
    <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Vendors</Typography>
    
    <Paper>
        <Box mb={2}>
        {rows.length > 0 ? (
            <DataGrid
              loading={isLoading}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: page, pageSize: 10 },
                },
              }}
              onPaginationModelChange={handleChange}
              pageSizeOptions={[10, 20]}
              checkboxSelection
            />
          ) : (
            <Typography variant="body1" sx={{ p: 2 }}>
              No Vendors
            </Typography>
          )}
        </Box>
    </Paper>
    </>
  );
}

export default VendorList;