import { useNavigate, useParams } from "react-router-dom";
import { useGetAllCategoriesQuery, useGetSingleSubCategoryQuery, useUpdateSubCategoryMutation } from "../features/categorySlice";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { CategoryType } from "../../../../../backend/src/utils/types/category.types";

const SubCategoryEdit: React.FC = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    const { id } = useParams();
    // const goback = () => navigate(-1);

    const [title, setTitle] = useState<string>('');
    const [icon, setIcon] = useState<string>('');
    const [categoryId, setCategoryId] = useState<number>();

    // const from = location.state?.from?.pathname || "/subcategories";

    const [categories, setCategories] = useState<CategoryType[]>([]);

    const { data: categoriesData, isLoading: isCatLoading } = useGetAllCategoriesQuery();

    const { data, isLoading: isSubCatLoading = false } = useGetSingleSubCategoryQuery(id);
    
    const [updateSubCategory, { isSuccess: isUpdateSuccess, isLoading: isUpdateLoading, data: updateData }] = useUpdateSubCategoryMutation();

    useEffect(() => {
        isCatLoading ? [] : setCategories(categoriesData?.categories);
    }, [categoriesData]);
    

    useEffect(() => {
        if(!isSubCatLoading && data && data.subCategory){
            let category = data?.subCategory;
            setTitle(category.title);
            setCategoryId(category.categoryId);
            setIcon(category.icon);
        }
    }, [data, isSubCatLoading])
    console.log('Initial Values:', { title, categoryId, icon });

    useEffect(() => {
        if(isUpdateSuccess){
            navigate('/admin/subcategories');
        }
    }, [isUpdateSuccess, navigate, updateData]);

    return (
        <>
            {categoryId && (
            <Formik
                initialValues={{
                    title: title,
                    icon: icon,
                    categoryId: categoryId
                }}

                validationSchema={
                    Yup.object().shape({
                        title: Yup.string().required(),
                        categoryId: Yup.number().positive().required(),
                        icon: Yup.mixed()
                            .test('fileSize', 'File size is too large', (value) => {
                                // Check if value exists and it's a File object
                                if (value && value instanceof File) {
                                    return value.size <= 1024 * 1024; // 1MB
                                }
                                return true; // Accept if the value is not present or not a File
                            })
                            .test('fileType', 'Unsupported file type', (value) => {
                                // Check if value exists and it's a File object
                                if (value && value instanceof File) {
                                    return ['image/png', 'image/jpeg'].includes(value.type);
                                }
                                return true; // Accept if the value is not present or not a File
                            }),
                    })
                }

                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    console.log(values);
                    try {
                        await updateSubCategory({ id: data.subCategory.id, ...values }).unwrap();                          
                        setStatus({ success: true });
                        setSubmitting(false);
                    } catch (err: any) {
                        // const message = err.data.message;
                        // toast.error(message);
                        setStatus({ success: false });
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    touched,
                    values,
                }) => (
                    <Box component='section'>
                        <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Edit Sub Category</Typography>

                        <Paper sx={{ padding: 4 }}>
                            <Box component='form' noValidate autoComplete="off" onSubmit={handleSubmit}>
                                {isSubCatLoading || isUpdateLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <Box component='div'>
                                                <TextField
                                                    required 
                                                    id='title'
                                                    type='text'
                                                    name="title"
                                                    label='title'
                                                    value={values.title}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    error={Boolean(
                                                        touched.title &&
                                                        errors.title
                                                    )}
                                                />
                                                {touched.title &&
                                                errors.title && (
                                                    <FormHelperText
                                                        error
                                                        id="helper-text-title"
                                                    >
                                                        {errors.title}
                                                    </FormHelperText>
                                                )}
                                                </Box>

                                                <Box>
                                                <FormControl>
                                                            <InputLabel htmlFor='categoryID'>Category</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                required
                                                                error={Boolean(
                                                                    touched.categoryId &&
                                                                    errors.categoryId
                                                                )}
                                                                id="categoryID"
                                                                type="text"
                                                                value={values.categoryId}
                                                                name="categoryId"
                                                                onBlur={handleBlur}
                                                                onChange={
                                                                    (e) => {
                                                                        const id = Number(e.target.value)
                                                                        setCategoryId(id)
                                                                        handleChange(e)
                                                                    }
                                                                }
                                                                label="Category"
                                                            >
                                                                {categories ? categories.map((category)=> {
                                                                    return <MenuItem value={category.id}>{category.title}</MenuItem>
                                                                }): ''}
                                                            </Select>
                                                        </FormControl>
                                                        {touched.categoryId &&
                                                            errors.categoryId && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-categoryID"
                                                                >
                                                                    {errors.categoryId}
                                                                </FormHelperText>
                                                            )}
                                                </Box>

                                                <Box sx={{ my: 1 }}>
                                                    <TextField
                                                        required 
                                                        id='icon'
                                                        type='file'
                                                        name="icon"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.icon &&
                                                            errors.icon
                                                        )}
                                                    />
                                                    {touched.icon &&
                                                    errors.icon && (
                                                        <FormHelperText
                                                            error
                                                            id="helper-text-icon"
                                                        >
                                                            {errors.icon}
                                                        </FormHelperText>
                                                    )}
                                                </Box>

                                            <Button variant="contained" type="submit">{ id ? 'Update' : 'Submit' }</Button>
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>
                        </Paper>
                    </Box>
                )}
            </Formik>
            )}
        </>
    )
}

export default SubCategoryEdit;