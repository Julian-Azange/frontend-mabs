// 1. Obtenemos la URL de la variable de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL;

// 2. Creamos una función helper para todas las llamadas
export const apiFetch = async (endpoint, options = {}) => {
    // 3. Obtenemos el token
    const token = localStorage.getItem('token');

    // 4. Configuramos los headers por defecto
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    // 5. Si hay un token, lo añadimos
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    // 6. Unimos los headers por defecto con los que pasemos en 'options'
    options.headers = {
        ...defaultHeaders,
        ...options.headers,
    };

    // 7. Si pasamos un 'body', lo convertimos a JSON
    if (options.body) {
        options.body = JSON.stringify(options.body);
    }

    try {
        // 8. Hacemos la llamada
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        // 9. Manejamos el error DE FORMA CENTRALIZADA
        if (!response.ok) {
            // Intentamos leer el JSON de error de la API (ej: { msg: "..." })
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Error en la petición a la API');
        }

        // 10. Si la respuesta no tiene contenido (ej. un 204)
        if (response.status === 204) {
            return null;
        }

        // 11. Devolvemos el JSON de éxito
        return await response.json();

    } catch (error) {
        console.error(`Error en fetch a ${endpoint}:`, error.message);
        throw error; // Lanzamos el error para que el componente lo atrape
    }
};