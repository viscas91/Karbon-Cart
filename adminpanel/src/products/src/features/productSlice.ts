import { baseApiSlice } from "../../../common/src/features/baseApiSlice";

export const productApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (page?) => `products/all?page=${page}`,
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
        })
    })
})

export const { 
    useCreateProductMutation, 
    useDeleteProductMutation, 
    useGetAllProductsQuery, 
    useGetSingleProductQuery, 
    useUpdateProductMutation 
} = productApiSlice;