import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { isTokenExpired } from "../../../common/src/utils/isTokenExpired";

const AuthRequired: React.FC = () => {
    const [tokenExpired, setTokenExpired] = useState<boolean>();

    const location = useLocation();
    let { role, exp } = useAuthUser();

    useEffect(() => {
      setTokenExpired(isTokenExpired(exp));
    }, [exp]);

    return !!role && !tokenExpired ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default AuthRequired;