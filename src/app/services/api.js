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
        // 8. ¡ESTE ES EL CAMBIO PRINCIPAL!
        // Ya no usamos `${API_BASE_URL}${endpoint}`.
        // Ahora, 'endpoint' debe ser la ruta completa (ej: '/api/login/cliente')
        // que tus *servicios* (como authService.js) le pasarán.
        // El proxy de Vite en 'vite.config.js' se encargará de redirigir.
        const response = await fetch(endpoint, options);

        // 9. Manejamos el error DE FORMA CENTRALIZADA (con la mejora para 404)
        // Esto evita el error 'Unexpected end of JSON' cuando hay un 404.
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {

            if (!response.ok) {
                // Lanza un error con el texto de estado (ej. "Not Found")
                throw new Error(response.statusText || 'Error de red');
            }

            // Si fue OK pero no es JSON (ej. un 204 No Content)
            return null;
        }

        // 10. Si la respuesta SÍ es JSON, la leemos
        const data = await response.json();

        // 11. Si es un error (pero la API lo envió como JSON)
        if (!response.ok) {
            // Lanza el mensaje de error de la API (ej. { msg: "..." })
            throw new Error(data.msg || data.message || 'Error desconocido de la API');
        }

        // 12. Devolvemos el JSON de éxito
        return data;

    } catch (error) {
        console.error(`Error en fetch a ${endpoint}:`, error.message);
        throw error; // Lanzamos el error para que el componente lo atrape
    }
};