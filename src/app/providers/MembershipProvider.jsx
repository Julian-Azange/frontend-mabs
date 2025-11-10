import { createContext, useContext, useState, useEffect } from 'react';
import { getMembershipData } from '../services/membershipService';
import { useAuth } from './AuthProvider';

const MembershipContext = createContext();

export function MembershipProvider({ children }) {
    const [membershipData, setMembershipData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            loadMembershipData();
        } else {
            setMembershipData(null);
            setLoading(false);
        }
    }, [user]);

    const loadMembershipData = async () => {
        try {
            const data = await getMembershipData();
            setMembershipData(data);
        } catch (error) {
            console.error('Error loading membership data:', error);
        } finally {
            setLoading(false);
        }
    };

    const refreshMembershipData = () => {
        loadMembershipData();
    };

    return (
        <MembershipContext.Provider
            value={{
                membershipData,
                loading,
                refreshMembershipData
            }}
        >
            {children}
        </MembershipContext.Provider>
    );
}

export function useMembership() {
    const context = useContext(MembershipContext);
    if (!context) {
        throw new Error('useMembership must be used within a MembershipProvider');
    }
    return context;
}