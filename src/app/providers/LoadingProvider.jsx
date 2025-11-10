import { createContext, useContext, useState } from 'react';
import LoadingScreen from '../../presentation/components/common/LoadingScreen';

const LoadingContext = createContext(null);

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider');
    }
    return context;
}

export default function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);

    const showLoading = () => setLoading(true);
    const hideLoading = () => setLoading(false);

    return (
        <LoadingContext.Provider value={{ showLoading, hideLoading }}>
            {loading && <LoadingScreen />}
            {children}
        </LoadingContext.Provider>
    );
}