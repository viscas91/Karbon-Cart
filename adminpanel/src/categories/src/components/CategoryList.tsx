import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Paper, TextField, Typography, debounce } from '@mui/material';
import { useCategorySearchQuery, useDeleteCategoryMutation, useGetAllCategoriesQuery } from '../features/categorySlice';
import React, { useEffect } from 'react';
    
interface DataGridOnChangeProps {
    page: number,
    pageSize: number
}

const CategoryList: React.FC = () => {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [categories, setCategories] = React.useState([]);
    const [catCount, setCatCount] = React.useState<number>(0);
    const [searchText, setSearchText] = React.useState('');
    const [searchCtx, setSearchCtx] = React.useState([]);
    const [searchCount, setSearchCount] = React.useState<number>(0);

    const { data, isLoading } = useGetAllCategoriesQuery({ page, pageSize });
    const { data: searchData, isLoading: isSearchLoading } = useCategorySearchQuery({ page, pageSize, searchTerm: searchText });
    const [deleteCategory, { isError }] = useDeleteCategoryMutation();
    
    useEffect(() => {
      if(!isLoading && data){
        setCategories(data?.categories);
        setCatCount(data?.count);
      }
    }, [isLoading, data]);

    const handleDelete = async (categoryId: number) => {
        const response = await deleteCategory(categoryId);

        if(isError){
          console.log('Error', response)
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value.toLowerCase();
      setSearchText(searchValue);
      
      if(!isSearchLoading && searchData){
        setSearchCtx(searchData?.categories);
        setSearchCount(searchData?.count);
      }      
    }
    
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

    const handleSearchOpt = debounce(handleSearch, 250);

    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { 
        field: 'icon', 
        headerName: 'Icon', 
        width: 130,
        renderCell: (params) => (
          <Box component='img' sx={{ width: '100%', height: 'auto', objectFit: 'contain' }} src={`/media/${params.value}`} alt={`${params.row.title}`} />
        ), 
      },
      { 
        field: 'title', 
        headerName: 'Title', 
        flex: 1,
        renderCell: (params) => (
          <Link to={`/admin/categories/${params.row.id}/edit`}>
            {params.value}
          </Link>
        ), 
      },
      { 
        field: 'delete',
        headerName: 'Delete',
        width: 120,
        renderCell: (params) => (
          <Button 
            variant="outlined" 
            style={{ backgroundColor: '#f44336', color: '#FFFFFF' }} 
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        ),
      },
    ];

  return (
    <>
    <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Categories</Typography>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <TextField 
        type='text'
        placeholder='Search'
        value={searchText}
        onChange={handleSearchOpt}
      />
      
      <Button
        component={Link}
        to='/admin/categories/create'
        variant="outlined" 
        style={{ color: '#FFFFFF', backgroundColor: '#03a54f', fontSize: '1.7rem' }}
      >+</Button>
    </Box>
    
    <Paper>
        <Box mb={2}>
        <DataGrid
            loading={isLoading}
            rows={searchText.trim() !== '' ? searchCtx : categories}
            columns={columns}
            pagination
            rowCount={searchText.trim() !== '' ? searchCount : catCount }
            paginationMode='server'
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: pageSize },
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

export default CategoryList;
