import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};
