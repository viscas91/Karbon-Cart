import { baseApiSlice } from "../../../common/src/features/baseApiSlice";

export const paymentApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPayments: builder.query({
            query: (page?: number | void) => {
                const queryParams = page !== undefined ? `?page=${page}` : '';
                return `/payments/all${queryParams}`;
            },
            providesTags: ["Payment"]
        })
    })
});

export const { useGetAllPaymentsQuery } = paymentApiSlice;