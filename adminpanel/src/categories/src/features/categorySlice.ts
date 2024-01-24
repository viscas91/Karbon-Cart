import { baseApiSlice } from "../../../common/src/features/baseApiSlice";

export const categoryApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: (page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/categories/all${queryParams}`;
            },
            providesTags: ["Category"]
        }),
        getAllSubCategories: builder.query({
            query: (categoryId, page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/categories/${categoryId}/all${queryParams}`;
            },
            providesTags: ["SubCategory"]
        }),
        getAllChildCategories: builder.query({
            query: (subCategoryId: number, categoryId: number | void, page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/categories/${categoryId}/${subCategoryId}/all${queryParams}`;
            },
            providesTags: ["ChildCategory"]
        }),
        createCategory: builder.mutation({
            query: (category) => ({
                url: '/categories',
                method: "POST",
                body: category
            }),
            invalidatesTags: ["Category"]
        }),
        createSubCategory: builder.mutation({
            query: ({ categoryId , ...fields}) => ({
                url: `/categories/${categoryId}`,
                method: "POST",
                body: fields
            }),
            invalidatesTags: ["SubCategory"]
        }),
        createChildCategory: builder.mutation({
            query: ({ categoryId, subCategoryId , ...fields}) => ({
                url: `/categories/${categoryId}/${subCategoryId}`,
                method: "POST",
                body: fields
            }),
            invalidatesTags: ["ChildCategory"]
        }),
        getSingleCategory: builder.query({
            query: (categoryId) => `/categories/${categoryId}`,
            providesTags: ["Category"]
        }),
        getSingleSubCategory: builder.query({
            query: ({ categoryId, subCategoryId }) => `/categories/${categoryId}/${subCategoryId}`,
            providesTags: ["SubCategory"]
        }),
        getSingleChildCategory: builder.query({
            query: ({ categoryId, subCategoryId, ChildCategoryId }) => `/categories/${categoryId}/${subCategoryId}/${ChildCategoryId}`,
            providesTags: ["ChildCategory"]
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...fields }) => ({
                url: `/category/${id}`,
                method: 'PATCH',
                body: fields
            }),
            invalidatesTags: ["Category"]
        }),
        updateSubCategory: builder.mutation({
            query: ({ categoryId, subCategoryId, ...fields }) => ({
                url: `/category/${categoryId}/${subCategoryId}`,
                method: 'PATCH',
                body: fields
            }),
            invalidatesTags: ["SubCategory"]
        }),
        updateChildCategory: builder.mutation({
            query: ({ categoryId, subCategoryId, childCategoryId, ...fields }) => ({
                url: `/category/${categoryId}/${subCategoryId}/${childCategoryId}`,
                method: 'PATCH',
                body: fields
            }),
            invalidatesTags: ["ChildCategory"]
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Category']
        }),
        deleteSubCategory: builder.mutation({
            query: ({ categoryId, subCategoryId }) => ({
                url: `/categories/${categoryId}/${subCategoryId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['SubCategory']
        }),
        deleteChildCategory: builder.mutation({
            query: ({ categoryId, subCategoryId, childCategoryId }) => ({
                url: `/categories/${categoryId}/${subCategoryId}/${childCategoryId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['ChildCategory']
        })
    })
})

export const { 
    useCreateCategoryMutation,
    useGetAllCategoriesQuery,
    useGetSingleCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,

    useCreateSubCategoryMutation,
    useGetAllSubCategoriesQuery,
    useGetSingleSubCategoryQuery,
    useUpdateSubCategoryMutation,
    useDeleteSubCategoryMutation,

    useCreateChildCategoryMutation,
    useGetAllChildCategoriesQuery,
    useGetSingleChildCategoryQuery,
    useUpdateChildCategoryMutation,
    useDeleteChildCategoryMutation
} = categoryApiSlice;