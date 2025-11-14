import API_BASE_URL from "./api";

export const loginClient = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/login/cliente`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg || 'Error al iniciar sesión como CLIENTE');
    }
    return data;
};

export const loginAdmin = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login/admin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
};

export const registerClient = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/registro/client`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
};

export const registerAdmin = async (userData, token) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg || 'Error al registrar administrador');
    }
    return data;
};
