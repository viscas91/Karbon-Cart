import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Typography } from '@mui/material';
import { useGetAllBrandsQuery } from '../features/brandSlice';
import { Link } from 'react-router-dom';
// import { useLocation, useNavigate } from 'react-router-dom';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'icon', headerName: 'Icon', width: 130 },
  { 
    field: 'title', 
    headerName: 'Title',
    renderCell: (params) => (
        <Link to={`/admin/brands/${params.row.id}/edit`}>
          {params.value}
        </Link>
      ),
    },
];
    
interface DataGridOnChangeProps {
    page: number,
    pageSize: number
}

const BrandList: React.FC = () => {
    const [page, setPage] = React.useState(0);

    const { data, isLoading } = useGetAllBrandsQuery(page);
    
    const rows = data?.brands || []
    
    const handleChange = (e: DataGridOnChangeProps) => {
        setPage(e.page);
    }

  return (
    <>
    <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ mb: 2 }}>Brands</Typography>
    
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