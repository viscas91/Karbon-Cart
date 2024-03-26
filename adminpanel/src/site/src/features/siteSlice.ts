import { baseApiSlice } from "../../../common/src/features/baseApiSlice";

export const siteApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSiteSettings: builder.query({
            query: () => '/site',
            providesTags: ["Site"]
        }),
        updateSiteSettings: builder.mutation({
            query: (settingObj) => ({
                url: '/site',
                method: 'PATCH',
                body: {
                    ...settingObj
                }
            }),
            invalidatesTags: ["Site"]
        }),
    })
})

export const { 
    useGetSiteSettingsQuery,
    useUpdateSiteSettingsMutation
} = siteApiSlice;