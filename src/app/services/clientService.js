// src/app/services/clientService.js
import { apiFetch } from './api';

// --- Función de Registro (Mantengo tu estructura) ---
export const registerClient = async (clientData) => {
    // Asumo que 'clientData' es un objeto JS que apiFetch serializa como JSON
    const data = await apiFetch('/api/registro/client', {
        method: 'POST',
        body: clientData,
    });
    return data;
};

// --- Función para Subir/Actualizar Foto de Perfil ---
// Endpoint: /api/imgPerfil/{id}
export const uploadProfileImage = async (userId, formData) => {
    // NOTA: Cuando el 'body' es una instancia de FormData,
    // NO debes establecer el Content-Type en los headers. El navegador lo hace automáticamente.

    // Asumo que apiFetch maneja el método POST y las cabeceras de autenticación.
    const data = await apiFetch(`/api/imgPerfil/${userId}`, {
        method: 'POST', // Usamos POST o PUT para subir el archivo
        body: formData, // Pasamos el FormData directamente (contiene el archivo)
    });
    return data;
};

// --- Ejemplo Adicional: Actualizar Contraseña ---
// Endpoint: /api/actualizar/password/{id} (Ajusta la ruta según tu backend)
export const updatePassword = async (userId, passwordData) => {
    const data = await apiFetch(`/api/actualizar/password/${userId}`, {
        method: 'PUT',
        body: passwordData, // Objeto JS con { oldPassword, newPassword }
    });
    return data;
};