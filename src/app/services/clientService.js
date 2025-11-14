import { apiFetch } from './api';

export const registerClient = async (clientData) => {
    const data = await apiFetch('/registro/client', {
        method: 'POST',
        body: clientData,
    });
    return data;
};
