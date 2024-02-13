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
            query: (page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/subcategories/all${queryParams}`;
            },
            providesTags: ["SubCategory"]
        }),
        getAllSubCategoriesByCategoryId: builder.query({
            query: (categoryId, page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/subcategories/${categoryId}/all${queryParams}`;
            },
            providesTags: ["SubCategory"]
        }),
        getAllChildCategories: builder.query({
            query: (page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/childcategories/all${queryParams}`;
            },
            providesTags: ["ChildCategory"]
        }),
        getAllChildCategoriesByCategoryId: builder.query({
            query: (subCategoryId: number | void, page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/childcategories/${subCategoryId}/all${queryParams}`;
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
            query: (fields) => ({
                url: `/subcategories`,
                method: "POST",
                body: fields
            }),
            invalidatesTags: ["SubCategory"]
        }),
        createChildCategory: builder.mutation({
            query: (fields) => ({
                url: `/childCategories`,
                method: "POST",
                body: fields
            }),
            invalidatesTags: ["ChildCategory"]
        }),
        getSingleCategory: builder.query({
            query: (id) => `/categories/${id}`,
            providesTags: ["Category"]
        }),
        getSingleSubCategory: builder.query({
            query: (id) => `/subcategories/${id}`,
            providesTags: ["SubCategory"]
        }),
        getSingleChildCategory: builder.query({
            query: (id) => `/childcategories/${id}`,
            providesTags: ["ChildCategory"]
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...fields }) => ({
                url: `/categories/${id}`,
                method: 'PATCH',
                body: fields
            }),
            invalidatesTags: ["Category"]
        }),
        updateSubCategory: builder.mutation({
            query: ({ id, ...fields }) => ({
                url: `/subcategories/${id}`,
                method: 'PATCH',
                body: fields
            }),
            invalidatesTags: ["SubCategory"]
        }),
        updateChildCategory: builder.mutation({
            query: ({ id, ...fields }) => ({
                url: `/childcategories/${id}`,
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
            query: (id) => ({
                url: `/subcategories/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['SubCategory']
        }),
        deleteChildCategory: builder.mutation({
            query: (id) => ({
                url: `/childcategories/${id}`,
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
    useGetAllSubCategoriesByCategoryIdQuery,
    useGetSingleSubCategoryQuery,
    useUpdateSubCategoryMutation,
    useDeleteSubCategoryMutation,

    useCreateChildCategoryMutation,
    useGetAllChildCategoriesQuery,
    useGetSingleChildCategoryQuery,
    useUpdateChildCategoryMutation,
    useDeleteChildCategoryMutation
} = categoryApiSlice;