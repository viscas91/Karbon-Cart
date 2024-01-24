import { baseApiSlice } from "../../../common/src/features/baseApiSlice";

export const cartApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProductsInCart: builder.query({
            query: () => `/cart`,
            providesTags: ["Cart"]
        }),
        addProductsToCart: builder.mutation({
            query: ({ cartId, productId }) => ({
                url: `/cart/${cartId}/${productId}`,
                method: "POST",
                body: {
                    cartId,
                    productId
                }
            }),
            invalidatesTags: ["Cart"]
        }),
        updateProductInCart: builder.mutation({
            query: ({ cartId, productId }) => ({
                url: `/cart/${cartId}/${productId}`,
                method: 'PATCH',
                body: {
                    cartId,
                    productId
                }
            }),
            invalidatesTags: ["Cart"]
        }),
        deleteProduct: builder.mutation({
            query: ({ cartId, productId }) => ({
                url: `/cart/${cartId}/${productId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        })
    })
})

export const { 
    useAddProductsToCartMutation,
    useGetAllProductsInCartQuery,
    useUpdateProductInCartMutation,
    useDeleteProductMutation
} = cartApiSlice;