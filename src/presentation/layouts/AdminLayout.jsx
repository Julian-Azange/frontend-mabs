import React from 'react'
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, IconButton, Avatar, InputBase, Divider } from '@mui/material'
import { Dashboard, Inventory2, People, ReceiptLong, Settings, Logout, Menu as MenuIcon, Search } from '@mui/icons-material'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../app/providers/AuthProvider'

const drawerWidth = 260

export default function AdminLayout() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    // simple role guard
    if (!user || user.role !== 'admin') {
        navigate('/')
        return null
    }

    const menu = [
        { label: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
        { label: 'Productos', icon: <Inventory2 />, path: '/admin/productos' },
        { label: 'Usuarios', icon: <People />, path: '/admin/usuarios' },
        { label: 'Pedidos', icon: <ReceiptLong />, path: '/admin/pedidos' },
        { label: 'Configuración', icon: <Settings />, path: '/admin/configuracion' },
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Topbar */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#ffffff', color: 'text.primary', boxShadow: 'none', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box component="img" src="/assets/logo.png" alt="logo" sx={{ height: 36, cursor: 'pointer' }} onClick={() => navigate('/admin/dashboard')} />
                        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f5f7fb', px: 1.5, py: 0.5, borderRadius: 2 }}>
                            <Search fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                            <InputBase placeholder="Search anything..." sx={{ fontSize: 14 }} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton onClick={() => navigate('/perfil')} aria-label="Perfil">
                            <Avatar sx={{ width: 36, height: 36, cursor: 'pointer' }}>{user.name ? user.name[0] : 'A'}</Avatar>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#0b2336', color: '#fff', borderRight: 'none' },
                }}
            >
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                    <Box component="img" src="/assets/logo.png" alt="logo" sx={{ height: 36 }} />
                </Toolbar>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                <Box sx={{ overflow: 'auto', mt: 1 }}>
                    <List>
                        {menu.map((m) => (
                            <ListItemButton key={m.label} onClick={() => navigate(m.path)} sx={{ color: '#cfe8ff', '&.Mui-selected': { backgroundColor: 'rgba(255,255,255,0.06)' } }}>
                                <ListItemIcon sx={{ color: '#9fd3ff' }}>{m.icon}</ListItemIcon>
                                <ListItemText primary={m.label} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ p: 2 }}>
                    <ListItemButton onClick={() => { logout(); navigate('/') }} sx={{ color: '#fff' }}>
                        <ListItemIcon sx={{ color: '#fff' }}><Logout /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f6f8fb', minHeight: '100vh' }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    )
}
