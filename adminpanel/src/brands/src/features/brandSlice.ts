import { baseApiSlice } from "../../../common/src/features/baseApiSlice";

export const brandApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBrands: builder.query({
            query: (page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/brands/all${queryParams}`;
            },
            providesTags: ["Brand"]
        }),
        createBrand: builder.mutation({
            query: (category) => ({
                url: '/brands',
                method: "POST",
                body: category
            }),
            invalidatesTags: ["Brand"]
        }),
        getSingleBrand: builder.query({
            query: (id) => `/brands/${id}`,
            providesTags: ["Brand"]
        }),
        updateBrand: builder.mutation({
            query: ({ id, ...fields }) => ({
                url: `/brands/${id}`,
                method: 'PATCH',
                body: fields
            }),
            invalidatesTags: ["Brand"]
        }),
        deleteBrand: builder.mutation({
            query: (id) => ({
                url: `/brands/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Brand']
        }),
    })
})

export const { 
    useCreateBrandMutation,
    useGetAllBrandsQuery,
    useDeleteBrandMutation,
    useGetSingleBrandQuery,
    useUpdateBrandMutation
} = brandApiSlice;