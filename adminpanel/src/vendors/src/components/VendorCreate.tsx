import { useLocation, useNavigate } from "react-router-dom"
import { useCreateVendorMutation, useVendorImageMutation } from "../features/vendorSlice";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Box, Button, FormHelperText, Grid, OutlinedInput, Paper, Stack, TextField, Typography } from "@mui/material";

const VendorCreate: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const goback = navigate(-1);

    const from = location.state?.from?.pathname || "/admin/vendors";

    const [banner, setBanner] = useState<File>();
    const [createVendor, { isSuccess, isLoading }] = useCreateVendorMutation();
    const [uploadImage, { isSuccess: isImageUploadSuccess, isLoading: isImageUploading }] = useVendorImageMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate(from, { replace: true });
        }
    }, [isSuccess, navigate, from]);

    return (
        <>
            <Formik initialValues={{
                name: '',
                contactFName: '',
                contactLName: '',
                email: '',
                banner: '',
                phone: '',
                fax: '',
                aadharNo: '',
                panNo: '',
                address: '',
                description: '',
                fbLink: '',
                twLink: '',
                instaLink: '',
                status: '',
                note: '',
                ranking: 0,
                website: '',
                discountAvailable: '',
                discountType: '',
                discountRate: '',
                typeGoods: ''
            }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required("Name is required."),
                    contactFName: Yup.string().max(100).required("Contact First Name is required."),
                    contactLName: Yup.string().max(100).required("Contact Last Name is required."),
                    email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
                    banner: Yup.string().required("Image banner is required"),
                    phone: Yup.string().required('Phone number is required'),
                    fax: Yup.string().required('Fax is required'),
                    address: Yup.string().required("Address is required"),
                    description: Yup.string().required("Description is required."),
                    fbLink: Yup.string(),
                    twLink: Yup.string(),
                    instaLink: Yup.string(),
                    status: Yup.string(),
                    note: Yup.string(),
                    ranking: Yup.number().positive(),
                    website: Yup.string(),
                    discountAvailable: Yup.string(),
                    discountType: Yup.string(),
                    discountRate: Yup.string(),
                    typeGoods: Yup.string()
                })}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    try {
                        await createVendor(values).unwrap();
                        const formData = new FormData();
                        formData.append('file', banner as File);
                        
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
                    isSubmitting,
                    setFieldValue,
                    touched,
                    values
                }) => (
                    <Box component='section'>
                        <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Add New Vendor</Typography>

                        <Paper sx={{ padding: 4 }}>
                            <Box component='form' noValidate autoComplete="off" onSubmit={handleSubmit}>
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <Stack direction="row" spacing={2}>
                                                <Box width="100%">
                                                    <TextField
                                                        id="name"
                                                        type="name"
                                                        value={values.name}
                                                        name="name"
                                                        variant="outlined"
                                                        label="Name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="ABC LTD."
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.name &&
                                                            errors.name
                                                        )}
                                                    />
                                                    {touched.name &&
                                                        errors.name && (
                                                            <FormHelperText
                                                                error
                                                                id="helper-text-name"
                                                            >
                                                                {errors.name}
                                                            </FormHelperText>
                                                        )}
                                                </Box>

                                                <Box width="100%">
                                                    <TextField
                                                        id="email"
                                                        type="email"
                                                        value={values.email}
                                                        name="email"
                                                        variant="outlined"
                                                        label="Email"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="company@example.com"
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.email &&
                                                            errors.email
                                                        )}
                                                    />
                                                    {touched.email &&
                                                        errors.email && (
                                                            <FormHelperText
                                                                error
                                                                id="helper-text-email"
                                                            >
                                                                {errors.email}
                                                            </FormHelperText>
                                                        )}
                                                </Box>
                                            </Stack>

                                            <Stack direction="row" spacing={2} my={2}>
                                                <Box width="100%">
                                                    <TextField
                                                        id="contactFName"
                                                        type="contactFName"
                                                        value={values.contactFName}
                                                        name="contactFName"
                                                        variant="outlined"
                                                        label="Contact First Name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="John"
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.contactFName &&
                                                            errors.contactFName
                                                        )}
                                                    />
                                                    {touched.contactFName &&
                                                        errors.contactFName && (
                                                            <FormHelperText
                                                                error
                                                                id="helper-text-contactFName"
                                                            >
                                                                {errors.contactFName}
                                                            </FormHelperText>
                                                        )}
                                                </Box>

                                                <Box width="100%">
                                                    <TextField
                                                        id="contactLName"
                                                        type="contactLName"
                                                        value={values.contactLName}
                                                        name="contactLName"
                                                        variant="outlined"
                                                        label="Contact Last Name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Doe"
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.contactLName &&
                                                            errors.contactLName
                                                        )}
                                                    />
                                                    {touched.contactLName &&
                                                        errors.contactLName && (
                                                            <FormHelperText
                                                                error
                                                                id="helper-text-contactLName"
                                                            >
                                                                {errors.contactLName}
                                                            </FormHelperText>
                                                        )}
                                                </Box>
                                            </Stack>

                                            <Box>
                                                <OutlinedInput 
                                                    id='banner'
                                                    type='file'
                                                    name='banner'
                                                    label="Image Upload"
                                                    onBlur={handleBlur}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                        handleChange(event);
                                                        const file = event.target.files?.[0]!;
                                                        setFieldValue("banner", file.name);
                                                        setBanner(file)
                                                    }}
                                                    fullWidth
                                                />
                                                {isImageUploading || isImageUploadSuccess}
                                            </Box>


                                            <Stack direction="row" spacing={2} my={2}>
                                                <Box width="100%">
                                                    <TextField
                                                        id="ranking"
                                                        type="number"
                                                        value={values.ranking || ''}
                                                        name="ranking"
                                                        variant="outlined"
                                                        label="Ranking"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="John"
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.ranking &&
                                                            errors.ranking
                                                        )}
                                                    />
                                                    {touched.ranking &&
                                                        errors.ranking && (
                                                            <FormHelperText
                                                                error
                                                                id="helper-text-ranking"
                                                            >
                                                                {errors.ranking}
                                                            </FormHelperText>
                                                        )}
                                                </Box>

                                                <Box width="100%">
                                                    <TextField
                                                        id="phone"
                                                        type="phone"
                                                        value={values.phone}
                                                        name="phone"
                                                        variant="outlined"
                                                        label="Phone"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Doe"
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.phone &&
                                                            errors.phone
                                                        )}
                                                    />
                                                    {touched.phone &&
                                                        errors.phone && (
                                                            <FormHelperText
                                                                error
                                                                id="helper-text-phone"
                                                            >
                                                                {errors.phone}
                                                            </FormHelperText>
                                                        )}
                                                </Box>

                                                <Box width="100%">
                                                    <TextField
                                                        id="fax"
                                                        type="fax"
                                                        value={values.fax}
                                                        name="fax"
                                                        variant="outlined"
                                                        label="Fax"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Doe"
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.fax &&
                                                            errors.fax
                                                        )}
                                                    />
                                                    {touched.fax &&
                                                        errors.fax && (
                                                            <FormHelperText
                                                                error
                                                                id="helper-text-fax"
                                                            >
                                                                {errors.fax}
                                                            </FormHelperText>
                                                        )}
                                                </Box>
                                            </Stack>

                                            <Stack direction="row" spacing={2} my={2}>
                                                <Box width="100%">
                                                    <TextField
                                                        id="Facebook"
                                                        type="text"
                                                        value={values.fbLink}
                                                        name="fbLink"
                                                        variant="outlined"
                                                        label="Facebook"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Facebook"
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.fbLink &&
                                                            errors.fbLink
                                                        )}
                                                    />
                                                    {touched.fbLink &&
                                                        errors.fbLink && (
                                                            <FormHelperText
                                                                error
                                                                id="helper-text-fbLink"
                                                            >
                                                                {errors.fbLink}
                                                            </FormHelperText>
                                                        )}
                                                </Box>

                                                <Box width="100%">
                                                    <TextField
                                                        id="twLink"
                                                        type="twLink"
                                                        value={values.twLink}
                                                        name="twLink"
                                                        variant="outlined"
                                                        label="Twitter"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Doe"
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.twLink &&
                                                            errors.twLink
                                                        )}
                                                    />
                                                    {touched.twLink &&
                                                        errors.twLink && (
                                                            <FormHelperText
                                                                error
                                                                id="helper-text-twLink"
                                                            >
                                                                {errors.twLink}
                                                            </FormHelperText>
                                                        )}
                                                </Box>

                                                <Box width="100%">
                                                    <TextField
                                                        id="instaLink"
                                                        type="instaLink"
                                                        value={values.instaLink}
                                                        name="instaLink"
                                                        variant="outlined"
                                                        label="Instagram"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Instagram"
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.instaLink &&
                                                            errors.instaLink
                                                        )}
                                                    />
                                                    {touched.instaLink &&
                                                        errors.instaLink && (
                                                            <FormHelperText
                                                                error
                                                                id="helper-text-instaLink"
                                                            >
                                                                {errors.instaLink}
                                                            </FormHelperText>
                                                        )}
                                                </Box>
                                            </Stack>

                                        <Box mb={2}>
                                            <TextField
                                                id="note"
                                                type="text"
                                                value={values.note}
                                                name="note"
                                                variant="outlined"
                                                label="Note"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Note"
                                                fullWidth
                                                multiline
                                                rows={5}
                                                error={Boolean(
                                                    touched.note &&
                                                    errors.note
                                                )}
                                            />

                                        {touched.note &&
                                            errors.note && (
                                                <FormHelperText
                                                    error
                                                    id="helper-text-note"
                                                >
                                                    {errors.note}
                                                </FormHelperText>
                                            )}
                                        </Box>

                                        <Box mb={2}>
                                            <TextField
                                                id="description"
                                                type="text"
                                                value={values.description}
                                                name="description"
                                                variant="outlined"
                                                label="Description"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                fullWidth
                                                multiline
                                                rows={5}
                                                error={Boolean(
                                                    touched.description &&
                                                    errors.description
                                                )}
                                            />
                                            {touched.description &&
                                                errors.description && (
                                                    <FormHelperText
                                                        error
                                                        id="helper-text-description"
                                                    >
                                                        {errors.description}{isSubmitting}
                                                    </FormHelperText>
                                                )}
                                        </Box>

                                        <Box mb={2}>
                                            <TextField
                                                id="typeGoods"
                                                type="text"
                                                value={values.typeGoods}
                                                name="typeGoods"
                                                variant="outlined"
                                                label="Type of Goods Sold"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Type of Goods Sold"
                                                fullWidth
                                                multiline
                                                rows={5}
                                                error={Boolean(
                                                    touched.typeGoods &&
                                                    errors.typeGoods
                                                )}
                                            />
                                            {touched.typeGoods &&
                                                errors.typeGoods && (
                                                    <FormHelperText
                                                        error
                                                        id="helper-text-typeGoods"
                                                    >
                                                        {errors.typeGoods}
                                                    </FormHelperText>
                                                )}
                                        </Box>
                                        
                                        <Button variant="contained">Submit</Button>

                                        </Grid>
                                    </Grid>
                                )
                                }
                            </Box>
                        </Paper>
                    </Box>
                )}
            </Formik>
        </>
    )
}

export default VendorCreate;