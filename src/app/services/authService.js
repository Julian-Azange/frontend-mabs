import { apiFetch } from './api';

export const login = async (loginData) => {
    return apiFetch('/api/login/cliente', {
        method: 'POST',
        body: loginData
    });
};

export const registerCliente = async (registerData) => {
    return apiFetch('/api/registro/cliente', {
        method: 'POST',
        body: registerData
    });
};