import { createSlice } from "@reduxjs/toolkit";
// import { decodeToken } from "react-jwt";
import { RootState } from "../../../common/src/store";

interface User {
    success: boolean;
    firstName: string;
    lastName: string;
    username: string;
    provider: string;
    avatar: string | null;
    accessToken: string;
}

const user: User = JSON.parse(localStorage.getItem("user") as string);
const googleToken = localStorage.getItem("googleToken");

// const decodedToken = decodeToken(googleToken as string);

interface AuthState {
    user: User | null;
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
      localStorage.removeItem("user");
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