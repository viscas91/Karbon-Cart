import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCreateProductMutation, useGetSingleProductQuery } from '../features/productSlice';
import { useEffect, useState } from 'react';
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Stack } from '@mui/material';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGetAllCategoriesQuery } from '../../../categories/src/features/categorySlice';

interface CategoryType {
    id: number,
    title: string,
    icon: string,
    slug: string,
    createdAt: string,
    updatedAt: string
}

export const ProductCreate: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { productId } = useParams();
    const goback = () => navigate(-1);

    const [title, setTitle] = useState<string>('');
    const [sku, setSku] = useState<string>('');
    const [thumb, setThumb] = useState();
    const [vendorId, setVendorId] = useState();
    const [categoryId, setCategoryId] = useState();
    const [subCategoryId, setSubCategoryId] = useState();
    const [childCategory, setChildCategory] = useState();
    const [brandId, setBrandId] = useState();
    const [quantity, setQuantity] = useState();
    const [shortDescription, setShortDescription] = useState();
    const [longDescription, setLongDescription] = useState();
    const [videoLink, setVideoLink] = useState();
    const [price, setPrice] = useState();
    const [offerPrice, setOfferPrice] = useState();
    const [offerStartDate, setOfferStartDate] = useState();
    const [offerEndDate, setOfferEndDate] = useState();
    const [productType, setProductType] = useState();
    const [status, setStatus] = useState();
    const [isApproved, setIsApproved] = useState();
    const [seoTitle, setSeoTitle] = useState();
    const [seoDescription, setSeoDescription] = useState();

    const from = location.state?.from?.pathname || "/products";

    const [createProduct, { isSuccess, isLoading }] = useCreateProductMutation();
    const { data } = useGetSingleProductQuery(productId);
    const { data: categoryData } = useGetAllCategoriesQuery();

    useEffect(() => {
        const product = data?.product;
        if(product){
            setTitle(product.title);
            setSku(product.sku);
            setThumb(product.thumb);
            setVendorId(product.vendor_id);
            setCategoryId(product.category_id);
            setSubCategoryId(product.sub_category_id);
            setChildCategory(product.child_category_id);
            setBrandId(product.brand_id);
            setQuantity(product.quantity);
            setShortDescription(product.short_description);
            setLongDescription(product.long_description);
            setVideoLink(product.video_link);
            setPrice(product.price);
            setOfferPrice(product.offerPrice);
            setOfferStartDate(product.offer_start_date);
            setOfferEndDate(product.offer_end_date);
            setProductType(product.product_type);
            setStatus(product.status);
            setIsApproved(product.is_approved);
            setSeoTitle(product.seo_title);
            setSeoDescription(product.seo_description)
        }
    }, [data])

    useEffect(() => {
        if (isSuccess) {
            navigate(from, { replace: true });
        }
    }, [isSuccess, navigate, from]);

    return (
        <>
            <Formik initialValues={{
                title: title || '',
                sku: sku || '',
                thumb: thumb || '',
                vendor_id: vendorId || '',
                category_id: categoryId || '',
                sub_category_id: subCategoryId || '',
                child_category_id: childCategory || '',
                brand_id: brandId || '',
                quantity: quantity || '',
                short_description: shortDescription || '',
                long_description: longDescription || '',
                videoLink: videoLink || '',
                price: price || '',
                offerPrice: offerPrice || '',
                offerStartDate: offerStartDate || '',
                offerEndDate: offerEndDate || '',
                productType: productType || '',
                status: status || '',
                isApproved: isApproved || '',
                seoTitle: seoTitle || '',
                seoDescription: seoDescription || ''
            }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().max(255).required("Product is required"),
                    sku: Yup.string().max(100).required('SKU is required'),
                    thumb: Yup.mixed().required('Thumbnail is required'),
                    vendor_id: Yup.number().required('Vendor is required'),
                    category_id: Yup.number().required('Category is required'),
                    sub_category_id: Yup.number(),
                    child_category_id: Yup.number(),
                    brand_id: Yup.number().required('Brand is required'),
                    quantity: Yup.number().required('Quantity is required'),
                    short_description: Yup.string().required('Short description is required'),
                    long_description: Yup.string().required('Long description is required'),
                    videoLink: Yup.string(),
                    price: Yup.number().positive('Price must be positive').required('Price is required').min(0).integer('Price must be integer'),
                    offerPrice: Yup.number().positive('Price must be positive').min(0).integer('Price must be integer'),
                    offerStartDate: Yup.date(),
                    offerEndDate: Yup.date(),
                    productType: Yup.string(),
                    status: Yup.string(),
                    seoTitle: Yup.string(),
                    seoDescription: Yup.string(),
                })}

                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    try {
                        await createProduct(values).unwrap();
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
                    <>
                        <Container
                            component='main'
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>{ productId ? 'Edit Product' : 'Add New Product'}</Typography>
                                        
                                        <Box>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    fontSize: "10px",
                                                    ml: "10px",
                                                }}
                                                onClick={goback}
                                            >
                                                Go Back
                                            </Button>
                                        </Box>
                                        </Box>
                            <Paper variant="outlined" sx={{ p: 3 }}>
                            <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit}>
                                <Grid container>
                                    <Grid item xs={12}>
                                    </Grid>

                                    {isLoading ? (<div>Loading...</div>) :
                                        (
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor='product-title'>Product Name</InputLabel>
                                                        <OutlinedInput
                                                            required
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.title &&
                                                                errors.title
                                                            )}
                                                            id="product-title"
                                                            type="name"
                                                            value={title || values.title}
                                                            name="title"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Product title"
                                                            inputProps={{}}
                                                        />
                                                        {touched.title &&
                                                            errors.title && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-title"
                                                                >
                                                                    {errors.title}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-sku'>SKU</InputLabel>
                                                        <OutlinedInput
                                                            required
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.sku &&
                                                                errors.sku
                                                            )}
                                                            id="product-sku"
                                                            type="text"
                                                            value={sku || values.sku}
                                                            name="sku"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Product SKU"
                                                            inputProps={{}}
                                                        />
                                                        {touched.sku &&
                                                            errors.sku && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-sku"
                                                                >
                                                                    {errors.sku}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-thumb'>Thumbnail</InputLabel>
                                                        <OutlinedInput
                                                            required
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.thumb &&
                                                                errors.thumb
                                                            )}
                                                            id="product-thumb"
                                                            type="file"
                                                            name="thumb"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Product Thumbnail"
                                                        />
                                                        {touched.thumb &&
                                                            errors.thumb && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-thumb"
                                                                >
                                                                    {errors.thumb}
                                                                </FormHelperText>
                                                            )}

                                                        <FormControl error={Boolean(touched.vendor_id && errors.vendor_id)}>
                                                            <InputLabel htmlFor='product-vendor-label'>Vendor*</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                required
                                                                error={Boolean(
                                                                    touched.vendor_id &&
                                                                    errors.vendor_id
                                                                )}
                                                                labelId='product-vendor-label'
                                                                id="product-vendor"
                                                                value={vendorId || values.vendor_id}
                                                                name="vendor_id"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Vendor"
                                                            >
                                                                <MenuItem value='1'>some vendor</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        {touched.vendor_id &&
                                                            errors.vendor_id && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-vendor"
                                                                >
                                                                    {errors.vendor_id}
                                                                </FormHelperText>
                                                            )}

                                                        <FormControl>
                                                            <InputLabel htmlFor='product-category'>Category</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                required
                                                                error={Boolean(
                                                                    touched.category_id &&
                                                                    errors.category_id
                                                                )}
                                                                id="product-category"
                                                                type="text"
                                                                value={categoryId || values.category_id}
                                                                name="category_id"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Category"
                                                                inputProps={{}}
                                                            >
                                                                {categoryData && categoryData.categories ? categoryData.categories.map((category: CategoryType)=> {
                                                                    return <MenuItem value={category.id}>{category.title}</MenuItem>
                                                                }): ''}
                                                            </Select>
                                                        </FormControl>
                                                        {touched.category_id &&
                                                            errors.category_id && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-category"
                                                                >
                                                                    {errors.category_id}
                                                                </FormHelperText>
                                                            )}

                                                        <FormControl>
                                                            <InputLabel htmlFor='product-sub-category'>Sub Category</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                error={Boolean(
                                                                    touched.sub_category_id &&
                                                                    errors.sub_category_id
                                                                )}
                                                                id="product-sub-category"
                                                                type="text"
                                                                value={subCategoryId || values.sub_category_id}
                                                                name="sub_category_id"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                placeholder="Sub Category"
                                                                inputProps={{}}
                                                            >
                                                                <MenuItem value='1'>Some sub category</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        {touched.sub_category_id &&
                                                            errors.sub_category_id && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-sub-category"
                                                                >
                                                                    {errors.sub_category_id}
                                                                </FormHelperText>
                                                            )}

                                                        <FormControl>
                                                            <InputLabel htmlFor='product-child-category'>Child Category</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                error={Boolean(
                                                                    touched.child_category_id &&
                                                                    errors.child_category_id
                                                                )}
                                                                id="product-child-category"
                                                                value={childCategory || values.child_category_id}
                                                                name="child_category_id"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Child Category"
                                                            >
                                                                <MenuItem value='2'>ds</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        {touched.child_category_id &&
                                                            errors.child_category_id && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-child-category"
                                                                >
                                                                    {errors.child_category_id}
                                                                </FormHelperText>
                                                            )}

                                                        <FormControl>
                                                            <InputLabel htmlFor='product-brand'>Brand</InputLabel>
                                                            <Select
                                                                required
                                                                fullWidth
                                                                error={Boolean(
                                                                    touched.brand_id &&
                                                                    errors.brand_id
                                                                )}
                                                                id="product-brand"
                                                                type="text"
                                                                value={brandId || values.brand_id}
                                                                name="brand_id"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                placeholder="Brand"
                                                                inputProps={{}}
                                                            >
                                                                <MenuItem value='1'>Some brand</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        {touched.brand_id &&
                                                            errors.brand_id && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-brand"
                                                                >
                                                                    {errors.brand_id}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-quantity'>Quantity*</InputLabel>
                                                        <OutlinedInput
                                                            required
                                                            error={Boolean(
                                                                touched.quantity &&
                                                                errors.quantity
                                                            )}
                                                            id="product-quantity"
                                                            type="number"
                                                            value={quantity || values.quantity}
                                                            name="quantity"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Quantity"
                                                            inputProps={{}}
                                                        />
                                                        {touched.quantity &&
                                                            errors.quantity && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-quantity"
                                                                >
                                                                    {errors.quantity}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-short-desc'>Short Description*</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.short_description &&
                                                                errors.short_description
                                                            )}
                                                            id="product-short-desc"
                                                            type="text"
                                                            multiline
                                                            rows={4}
                                                            value={shortDescription || values.short_description}
                                                            name="short_description"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Short Description"
                                                            inputProps={{}}
                                                        />
                                                        {touched.short_description &&
                                                            errors.short_description && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-short-desc"
                                                                >
                                                                    {errors.short_description}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-long-desc'>Long Description*</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.long_description &&
                                                                errors.long_description
                                                            )}
                                                            id="product-long-desc"
                                                            type="text"
                                                            multiline
                                                            rows={10}
                                                            value={longDescription || values.long_description}
                                                            name="long_description"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Long Description"
                                                            inputProps={{}}
                                                        />
                                                        {touched.long_description &&
                                                            errors.long_description && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-long-desc"
                                                                >
                                                                    {errors.long_description}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-video-link'>Video Link*</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.videoLink &&
                                                                errors.videoLink
                                                            )}
                                                            id="product-video-link"
                                                            type="text"
                                                            value={videoLink || values.videoLink}
                                                            name="video_link"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Video Link"
                                                            inputProps={{}}
                                                        />
                                                        {touched.videoLink &&
                                                            errors.videoLink && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-short-desc"
                                                                >
                                                                    {errors.videoLink}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-price'>Price*</InputLabel>
                                                        <OutlinedInput
                                                            error={Boolean(
                                                                touched.price &&
                                                                errors.price
                                                            )}
                                                            id="product-price"
                                                            type="number"
                                                            value={price || values.price}
                                                            name="price"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Price"
                                                            inputProps={{}}
                                                        />
                                                        {touched.price &&
                                                            errors.price && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-price"
                                                                >
                                                                    {errors.price}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-offer-price'>Offer Price</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.offerPrice &&
                                                                errors.offerPrice
                                                            )}
                                                            id="product-offer-price"
                                                            type="number"
                                                            value={offerPrice || values.offerPrice}
                                                            name="offer_price"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Offer Price"
                                                            inputProps={{}}
                                                        />
                                                        {touched.offerPrice &&
                                                            errors.offerPrice && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-offer-price"
                                                                >
                                                                    {errors.offerPrice}
                                                                </FormHelperText>
                                                            )}

                                                        <Stack direction='row' spacing={1} py={2}>
                                                            
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                label="Offer Start Date"
                                                                value={offerStartDate || values.offerStartDate || null}
                                                                onChange={handleChange}
                                                                onAccept={handleBlur}
                                                                name='offer_start_date'
                                                                format='DD/MM/YYYY'
                                                                sx={{ flex: 1 }}
                                                            />
                                                        </LocalizationProvider>
                                                        {touched.offerStartDate &&
                                                            errors.offerStartDate && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-offer-start-date"
                                                                >
                                                                    {errors.offerStartDate}
                                                                </FormHelperText>
                                                            )}
                                                            

                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                label="Offer End Date"
                                                                value={offerEndDate || values.offerEndDate || null}
                                                                onChange={handleChange}
                                                                onAccept={handleBlur}
                                                                name='offer_end_date'
                                                                format='DD/MM/YYYY'
                                                                sx={{ flex: 1 }}
                                                            />
                                                        </LocalizationProvider>
                                                        {touched.offerEndDate &&
                                                            errors.offerEndDate && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-offer-end-date"
                                                                >
                                                                    {errors.offerEndDate}
                                                                </FormHelperText>
                                                            )}
                                                        </Stack>

                                                        <InputLabel htmlFor='product-type'>Product Type*</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.productType &&
                                                                errors.productType
                                                            )}
                                                            id="product-type"
                                                            type="text"
                                                            value={productType || values.productType}
                                                            name="productType"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Product Type"
                                                            inputProps={{}}
                                                        />
                                                        {touched.productType &&
                                                            errors.productType && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-type"
                                                                >
                                                                    {errors.productType}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-status'>Status*</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.status &&
                                                                errors.status
                                                            )}
                                                            id="product-status"
                                                            type="text"
                                                            value={status || values.status}
                                                            name="status"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Product Status"
                                                            inputProps={{}}
                                                        />
                                                        {touched.status &&
                                                            errors.status && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-status"
                                                                >
                                                                    {errors.status}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-seo-title'>SEO Title*</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.seoTitle &&
                                                                errors.seoTitle
                                                            )}
                                                            id="product-seo-title"
                                                            type="text"
                                                            value={seoTitle || values.seoTitle}
                                                            name="seoTitle"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="SEO Title"
                                                            inputProps={{}}
                                                        />
                                                        {touched.seoTitle &&
                                                            errors.seoTitle && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-seo-title"
                                                                >
                                                                    {errors.seoTitle}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-seo-description'>SEO Description*</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.seoDescription &&
                                                                errors.seoDescription
                                                            )}
                                                            id="product-seo-description"
                                                            type="text"
                                                            value={seoDescription || values.seoDescription}
                                                            name="seoDescription"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="SEO Description"
                                                            inputProps={{}}
                                                        />
                                                        {touched.seoDescription &&
                                                            errors.seoDescription && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-seo-description"
                                                                >
                                                                    {errors.seoDescription}
                                                                </FormHelperText>
                                                            )}

                                                        <Grid item xs={12}>
                                                            <Button
                                                                sx={{
                                                                    mt: 3,
                                                                    mb: 2,
                                                                }}
                                                                type="submit"
                                                                fullWidth
                                                                variant="contained"
                                                                color="success"
                                                                size="large"
                                                                endIcon={
                                                                    <PersonAddAlt1Icon fontSize="large" />
                                                                }
                                                                disabled={
                                                                    !values.title ||
                                                                    !values.sku ||
                                                                    !values.thumb ||
                                                                    !values.vendor_id ||
                                                                    !values.category_id ||
                                                                    !values.brand_id ||
                                                                    !values.quantity ||
                                                                    !values.short_description ||
                                                                    !values.long_description ||
                                                                    !values.price ||
                                                                    !values.productType ||
                                                                    !values.status ||
                                                                    
                                                                    !values.seoTitle ||
                                                                    !values.seoDescription
                                                                }
                                                            >
                                                                { productId  ? 'Update Product' : 'Create Product' }
                                                            </Button>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        )}
                                </Grid>
                            </Box>
                            </Paper>
                        </Container>
                    </>
                )}
            </Formik>
        </>
    )
}