import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Typography } from '@mui/material';
import { useGetAllBrandsQuery } from '../features/brandSlice';
// import { useLocation, useNavigate } from 'react-router-dom';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'icon', headerName: 'Icon', width: 130 },
  { field: 'title', headerName: 'Title' },
];
    
interface DataGridOnChangeProps {
    page: number,
    pageSize: number
}

const BrandList: React.FC = () => {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const goback = () => navigate(-1);
    const [page, setPage] = React.useState(0);

    // const from = location.state?.from?.pathname || "/categories";

    const { data, isLoading } = useGetAllBrandsQuery(page);
    
    const rows = data?.brands || []
    
    const handleChange = (e: DataGridOnChangeProps) => {
        setPage(e.page);
    }

  return (
    <>
    <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Brands</Typography>
    
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

export default BrandList;