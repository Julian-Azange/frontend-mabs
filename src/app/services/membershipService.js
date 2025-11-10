// Datos temporales para simular la API
let temporalMembershipData = {
    membershipStatus: 'active',
    referralCode: 'MABS-' + Math.random().toString(36).substring(7).toUpperCase(),
    referralLink: 'https://mabs.com/ref/' + Math.random().toString(36).substring(7),
    totalReferrals: 15,
    totalEarnings: 750000,
    referrals: [
        {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan@example.com',
            date: '2023-11-01',
            level: 0,
            commission: 25,
            status: 'active'
        },
        {
            id: 2,
            name: 'María López',
            email: 'maria@example.com',
            date: '2023-11-02',
            level: 1,
            commission: 5,
            status: 'active'
        },
        {
            id: 3,
            name: 'Carlos Rodríguez',
            email: 'carlos@example.com',
            date: '2023-11-03',
            level: 2,
            commission: 5,
            status: 'active'
        }
    ],
    commissionsByLevel: [
        { level: 0, percentage: 25 },
        { level: 1, percentage: 5 },
        { level: 2, percentage: 5 },
        { level: 3, percentage: 5 },
        { level: 4, percentage: 5 }
    ]
};

// Simulación de proceso de pago
export const processMembershipPayment = async (paymentData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Pago procesado exitosamente',
                transactionId: 'TRANS-' + Math.random().toString(36).substring(7).toUpperCase()
            });
        }, 2000);
    });
};

// Obtener datos de la membresía
export const getMembershipData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(temporalMembershipData);
        }, 1000);
    });
};

// Generar nuevo enlace de referido
export const generateNewReferralLink = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newLink = 'https://mabs.com/ref/' + Math.random().toString(36).substring(7);
            temporalMembershipData.referralLink = newLink;
            resolve({ success: true, referralLink: newLink });
        }, 1000);
    });
};

// Obtener historial de comisiones
export const getCommissionHistory = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                commissions: [
                    {
                        id: 1,
                        date: '2023-11-01',
                        amount: 50000,
                        referral: 'Juan Pérez',
                        status: 'paid'
                    },
                    {
                        id: 2,
                        date: '2023-11-02',
                        amount: 25000,
                        referral: 'María López',
                        status: 'pending'
                    }
                ]
            });
        }, 1000);
    });
};