import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    Typography,
    IconButton,
    Container,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    alpha,
    Badge,
    Menu,
    MenuItem,
} from "@mui/material";
import {
    Menu as MenuIcon,
    ShoppingCartOutlined,
    Person,
    Close,
    DeleteOutline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider"; // Hook de autenticación
import { useCart } from "../../../app/providers/CartProvider"; // Hook del carrito

// Ruta del logo
const LOGO_URL = "/assets/logo.png";

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { cartItems, totalItems, removeFromCart, cartTotal } = useCart();

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [cartMenuAnchor, setCartMenuAnchor] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleCartMenuOpen = (event) => {
        if (isMobile) {
            navigate('/carrito');
        } else {
            setCartMenuAnchor(event.currentTarget);
        }
    };

    const handleCartMenuClose = () => {
        setCartMenuAnchor(null);
    };

    const menuItems = [
        { label: "Inicio", path: "/" },
        { label: "Sobre Nosotros", path: "/sobre-nosotros" },
        { label: "Productos", path: "/productos" },
        { label: "Modelo de Negocio", path: "/modelo-negocio" },
        { label: "Eventos", path: "/eventos" },
        { label: "Contacto", path: "/contacto" },
    ];

    const renderCartMenu = (
        <Menu
            anchorEl={cartMenuAnchor}
            open={Boolean(cartMenuAnchor)}
            onClose={handleCartMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: { 
                    width: 380, 
                    mt: 1.5,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                    borderRadius: 2,
                }
            }}
        >
            {cartItems.length === 0 ? (
                <MenuItem disabled>
                    <ListItemText primary="Tu carrito está vacío" />
                </MenuItem>
            ) : (
                [
                    ...cartItems.map((item) => (
                        <MenuItem key={`${item.id}-${item.color?.pantone}`} sx={{ my: 1 }}>
                            <Box component="img" src={item.image} sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1, mr: 2 }} />
                            <ListItemText
                                primary={item.name}
                                secondary={`Cantidad: ${item.quantity} - ${item.color?.name || ''}`}
                                primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
                            />
                            <Typography sx={{ mx: 2, fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</Typography>
                            <IconButton size="small" onClick={() => removeFromCart(item.id, item.color?.pantone)}>
                                <DeleteOutline fontSize="small" />
                            </IconButton>
                        </MenuItem>
                    )),
                    <Divider key="divider"/>,
                    <Box key="total" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight={600}>Total:</Typography>
                        <Typography variant="h6" fontWeight={700}>${cartTotal.toFixed(2)}</Typography>
                    </Box>,
                    <Box key="actions" sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                        <Button variant="outlined" fullWidth onClick={() => { navigate('/carrito'); handleCartMenuClose(); }}>Ver Carrito</Button>
                        <Button variant="contained" fullWidth onClick={() => { navigate('/checkout'); handleCartMenuClose(); }}>Finalizar Compra</Button>
                    </Box>
                ]
            )}
        </Menu>
    );

    const renderAuthButtons = (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={handleCartMenuOpen}>
                <Badge badgeContent={totalItems} color="primary">
                    <ShoppingCartOutlined />
                </Badge>
            </IconButton>
            {user ? (
                <Button variant="outlined" startIcon={<Person />} onClick={logout}>Cerrar Sesión</Button>
            ) : (
                <IconButton onClick={() => navigate("/login")} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, padding: "8px" }}>
                    <Person />
                </IconButton>
            )}
        </Box>
    );

    return (
        <>
            <Box sx={{ height: { xs: '70px', md: '80px' } }} />
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: isScrolled ? "0 1px 10px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.3s ease-in-out",
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ minHeight: { xs: 70, md: 80 }, py: { xs: 1, md: 0 } }}>
                        <Box component="img" src={LOGO_URL} alt="Mabs Logo" sx={{ height: { xs: 30, md: 40 }, cursor: "pointer" }} onClick={() => navigate("/")} />
                        
                        {!isMobile && (
                            <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
                                {menuItems.map((item) => (
                                    <Button key={item.label} onClick={() => navigate(item.path)} sx={{ color: 'text.primary', fontWeight: 500, textTransform: 'none', px: 2 }}>
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>
                        )}

                        <Box sx={{ flexGrow: isMobile ? 1 : 0, display: 'flex', justifyContent: 'flex-end' }}>
                            {isMobile ? (
                                <>
                                    <IconButton onClick={() => navigate('/carrito')}>
                                        <Badge badgeContent={totalItems} color="primary">
                                            <ShoppingCartOutlined />
                                        </Badge>
                                    </IconButton>
                                    <IconButton onClick={() => setMobileDrawerOpen(true)}>
                                        <MenuIcon />
                                    </IconButton>
                                </>
                            ) : renderAuthButtons}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {renderCartMenu}

            <Drawer anchor="right" open={mobileDrawerOpen} onClose={() => setMobileDrawerOpen(false)} PaperProps={{ sx: { width: 280 } }}>
                <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" fontWeight={700}>Menú</Typography>
                    <IconButton onClick={() => setMobileDrawerOpen(false)}><Close /></IconButton>
                </Box>
                <Divider />
                <List>
                    {menuItems.map((item) => (
                        <ListItem button key={item.label} onClick={() => { navigate(item.path); setMobileDrawerOpen(false); }}>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Box sx={{ p: 2 }}>
                    {user ? (
                        <Button variant="outlined" fullWidth onClick={() => { logout(); setMobileDrawerOpen(false); }}>Cerrar Sesión</Button>
                    ) : (
                        <Button variant="contained" fullWidth onClick={() => { navigate('/login'); setMobileDrawerOpen(false); }}>Ingresar</Button>
                    )}
                </Box>
            </Drawer>
        </>
    );
}