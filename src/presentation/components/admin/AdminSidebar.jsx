import React from 'react'
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Dashboard, Inventory2, Category, People, ReceiptLong, Settings, Logout } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom' // Importar useLocation
import { useAuth } from '../../../app/providers/AuthProvider'

const drawerWidth = 260
const PRIMARY_COLOR = '#C43670' // Raspberry Rose

export default function AdminSidebar({ mobileOpen, setMobileOpen }) {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const location = useLocation()

    const menu = [
        { label: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
        { label: 'Productos', icon: <Inventory2 />, path: '/admin/productos' },
        { label: 'Categorías', icon: <Category />, path: '/admin/categorias' },
        { label: 'Usuarios', icon: <People />, path: '/admin/usuarios' },
        { label: 'Pedidos', icon: <ReceiptLong />, path: '/admin/pedidos' },
        { label: 'Configuración', icon: <Settings />, path: '/admin/configuracion' },
    ]

    const drawerContent = (
        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>

            <Toolbar sx={{ minHeight: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: PRIMARY_COLOR, // Usar color primario en el título
                        fontSize: '1.4rem'
                    }}
                >
                    MABS Panel
                </Typography>
            </Toolbar>

            <List sx={{ px: 1 }}>
                {menu.map((m) => {
                    const isActive = location.pathname.includes(m.path)

                    return (
                        <ListItemButton
                            key={m.label}
                            onClick={() => { navigate(m.path); setMobileOpen(false) }}
                            // Aplicamos estilos de UI pulidos
                            sx={{
                                mb: 0.5,
                                borderRadius: 1, // Menos redondeo
                                color: isActive ? PRIMARY_COLOR : '#636e72', // Color de texto inactivo
                                bgcolor: isActive ? `${PRIMARY_COLOR}10` : 'transparent', // Fondo muy ligero para activo
                                paddingY: '10px',

                                '&:hover': {
                                    bgcolor: isActive ? `${PRIMARY_COLOR}15` : '#f0f0f0', // Hover sutil
                                    color: PRIMARY_COLOR,
                                    '& .MuiListItemIcon-root': {
                                        color: PRIMARY_COLOR
                                    }
                                },
                                '&.Mui-selected': {
                                    // Esta clase no se usa con navegación manual, pero la mantenemos para seguridad
                                    bgcolor: `${PRIMARY_COLOR}10 !important`,
                                    color: PRIMARY_COLOR,
                                    '& .MuiListItemIcon-root': { color: PRIMARY_COLOR }
                                }
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: isActive ? PRIMARY_COLOR : '#636e72',
                                    minWidth: 40
                                }}
                            >
                                {m.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={m.label}
                                primaryTypographyProps={{
                                    fontSize: '0.9rem', // Ligeramente más grande
                                    fontWeight: isActive ? 600 : 500
                                }}
                            />
                        </ListItemButton>
                    )
                })}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            {/* Botón de Logout */}
            <Box sx={{ p: 2, borderTop: '1px solid #f0f0f0' }}>
                <ListItemButton
                    onClick={() => { logout(); navigate('/') }}
                    sx={{
                        borderRadius: 1,
                        color: '#636e72',
                        '&:hover': {
                            bgcolor: '#f0f0f0',
                            color: PRIMARY_COLOR,
                            '& .MuiListItemIcon-root': { color: PRIMARY_COLOR }
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: '#636e72', minWidth: 40 }}>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText
                        primary="Cerrar Sesión"
                        primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
                    />
                </ListItemButton>
            </Box>
        </Box>
    )

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: 'white',
                        color: '#1a1f36',
                        borderRight: '1px solid #e0e0e0', // Borde más sutil
                        paddingX: 1 // Ajustamos padding para dar espacio al nuevo listado
                    },
                    display: { xs: 'none', md: 'block' }
                }}
            >
                {drawerContent}
            </Drawer>
            {/* Mobile temporary drawer (similar) */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: 'white',
                        color: '#1a1f36',
                        paddingX: 1
                    }
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    )
}
