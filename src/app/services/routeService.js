const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getAuthorizedRoutes = async () => {
    try {
        const response = await fetch(`${API_URL}/routes`, {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener las rutas');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};