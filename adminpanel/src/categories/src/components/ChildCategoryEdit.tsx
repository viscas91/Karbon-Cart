import { useNavigate, useParams } from "react-router-dom";
import {
    useGetAllCategoriesQuery,
    useGetAllSubCategoriesByCategoryIdQuery,
    useGetSingleChildCategoryQuery,
    useUpdateChildCategoryMutation,
} from "../features/categorySlice";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { CategoryType, SubCategoryType } from "../../../../../backend/src/utils/types/category.types";

const ChildCategoryEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // const goback = () => navigate(-1);

    const [title, setTitle] = useState<string>('');
    const [icon, setIcon] = useState<string>('');
    const [categoryId, setCategoryId] = useState<number>();
    const [subCategoryId, setSubCategoryId] = useState<number>();

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);

    const { data: categoriesData, isLoading: isCatLoading } = useGetAllCategoriesQuery();
    const { data: subCategoriesData, isLoading: isSubCatLoading } = useGetAllSubCategoriesByCategoryIdQuery(categoryId);
    const { data, isLoading: isChildCatLoading } = useGetSingleChildCategoryQuery(id);
    const [updateChildCategory, { isSuccess: isUpdateSuccess, isLoading: isUpdateLoading, data: updateData }] = useUpdateChildCategoryMutation();

    useEffect(() => {
        isCatLoading ? <div>Loading...</div> : setCategories(categoriesData?.categories);
    }, [categoriesData]);

    useEffect(() => {
        isSubCatLoading ? <div>Loading...</div> : setSubCategories(subCategoriesData?.subCategories);
    }, [subCategoriesData]);

    useEffect(() => {
        if (data?.childCategory && !isChildCatLoading) {
            const category = data?.childCategory;
            setTitle(category.title);
            setCategoryId(category.categoryId);
            setSubCategoryId(category.subCategoryId);
            setIcon(category.icon);
        }
    }, [data])

    useEffect(() => {
        if (isUpdateSuccess) {
            navigate('/childcategories');
        }
    }, [isUpdateSuccess, navigate, updateData]);

    return (
        <>
            {title && !isChildCatLoading && (
            <Formik
                initialValues={{
                    title,
                    icon,
                    categoryId,
                    subCategoryId
                }}

                validationSchema={
                    Yup.object().shape({
                        title: Yup.string().required(),
                        categoryId: Yup.number().positive().required(),
                        subCategoryId: Yup.number().positive().required(),
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
                        await updateChildCategory({ id: data.childCategory.id, ...values }).unwrap();
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
                        <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Edit Child Category</Typography>

                        <Paper sx={{ padding: 4 }}>
                            <Box component='form' noValidate autoComplete="off" onSubmit={handleSubmit}>
                                {isSubCatLoading || isChildCatLoading || isUpdateLoading ? (
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
                                                                handleChange(e)
                                                                const id = Number(e.target.value)
                                                                setCategoryId(id)
                                                            }
                                                        }
                                                        label="Category"
                                                    >
                                                        {categories ? categories.map((category) => {
                                                            return <MenuItem value={category.id}>{category.title}</MenuItem>
                                                        }) : ''}
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

                                            <Box>
                                                <FormControl>
                                                    <InputLabel htmlFor='subCategoryID'>Sub Category</InputLabel>
                                                    <Select
                                                        fullWidth
                                                        required
                                                        error={Boolean(
                                                            touched.subCategoryId &&
                                                            errors.subCategoryId
                                                        )}
                                                        id="subCategoryID"
                                                        type="text"
                                                        value={values.subCategoryId}
                                                        name="subCategoryId"
                                                        onBlur={handleBlur}
                                                        onChange={
                                                            (e) => {
                                                                handleChange(e)
                                                                const id = Number(e.target.value)
                                                                setSubCategoryId(id)
                                                            }
                                                        }
                                                        label="Sub Category"
                                                    >
                                                        {subCategories ? subCategories.map((category) => {
                                                            return <MenuItem value={category.id}>{category.title}</MenuItem>
                                                        }) : ''}
                                                    </Select>
                                                </FormControl>
                                                {touched.subCategoryId &&
                                                    errors.subCategoryId && (
                                                        <FormHelperText
                                                            error
                                                            id="helper-text-subCategoryId"
                                                        >
                                                            {errors.subCategoryId}
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

                                            <Button variant="contained" type="submit">{id ? 'Update' : 'Submit'}</Button>
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

export default ChildCategoryEdit;