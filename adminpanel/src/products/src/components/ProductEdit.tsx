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
import { useGetAllCategoriesQuery, useGetAllChildCategoriesQuery, useGetAllSubCategoriesByCategoryIdQuery } from '../../../categories/src/features/categorySlice';
import { ChildCategoryType, SubCategoryType } from '../../../../../backend/src/utils/types/category.types';

interface CategoryType {
    id: number,
    title: string,
    icon: string,
    slug: string,
    createdAt: string,
    updatedAt: string
}

const ProductEdit: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { productId } = useParams();
    const goback = () => navigate(-1);

    const [title, setTitle] = useState<string>('');
    const [sku, setSku] = useState<string>('');
    const [thumb, setThumb] = useState();
    const [vendorId, setVendorId] = useState();
    const [categoryId, setCategoryId] = useState<number>();
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

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);
    const [childCategories, setChildCategories] = useState<ChildCategoryType[]>([]);

    const from = location.state?.from?.pathname || "/products";

    const [createProduct, { isSuccess, isLoading }] = useCreateProductMutation();
    const { data } = useGetSingleProductQuery(productId);
    const { data: categoriesData, isLoading: isCatLoading } = useGetAllCategoriesQuery();
    const { data: subCategoriesData, isLoading: isSubCatLoading } = useGetAllSubCategoriesByCategoryIdQuery(categoryId);
    const { data: childCategoriesData, isLoading: isChildCatLoading } = useGetAllChildCategoriesQuery();
    
    useEffect(() => {
        if (categoriesData && !isCatLoading) {
            setCategories(categoriesData?.categories);
        }
    }, [categoriesData]);
    console.log('categories', categories)

    useEffect(() => {
        if (subCategoriesData && !isSubCatLoading) {
            setSubCategories(subCategoriesData?.subCategories);
        }
    }, [categoryId, subCategoriesData]);
    console.log('sub categories', subCategories)

    useEffect(() => {
        if (childCategoriesData && !isChildCatLoading) {
            setChildCategories(childCategoriesData?.childCategories);
        }
    }, [subCategoryId, childCategoriesData]);
    console.log('child categories', childCategories);

    useEffect(() => {
        const product = data?.product;
        if(product){
            setTitle(product.title);
            setSku(product.sku);
            setThumb(product.thumb);
            setVendorId(product.vendorId);
            setCategoryId(product.categoryId);
            setSubCategoryId(product.subCategoryId);
            setChildCategory(product.childCategoryId);
            setBrandId(product.brandId);
            setQuantity(product.quantity);
            setShortDescription(product.shortDescription);
            setLongDescription(product.longDescription);
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
                title: title,
                sku: sku,
                thumb: thumb,
                vendorId: vendorId,
                categoryId: categoryId,
                subCategoryId: subCategoryId,
                childCategoryId: childCategory,
                brandId: brandId,
                quantity: quantity,
                shortDescription: shortDescription,
                longDescription: longDescription,
                videoLink: videoLink,
                price: price,
                offerPrice: offerPrice,
                offerStartDate: offerStartDate,
                offerEndDate: offerEndDate,
                productType: productType,
                status: status,
                isApproved: isApproved,
                seoTitle: seoTitle,
                seoDescription: seoDescription
            }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().max(255).required("Product is required"),
                    sku: Yup.string().max(100).required('SKU is required'),
                    thumb: Yup.mixed().required('Thumbnail is required'),
                    vendorId: Yup.number().required('Vendor is required'),
                    categoryId: Yup.number().required('Category is required'),
                    subCategoryId: Yup.number(),
                    childCategoryId: Yup.number(),
                    brandId: Yup.number().required('Brand is required'),
                    quantity: Yup.number().required('Quantity is required'),
                    shortDescription: Yup.string().required('Short description is required'),
                    longDescription: Yup.string().required('Long description is required'),
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
                                                            value={values.title}
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
                                                            value={values.sku}
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

                                                        <FormControl error={Boolean(touched.vendorId && errors.vendorId)}>
                                                            <InputLabel htmlFor='product-vendor-label'>Vendor*</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                required
                                                                error={Boolean(
                                                                    touched.vendorId &&
                                                                    errors.vendorId
                                                                )}
                                                                labelId='product-vendor-label'
                                                                id="product-vendor"
                                                                value={values.vendorId}
                                                                name="vendorId"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Vendor"
                                                            >
                                                                <MenuItem value='1'>some vendor</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        {touched.vendorId &&
                                                            errors.vendorId && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-vendor"
                                                                >
                                                                    {errors.vendorId}
                                                                </FormHelperText>
                                                            )}

                                                        <FormControl>
                                                            <InputLabel htmlFor='product-category'>Category</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                required
                                                                error={Boolean(
                                                                    touched.categoryId &&
                                                                    errors.categoryId
                                                                )}
                                                                id="product-category"
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
                                                                {categories ? categories.map((category: CategoryType)=> {
                                                                    return <MenuItem value={category.id}>{category.title}</MenuItem>
                                                                }): ''}
                                                            </Select>
                                                        </FormControl>
                                                        {touched.categoryId &&
                                                            errors.categoryId && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-category"
                                                                >
                                                                    {errors.categoryId}
                                                                </FormHelperText>
                                                            )}

                                                        <FormControl>
                                                            <InputLabel htmlFor='product-sub-category'>Sub Category</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                error={Boolean(
                                                                    touched.subCategoryId &&
                                                                    errors.subCategoryId
                                                                )}
                                                                id="product-sub-category"
                                                                type="text"
                                                                value={values.subCategoryId}
                                                                name="subCategoryId"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                placeholder="Sub Category"
                                                            >
                                                                {subCategories ? subCategories.map((category)=> {
                                                                    return <MenuItem value={category.id}>{category.title}</MenuItem>
                                                                }): ''}
                                                            </Select>
                                                        </FormControl>
                                                        {touched.subCategoryId &&
                                                            errors.subCategoryId && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-sub-category"
                                                                >
                                                                    {errors.subCategoryId}
                                                                </FormHelperText>
                                                            )}

                                                        <FormControl>
                                                            <InputLabel htmlFor='product-child-category'>Child Category</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                error={Boolean(
                                                                    touched.childCategoryId &&
                                                                    errors.childCategoryId
                                                                )}
                                                                id="product-child-category"
                                                                value={values.childCategoryId}
                                                                name="childCategoryId"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Child Category"
                                                            >
                                                                {childCategories ? childCategories.map((category)=> {
                                                                    return <MenuItem value={category.id}>{category.title}</MenuItem>
                                                                }): ''}
                                                            </Select>
                                                        </FormControl>
                                                        {touched.childCategoryId &&
                                                            errors.childCategoryId && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-child-category"
                                                                >
                                                                    {errors.childCategoryId}
                                                                </FormHelperText>
                                                            )}

                                                        <FormControl>
                                                            <InputLabel htmlFor='product-brand'>Brand</InputLabel>
                                                            <Select
                                                                required
                                                                fullWidth
                                                                error={Boolean(
                                                                    touched.brandId &&
                                                                    errors.brandId
                                                                )}
                                                                id="product-brand"
                                                                type="text"
                                                                value={values.brandId}
                                                                name="brandId"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                placeholder="Brand"
                                                                inputProps={{}}
                                                            >
                                                                <MenuItem value='1'>Some brand</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        {touched.brandId &&
                                                            errors.brandId && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-brand"
                                                                >
                                                                    {errors.brandId}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-quantity'>Quantity</InputLabel>
                                                        <OutlinedInput
                                                            required
                                                            error={Boolean(
                                                                touched.quantity &&
                                                                errors.quantity
                                                            )}
                                                            id="product-quantity"
                                                            type="number"
                                                            value={values.quantity}
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
                                                                touched.shortDescription &&
                                                                errors.shortDescription
                                                            )}
                                                            id="product-short-desc"
                                                            type="text"
                                                            multiline
                                                            rows={4}
                                                            value={values.shortDescription}
                                                            name="shortDescription"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Short Description"
                                                            inputProps={{}}
                                                        />
                                                        {touched.shortDescription &&
                                                            errors.shortDescription && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-short-desc"
                                                                >
                                                                    {errors.shortDescription}
                                                                </FormHelperText>
                                                            )}

                                                        <InputLabel htmlFor='product-long-desc'>Long Description*</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.longDescription &&
                                                                errors.longDescription
                                                            )}
                                                            id="product-long-desc"
                                                            type="text"
                                                            multiline
                                                            rows={10}
                                                            value={values.longDescription}
                                                            name="longDescription"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="Long Description"
                                                            inputProps={{}}
                                                        />
                                                        {touched.longDescription &&
                                                            errors.longDescription && (
                                                                <FormHelperText
                                                                    error
                                                                    id="helper-text-product-long-desc"
                                                                >
                                                                    {errors.longDescription}
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
                                                            value={values.videoLink}
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
                                                            value={values.price}
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
                                                            value={values.offerPrice}
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
                                                                value={values.offerStartDate}
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
                                                                value={values.offerEndDate}
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
                                                            value={values.productType}
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

                                                        <InputLabel htmlFor='product-status'>Status</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.status &&
                                                                errors.status
                                                            )}
                                                            id="product-status"
                                                            type="text"
                                                            value={values.status}
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
                                                            value={values.seoTitle}
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

                                                        <InputLabel htmlFor='product-seo-description'>SEO Description</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            error={Boolean(
                                                                touched.seoDescription &&
                                                                errors.seoDescription
                                                            )}
                                                            id="product-seo-description"
                                                            type="text"
                                                            value={values.seoDescription}
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
                                                                    !values.vendorId ||
                                                                    !values.categoryId ||
                                                                    !values.brandId ||
                                                                    !values.quantity ||
                                                                    !values.shortDescription ||
                                                                    !values.longDescription ||
                                                                    !values.price ||
                                                                    !values.productType ||
                                                                    !values.status ||
                                                                    
                                                                    !values.seoTitle ||
                                                                    !values.seoDescription
                                                                }
                                                            >
                                                                Update
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

export default ProductEdit;