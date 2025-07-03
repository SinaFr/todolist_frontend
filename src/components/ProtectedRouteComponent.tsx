import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContextComponent';

const ProtectedRouteComponent = ({ children }: any) => {
    const { isAuthenticated } = useAuth();
    const { isLoading } = useAuth();

    /* if page is reloaded, it should not be directed to login page */
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        /* redirect to login page if not authenticated */
        return <Navigate to="/login" replace />;
    }
    /* render children (protected page) */
    return children;
};

export default ProtectedRouteComponent;