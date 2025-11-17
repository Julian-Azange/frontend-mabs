import React, { useState } from 'react'
import { Box, Toolbar } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../app/providers/AuthProvider'
import AdminNavbar from '../components/admin/AdminNavbar'
import AdminSidebar from '../components/admin/AdminSidebar'

const drawerWidth = 260

export default function AdminLayout() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [mobileOpen, setMobileOpen] = useState(false)

    if (!user || (user.role !== 'ADMIN' && user.role !== 'DESARROLLADOR')) {
        navigate('/')
        return null
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AdminNavbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    bgcolor: '#F7F7F7',
                    minHeight: '100vh',
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Toolbar sx={{ minHeight: '70px !important' }} />

                <Outlet />

            </Box>
        </Box>
    )
}