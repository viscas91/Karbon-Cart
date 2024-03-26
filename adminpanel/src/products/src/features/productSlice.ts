import { baseApiSlice } from "../../../common/src/features/baseApiSlice";

export const productApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/products/all${queryParams}`;
            },
            providesTags: ["Product"]
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: "POST",
                body: product
            }),
            invalidatesTags: ["Product"]
        }),
        getSingleProduct: builder.query({
            query: (productId) => `/products/${productId}`,
            providesTags: ["Product"]
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...fields }) => ({
                url: `/products/${id}`,
                method: 'PATCH',
                body: fields
            }),
            invalidatesTags: ["Product"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
        productImage: builder.mutation({
            query: (formData: FormData) => ({
                url: `/upload`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Product']
        }),
        productMultipleImages: builder.mutation({
            query: (formData: FormData) => ({
                url: '/uploads',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Product']
        }),
    })
})

export const { 
    useCreateProductMutation, 
    useDeleteProductMutation, 
    useGetAllProductsQuery, 
    useGetSingleProductQuery, 
    useUpdateProductMutation,
    useProductImageMutation, 
    useProductMultipleImagesMutation,
} = productApiSlice;