import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MembershipPayment from '../../presentation/pages/membership/MembershipPayment';
import MembershipDashboard from '../../presentation/pages/membership/MembershipDashboard';
import { PrivateRoute } from './PrivateRoute';

export const MembershipRoutes = () => {
    return (
        <Routes>
            <Route path="/membresia">
                <Route path="pago" element={<MembershipPayment />} />
                <Route
                    path="dashboard"
                    element={
                        <PrivateRoute>
                            <MembershipDashboard />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Routes>
    );
};