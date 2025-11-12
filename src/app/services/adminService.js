import API_BASE_URL from './api';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const listUsers = async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/registro/listarRegistro`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Error al listar los usuarios');
    }
    return await response.json();
};

export const registerAdmin = async (adminData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/admin/registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(adminData)
    });
    if (!response.ok) {
        throw new Error('Error al registrar el administrador');
    }
    return await response.json();
};

export const updateUser = async (userId, userData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/seguridad/pruebas/actualizar/registro/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
    }
    return await response.json();
};

export const deactivateUser = async (userId) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/usuarios/inactivousuario/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Error al inactivar el usuario');
    }
    return await response.json();
};
