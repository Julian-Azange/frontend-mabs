import API_BASE_URL from './api';

export const registerClient = async (clientData) => {
    const response = await fetch(`${API_BASE_URL}/registro/client`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientData)
    });
    if (!response.ok) {
        throw new Error('Error al registrar el cliente');
    }
    return await response.json();
};
