// src/presentation/components/admin/AdminNavbar.jsx
import React, { useState } from 'react'
import {
    AppBar, IconButton, Avatar, InputBase, Toolbar, Box, Badge, Typography,
    Menu, MenuItem, Divider
} from '@mui/material'
import {
    Menu as MenuIcon, Search, Notifications, LightMode, DarkMode, Home, Logout, Person
} from '@mui/icons-material' // Añadimos Person y Logout
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../app/providers/AuthProvider'
import { useThemeMode } from '../../../app/providers/ThemeProvider'

const PRIMARY_COLOR = '#C43670' // Raspberry Rose

export default function AdminNavbar({ mobileOpen, setMobileOpen }) {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const { mode, toggleMode } = useThemeMode()

    // Estado y handlers para el Menú Desplegable del Perfil
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    // Lógica de Cerrar Sesión
    const handleLogout = () => {
        handleClose() // Cierra el menú
        logout()      // Llama a la función de cierre de sesión del AuthProvider
        navigate('/login') // Redirige al login
    }

    const handleViewProfile = () => {
        handleClose()
        navigate('/perfil')
    }

    const toggleTheme = () => {
        toggleMode()
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (t) => t.zIndex.drawer + 1,
                backgroundColor: 'white',
                color: '#1a1f36',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)', // Sombra sutil
                borderBottom: '1px solid #e0e0e0'
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, minHeight: '70px' }}>

                {/* --- IZQUIERDA: Logo, Menú Mobile y Búsqueda --- */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => setMobileOpen(!mobileOpen)} sx={{ display: { md: 'none' } }}>
                        <MenuIcon />
                    </IconButton>

                    {/* Barra de Búsqueda Estilizada */}
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            alignItems: 'center',
                            bgcolor: '#f8f9fc',
                            px: 2,
                            py: 1,
                            borderRadius: 1.5,
                            border: '1px solid #e0e0e0',
                            transition: 'all 0.2s',
                            '&:focus-within': {
                                borderColor: PRIMARY_COLOR,
                                boxShadow: `0 0 0 1px ${PRIMARY_COLOR}`
                            },
                            width: 250
                        }}
                    >
                        <Search fontSize="small" sx={{ color: '#9da4ae', mr: 1 }} />
                        <InputBase placeholder="Buscar..." sx={{ fontSize: 14 }} />
                    </Box>
                </Box>

                {/* --- DERECHA: Íconos de Acción y Perfil --- */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                    {/* Botón Home */}
                    <IconButton
                        aria-label="ir a home"
                        onClick={() => navigate('/')}
                        sx={{ color: '#636e72', '&:hover': { color: PRIMARY_COLOR } }}
                    >
                        <Home />
                    </IconButton>

                    {/* Toggle Theme */}
                    <IconButton
                        onClick={toggleTheme}
                        sx={{ color: '#636e72', '&:hover': { color: PRIMARY_COLOR } }}
                    >
                        {mode === 'dark' ? <DarkMode /> : <LightMode />}
                    </IconButton>

                    {/* Notificaciones */}
                    <IconButton aria-label="notificaciones" sx={{ color: '#636e72', '&:hover': { color: PRIMARY_COLOR } }}>
                        <Badge
                            badgeContent={3}
                            color="error"
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: PRIMARY_COLOR,
                                    color: 'white',
                                    boxShadow: '0 0 0 1px white'
                                }
                            }}
                        >
                            <Notifications />
                        </Badge>
                    </IconButton>

                    {/* Avatar (Target para el Menú) */}
                    <Box
                        onClick={handleClick}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: 1.5,
                            transition: 'background-color 0.2s',
                            '&:hover': { bgcolor: '#f8f9fc' },
                            bgcolor: open ? '#f8f9fc' : 'transparent'
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                bgcolor: PRIMARY_COLOR,
                                fontSize: '0.9rem'
                            }}
                        >
                            {user?.name ? user.name[0] : 'A'}
                        </Avatar>
                        <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 500 }}>
                            {user?.name || 'Admin'}
                        </Typography>
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        sx={{ mt: 1 }}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        MenuListProps={{ sx: { minWidth: 180, p: 0.5 } }}
                        PaperProps={{ sx: { borderRadius: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } }}
                    >
                        <MenuItem
                            onClick={handleViewProfile}
                            sx={{
                                fontSize: '0.9rem',
                            }}
                        >
                            <Person
                                sx={{
                                    mr: 1,
                                    color: '#636e72',
                                    fontSize: '1.15rem'
                                }}
                            />
                            Ver Perfil
                        </MenuItem>

                        <Divider />

                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                color: 'error.main',
                                fontSize: '0.9rem'
                            }}
                        >
                            <Logout
                                sx={{
                                    mr: 1,
                                    fontSize: '1.15rem'
                                }}
                            />
                            Cerrar Sesión
                        </MenuItem>
                    </Menu>

                </Box>
            </Toolbar>
        </AppBar>
    )
}