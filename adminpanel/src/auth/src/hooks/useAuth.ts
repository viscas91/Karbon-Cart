import { decodeToken } from "react-jwt";
import { useSelector } from "react-redux";
import {
	selectCurrentUserToken,
	selectCurrentUserGoogleToken,
} from "../features/authSlice";
import { JwtPayload } from "jsonwebtoken";

export const useAuthUser = () => {
	const token = useSelector(selectCurrentUserToken);
	const googleToken = useSelector(selectCurrentUserGoogleToken);

	if (token) {
		const decodedToken = decodeToken(token);
		console.log(decodedToken)
		const { role } = decodedToken as JwtPayload;

		return role;
	} else if (googleToken) {
		const gDecodedToken = decodeToken(googleToken);
		const { role } = gDecodedToken as JwtPayload;

		return role;
	}
};