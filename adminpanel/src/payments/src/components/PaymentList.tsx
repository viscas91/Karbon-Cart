import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Typography } from '@mui/material';
import { useGetAllPaymentsQuery } from '../features/paymentApiSlice';
import { Link } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'icon', headerName: 'Icon', width: 130 },
  { 
    field: 'title', 
    headerName: 'Title',
    renderCell: (params) => (
      <Link to={`/admin/payments/${params.row.id}/edit`}>
        {params.value}
      </Link>
    ),
  },
];
    
interface DataGridOnChangeProps {
    page: number,
    pageSize: number
}

const PaymentList: React.FC = () => {
    const [page, setPage] = React.useState(0);

    const { data, isLoading } = useGetAllPaymentsQuery(page);
    
    const rows = data?.orders || []
    
    const handleChange = (e: DataGridOnChangeProps) => {
        setPage(e.page);
    }

  return (
    <>
    <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Payments</Typography>
    
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
              No Payments to show.
            </Typography>
          )}
        </Box>
    </Paper>
    </>
  );
}

export default PaymentList;