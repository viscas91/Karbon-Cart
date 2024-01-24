import { createSlice } from "@reduxjs/toolkit";
// import { decodeToken } from "react-jwt";
import { RootState } from "../../../common/src/store";
import { UserType } from "../../../common/src/types/UserType";

const user = JSON.parse(localStorage.getItem("user") as string);
const googleToken = localStorage.getItem("googleToken");

// const decodedToken = decodeToken(googleToken as string);

interface AuthState {
    user: UserType | null;
    googleToken: string | null;
  }
  
  const initialState: AuthState = {
    user: user,
    googleToken: googleToken ? googleToken : null,
  };

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logIn: (state, action) => {
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload));
		},
		logOut: (state, _action: { payload?: any }) => {
    			state.user = null;
			state.googleToken = null;
			localStorage.removeItem("user");
			localStorage.removeItem("googleToken");
		},
	},
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserToken = (state: RootState) => state.auth.user?.accessToken;

export const selectCurrentUserGoogleToken = (state: RootState) => state.auth?.googleToken;