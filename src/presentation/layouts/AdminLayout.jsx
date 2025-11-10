import React, { useState } from 'react'
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, AppBar, IconButton, Avatar, InputBase, Divider, Badge, useTheme, Typography } from '@mui/material'
import { Dashboard, Inventory2, Category, People, ReceiptLong, Settings, Logout, Menu as MenuIcon, Search, Notifications, LightMode, DarkMode } from '@mui/icons-material'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../app/providers/AuthProvider'
import { useThemeMode } from '../../app/providers/ThemeProvider'

const drawerWidth = 260

export default function AdminLayout() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const [mobileOpen, setMobileOpen] = useState(false)
    const theme = useTheme()
    const { mode, toggleMode } = useThemeMode()

    if (!user || user.role !== 'admin') {
        navigate('/')
        return null
    }

    const menu = [
        { label: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
        { label: 'Productos', icon: <Inventory2 />, path: '/admin/productos' },
        { label: 'Categorías', icon: <Category />, path: '/admin/categorias' },
        { label: 'Usuarios', icon: <People />, path: '/admin/usuarios' },
        { label: 'Pedidos', icon: <ReceiptLong />, path: '/admin/pedidos' },
        { label: 'Configuración', icon: <Settings />, path: '/admin/configuracion' },
    ]

    const toggleTheme = () => {
        toggleMode()
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (t) => t.zIndex.drawer + 1,
                    backgroundColor: 'white',
                    color: '#1a1f36',
                    boxShadow: 'none',
                    borderBottom: '1px solid #f0f0f0'
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, minHeight: '70px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton onClick={() => setMobileOpen(!mobileOpen)} sx={{ display: { md: 'none' } }}>
                            <MenuIcon />
                        </IconButton>
                        <Box
                            component="img"
                            src="/assets/logo.png"
                            alt="logo"
                            sx={{ height: 36, cursor: 'pointer' }}
                            onClick={() => navigate('/admin/dashboard')}
                        />
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                                bgcolor: '#f8f9fc',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                border: '1px solid #edf0f7'
                            }}
                        >
                            <Search fontSize="small" sx={{ color: '#9da4ae', mr: 1 }} />
                            <InputBase
                                placeholder="Buscar..."
                                sx={{
                                    fontSize: 14,
                                    '& input::placeholder': {
                                        color: '#9da4ae',
                                        opacity: 1
                                    }
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            aria-label="toggle theme"
                            onClick={toggleTheme}
                            sx={{
                                color: '#9da4ae',
                                '&:hover': { color: '#1a1f36' }
                            }}
                        >
                            {mode === 'dark' ? <DarkMode /> : <LightMode />}
                        </IconButton>

                        <IconButton
                            aria-label="notificaciones"
                            sx={{
                                color: '#9da4ae',
                                '&:hover': { color: '#1a1f36' }
                            }}
                        >
                            <Badge
                                badgeContent={3}
                                color="error"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#4318FF',
                                        color: 'white'
                                    }
                                }}
                            >
                                <Notifications />
                            </Badge>
                        </IconButton>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                cursor: 'pointer',
                                padding: '6px 12px',
                                borderRadius: 2,
                                '&:hover': { bgcolor: '#f8f9fc' }
                            }}
                            onClick={() => navigate('/perfil')}
                        >
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: '#4318FF'
                                }}
                            >
                                {user.name ? user.name[0] : 'A'}
                            </Avatar>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

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
                        borderRight: '1px solid #f0f0f0',
                        borderTopRightRadius: 0,
                        paddingX: 2
                    },
                    display: { xs: 'none', md: 'block' }
                }}
            >
                <Toolbar sx={{ minHeight: '70px', display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#1a1f36',
                            fontSize: '1.25rem'
                        }}
                    >
                        Business
                    </Typography>
                </Toolbar>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menu.map((m) => (
                            <ListItemButton
                                key={m.label}
                                onClick={() => navigate(m.path)}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    color: '#636e72',
                                    '&:hover': {
                                        bgcolor: '#f8f9fc',
                                        color: '#4318FF',
                                        '& .MuiListItemIcon-root': {
                                            color: '#4318FF'
                                        }
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: '#4318FF',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: '#4318FF',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'white'
                                        }
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: '#636e72',
                                        minWidth: 40
                                    }}
                                >
                                    {m.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={m.label}
                                    primaryTypographyProps={{
                                        fontSize: '0.875rem',
                                        fontWeight: 500
                                    }}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ p: 2, mt: 2 }}>
                    <ListItemButton
                        onClick={() => { logout(); navigate('/') }}
                        sx={{
                            borderRadius: 2,
                            color: '#636e72',
                            '&:hover': {
                                bgcolor: '#f8f9fc',
                                color: '#4318FF',
                                '& .MuiListItemIcon-root': {
                                    color: '#4318FF'
                                }
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: '#636e72', minWidth: 40 }}>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText
                            primary="Logout"
                            primaryTypographyProps={{
                                fontSize: '0.875rem',
                                fontWeight: 500
                            }}
                        />
                    </ListItemButton>
                </Box>
            </Drawer>

            {/* Mobile temporary drawer */}
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
                        paddingX: 2
                    }
                }}
            >
                <Toolbar sx={{ minHeight: '70px', display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#1a1f36',
                            fontSize: '1.25rem'
                        }}
                    >
                        Business
                    </Typography>
                </Toolbar>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menu.map((m) => (
                            <ListItemButton
                                key={m.label}
                                onClick={() => { navigate(m.path); setMobileOpen(false) }}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    color: '#636e72',
                                    '&:hover': {
                                        bgcolor: '#f8f9fc',
                                        color: '#4318FF',
                                        '& .MuiListItemIcon-root': {
                                            color: '#4318FF'
                                        }
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: '#4318FF',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: '#4318FF',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'white'
                                        }
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: '#636e72',
                                        minWidth: 40
                                    }}
                                >
                                    {m.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={m.label}
                                    primaryTypographyProps={{
                                        fontSize: '0.875rem',
                                        fontWeight: 500
                                    }}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    bgcolor: '#f8f9fc',
                    minHeight: '100vh'
                }}
            >
                <Toolbar sx={{ minHeight: '70px !important' }} />
                <Box sx={{
                    borderRadius: 3,
                    bgcolor: 'white',
                    p: 3,
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.03)'
                }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}
