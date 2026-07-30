import { Navigate, useLocation } from "react-router-dom";
import { apiService } from "./api";

export const PrivateRoute = ({ element: Component }) => {
    const location = useLocation();
    return apiService.isAuthenticated() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export const CustomerRoute = ({ element: Component }) => {
    const location = useLocation();
    return apiService.isCustomer() || apiService.isAdmin() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export const AuditorRoute = ({ element: Component }) => {
    const location = useLocation();
    return apiService.isAdmin() || apiService.isAuditor() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};