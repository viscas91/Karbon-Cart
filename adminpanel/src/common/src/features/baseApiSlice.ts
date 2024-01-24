import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logIn, logOut } from "../../../auth/src/features/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: "/api/v1",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.user?.accessToken;
    const googleToken = (getState() as RootState).auth.googleToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else if (googleToken) {
      headers.set("authorization", `Bearer ${googleToken}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	let response = await baseQuery(args, api, extraOptions);

	if (response?.error?.status === 403) {
		const refreshResponse = await baseQuery(
			"/auth/new_access_token",
			api,
			extraOptions
		);

		if (refreshResponse?.data) {
			api.dispatch(logIn({ ...refreshResponse.data }));
			response = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logOut());
		}
	}
	return response;
};

export const baseApiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithRefreshToken,
	tagTypes: ["User", "Product", "Vendor", "Category", "SubCategory", "ChildCategory", "Cart"],
	endpoints: (_builder) => ({}),
});