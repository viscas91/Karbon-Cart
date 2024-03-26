import { baseApiSlice } from "../../../common/src/features/baseApiSlice";

export const vendorApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllVendors: builder.query({
            query: (page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/vendors/all${queryParams}`;
            },
            providesTags: ["Vendor"]
        }),
        createVendor: builder.mutation({
            query: (product) => ({
                url: '/vendors',
                method: "POST",
                body: product
            }),
            invalidatesTags: ["Vendor"]
        }),
        getSingleVendor: builder.query({
            query: (vendorId) => `/vendors/${vendorId}`,
            providesTags: ["Vendor"]
        }),
        updateVendor: builder.mutation({
            query: ({ id, ...fields }) => ({
                url: `/vendors/${id}`,
                method: 'PATCH',
                body: fields
            }),
            invalidatesTags: ["Vendor"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/vendors/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Vendor']
        }),
        vendorImage: builder.mutation({
            query: (formData: FormData) => ({
                url: `/upload`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Vendor']
        })
    })
})

export const { 
    useCreateVendorMutation,
    useGetAllVendorsQuery,
    useGetSingleVendorQuery,
    useUpdateVendorMutation,
    useDeleteProductMutation,
    useVendorImageMutation
} = vendorApiSlice;