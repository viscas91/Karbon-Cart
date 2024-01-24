import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Typography } from '@mui/material';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from '../features/productSlice';

const columns: GridColDef[] = [
  { field: 'pkid', headerName: 'ID', width: 70 },
  { field: 'icon', headerName: 'Icon', width: 130 },
  { field: 'title', headerName: 'Title' },
];

interface DataGridOnChangeProps {
    page: number,
    pageSize: number
}

export const ProductList: React.FC = () => {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const goback = () => navigate(-1);
    const [page, setPage] = React.useState(0);

    // const from = location.state?.from?.pathname || "/products";

    const { data, isLoading } = useGetAllProductsQuery(page);
    
    const rows = data?.products.rows || []
    
    const handleChange = (e: DataGridOnChangeProps) => {
        setPage(e.page);
    }

  return (
    <>
    <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Products</Typography>
    
    <Paper>
        <Box mb={2}>
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
        </Box>
    </Paper>
    </>
  );
}   