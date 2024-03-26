import { useLocation, useNavigate } from "react-router-dom";
import { useCategoryImageMutation, useCreateCategoryMutation  } from "../features/categorySlice";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Box, Button, FormHelperText, Grid, Paper, TextField, Typography } from "@mui/material";

const CategoryCreate: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const goback = () => navigate(-1);
    const [ico, setIco] = useState<File>();

    const from = location.state?.from?.pathname || "/admin/categories";

    const [createCategory, { isSuccess, isLoading }] = useCreateCategoryMutation();
    const [uploadImage, { isSuccess: isImageUploadSuccess, isLoading: isImageUploading }] = useCategoryImageMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate(from, { replace: true });
        }
    }, [isSuccess, navigate, from]);

    return (
        <>
            {!isLoading && (
            <Formik
                initialValues={{
                    title: '',
                    icon: ''
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
                        console.log(values)
                        const formData = new FormData();
                        formData.append('file', ico as File);
                        
                        const imageUploadResponse = await uploadImage(formData).unwrap();
                        const uploadedFileName = imageUploadResponse.uploadedFileName;

                        await createCategory({ ...values, icon: uploadedFileName }).unwrap();
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
                        <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Add New Category</Typography>

                        <Paper sx={{ padding: 4 }}>
                            <Box component='form' noValidate autoComplete="off" encType="multipart/form-data" onSubmit={handleSubmit}>
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
            )}
        </>
    )
}

export default CategoryCreate;