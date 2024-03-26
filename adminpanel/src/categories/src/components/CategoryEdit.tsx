import { useNavigate, useParams } from "react-router-dom";
import { useCategoryImageMutation, useGetSingleCategoryQuery, useUpdateCategoryMutation } from "../features/categorySlice";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Box, Button, FormHelperText, Grid, OutlinedInput, Paper, TextField, Typography } from "@mui/material";

const CategoryEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // const goback = () => navigate(-1);

    const [title, setTitle] = useState<string>('');
    const [icon, setIcon] = useState<string>('');
    const [ico, setIco] = useState<File>();
    
    const { data } = id ? useGetSingleCategoryQuery(id) : { data: null };

    const [updateCategory, { isSuccess: isUpdateSuccess, isLoading, data:updateData }] = useUpdateCategoryMutation();
    const [uploadImage, { isSuccess: isImageUploadSuccess, isLoading: isImageUploading }] = useCategoryImageMutation();

    useEffect(() => {
        const category = data?.category;
        if(category){
            setTitle(category.title);
            setIcon(category.icon);
        }
    }, [data])

    useEffect(() => {
        if(isUpdateSuccess){
            navigate('/admin/categories');
        }
    }, [isUpdateSuccess, navigate, updateData]);

    return (
        <>
            {!isLoading && title && (
            <Formik
                initialValues={{
                    title: title || '',
                    icon: icon || ''
                }}

                validationSchema={
                    Yup.object().shape({
                        title: Yup.string().required(),
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
                        if(ico){
                            const formData = new FormData();
                            formData.append('file', ico as File);

                            const imageUploadResponse = await uploadImage(formData).unwrap();
                            const uploadedFileName = imageUploadResponse.uploadedFileName;

                            await updateCategory({ id: data.category.id, ...values, icon: uploadedFileName }).unwrap();
                        } else {
                            await updateCategory({ id: data.category.id, ...values }).unwrap();
                        }                          
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
                        <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Edit Category</Typography>

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

                                                <Box sx={{ my: 1 }}>
                                                    <Box component='img' sx={{ width: '100%', height: 'auto', my: 2 }} src={`/media/${icon}`} alt='Image' />

                                                    <OutlinedInput
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
                                                    { isImageUploadSuccess || isImageUploading }
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

                                            <Button variant="contained" type="submit">Update</Button>
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

export default CategoryEdit;