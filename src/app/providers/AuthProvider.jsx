import { createContext, useContext, useState, useEffect } from 'react';
import { loginClient as loginClientService, loginAdmin as loginAdminService } from '../services/authService';

const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const loginClient = async (credentials) => {
        const data = await loginClientService(credentials);
        if (data.token && data.usuario) {
            const userData = {
                id: data.usuario.id,
                nombre: data.usuario.nombre,
                apellido: data.usuario.apellido,
                correo: data.usuario.correo,
                rol: data.usuario.rol,
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', data.token);
            setUser(userData);
            setToken(data.token);
        }
        return data;
    };

    const loginAdmin = async (credentials) => {
        const data = await loginAdminService(credentials);
        if (data.token && data.usuario) {
            const userData = {
                id: data.usuario.id,
                nombre: data.usuario.nombre,
                apellido: data.usuario.apellido,
                correo: data.usuario.correo,
                rol: data.usuario.rol,
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', data.token);
            setUser(userData);
            setToken(data.token);
        }
        return data;
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loginClient, loginAdmin, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
