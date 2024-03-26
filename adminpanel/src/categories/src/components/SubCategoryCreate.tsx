import { useLocation, useNavigate } from "react-router-dom";
import { useCategoryImageMutation, useCreateSubCategoryMutation, useGetAllCategoriesQuery } from "../features/categorySlice";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { CategoryType } from "../../../../../backend/src/utils/types/category.types";

const SubCategoryCreate: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const goback = () => navigate(-1);
    const [ico, setIco] = useState<File>();

    const from = location.state?.from?.pathname || "/admin/subcategories";

    const [createSubCategory, { isSuccess, isLoading }] = useCreateSubCategoryMutation();
    const [uploadImage, { isSuccess: isImageUploadSuccess, isLoading: isImageUploading }] = useCategoryImageMutation();
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const { data: categoriesData, isLoading: isCatLoading } = useGetAllCategoriesQuery();

    useEffect(() => {
        isCatLoading ? [] : setCategories(categoriesData?.categories);
    }, [categoriesData]);

    useEffect(() => {
        if (isSuccess) {
            navigate(from, { replace: true });
        }
    }, [isSuccess, navigate, from]);

    return (
        <>
            <Formik
                initialValues={{
                    title: '',
                    icon: '',
                    categoryId: 0
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
                    try {
                        await createSubCategory(values).unwrap();
                        const formData = new FormData();
                        formData.append('file', ico as File);
                        
                        await uploadImage(formData).unwrap();
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
                    setFieldValue,
                    touched,
                    values,
                }) => (
                    <Box component='section'>
                        <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Add New Sub Category</Typography>

                        <Paper sx={{ padding: 4 }}>
                            <Box component='form' noValidate autoComplete="off" onSubmit={handleSubmit}>
                                {isLoading ? (
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
                                                <FormControl sx={{ width: '100%' }}>
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
                                                                value={values.categoryId || ''}
                                                                name="categoryId"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
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
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                            handleChange(event);
                                                            const file = event.target.files?.[0]!;
                                                            setFieldValue("icon", file.name);
                                                            setIco(file)
                                                        }}
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.icon &&
                                                            errors.icon
                                                        )}
                                                    />
                                                    {isImageUploading || isImageUploadSuccess}
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

                                            <Button variant="contained" type="submit">Create</Button>
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>
                        </Paper>
                    </Box>
                )}
            </Formik>
        </>
    )
}

export default SubCategoryCreate;