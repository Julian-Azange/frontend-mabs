import API_BASE_URL from './api';

/**
 * Processes the membership payment through Wompi.
 * This function communicates with the backend to create a Wompi payment transaction
 * and returns the URL to redirect the user for payment.
 *
 * @param {object} paymentData - The payment data.
 * @param {number} paymentData.amountInCents - The amount in COP cents.
 * @param {string} paymentData.customerEmail - The customer's email.
 * @param {string} paymentData.reference - The unique payment reference.
 * @param {string} token - The user's auth token.
 * @returns {Promise<{ wompiRedirectUrl: string }>} The response from the server containing the Wompi URL.
 */
export const processMembershipPayment = async (paymentData, token) => {
    const response = await fetch(`${API_BASE_URL}/pagos/crear-transaccion-wompi`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error al procesar el pago con Wompi' }));
        throw new Error(errorData.message || 'Error al procesar el pago con Wompi');
    }
    return await response.json();
};

/**
 * Redirects the user to the Wompi payment gateway.
 * @param {string} wompiRedirectUrl - The URL to redirect to.
 */
export const redirectToWompi = (wompiRedirectUrl) => {
    if (wompiRedirectUrl) {
        window.location.href = wompiRedirectUrl;
    } else {
        console.error('No Wompi redirect URL provided.');
        throw new Error('No se pudo redirigir a Wompi. URL no válida.');
    }
};

/**
 * Creates a new membership parameterization (type).
 * @param {object} parametrizationData - The data for the new membership type.
 * @param {string} parametrizationData.nombreMembresia - The name of the membership.
 * @param {string} parametrizationData.descripcion - The description of the membership.
 * @param {number} parametrizationData.precioMembresia - The price of the membership.
 * @param {string} metasploitToken - The custom security token for the 'metasploit' header.
 * @returns {Promise<any>} The response from the server.
 */
export const createMembershipParametrization = async (parametrizationData, metasploitToken) => {
    const response = await fetch(`${API_BASE_URL}/membresia/seguridad/crear/parametrizacion/membresia`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'metasploit': metasploitToken,
        },
        body: JSON.stringify(parametrizationData)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error al crear la parametrización de membresía' }));
        throw new Error(errorData.message || 'Error al crear la parametrización de membresía');
    }
    return await response.json();
};

/**
 * Gets the current user's membership data.
 * This is a placeholder and returns mock data.
 * @returns {Promise<any>} The membership data.
 */
export const getCurrentMembership = async () => {
    console.log('Fetching current membership data (mocked)');
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return mock data
    return {
        status: 'active',
        user: {
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
        membershipType: 'Premium',
        startDate: '2023-01-01',
        endDate: '2024-01-01',
    };
};