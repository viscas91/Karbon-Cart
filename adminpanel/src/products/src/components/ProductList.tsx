import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useGetAllProductsQuery } from '../features/productSlice';
import { Link } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'pkid', headerName: 'ID', width: 70 },
  { field: 'thumb', 
    headerName: 'thumb', 
    width: 130,
    renderCell: (params) => (
        <img
          src={`/media/${params.value}`}
          alt={`Thumbnail ${params.row.id}`}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
},
  { 
    field: 'title', 
    headerName: 'Title', 
    renderCell: (params) => (
    <Link to={`/admin/products/${params.row.id}/edit`}>
      {params.value}
    </Link>
  ), 
},
];

interface DataGridOnChangeProps {
    page: number,
    pageSize: number
}

const ProductList: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(10);

    const { data, isLoading } = useGetAllProductsQuery(page);
    
    const rows = data?.products.rows || []
    
    const handleChange = (e: DataGridOnChangeProps) => {
      const pageSize = e.pageSize;
      setPage(e.page + 1);
      setPageSize((prevPageSize) => {
        if (pageSize !== prevPageSize && !isNaN(pageSize)) {
          return pageSize; // Set the new size if it's different and valid
        } else {
            return prevPageSize; // Keep the previous size if it's the same or invalid
        }
      });
  }

  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Products</Typography>

        <Button
            component={Link}
            to='/admin/products/create'
            variant="contained"
            size="small"
            sx={{
                fontSize: "10px",
                ml: "10px",
            }}
        >
            Create
        </Button>
    </Box>
    
    
    <Paper>
        <Box mb={2}>
        <DataGrid
            loading={isLoading}
            rows={rows}
            columns={columns}
            pagination
            rowCount={data?.count}
            paginationMode='server'
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize },
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

export default ProductList;