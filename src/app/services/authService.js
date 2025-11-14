import { apiFetch } from './api';

export const login = async (loginData) => {
    return apiFetch('/login/cliente', {
        method: 'POST',
        body: loginData
    });
};

export const registerCliente = async (registerData) => {
    return apiFetch('/registro/cliente', {
        method: 'POST',
        body: registerData
    });
};