    import { Navigate, Outlet, useLocation } from "react-router-dom";
    import { useAuthUser } from "../hooks/useAuth";

    const AuthRequired: React.FC = () => {
        const location = useLocation();

        const role = useAuthUser();

        return role ? (
            <Outlet />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        );
    };

    export default AuthRequired;