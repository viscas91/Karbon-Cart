import { baseApiSlice } from "../../../common/src/features/baseApiSlice";

export const orderApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/orders/all${queryParams}`;
            },
            providesTags: ["Order"]
        })
    })
});

export const { useGetAllOrdersQuery } = orderApiSlice;