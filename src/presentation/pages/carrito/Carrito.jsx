import { Container, Grid, Box, Typography, Button, IconButton, Paper, Alert } from '@mui/material'
import { Delete, Remove, Add, ArrowBack } from '@mui/icons-material'
import { useCart } from '../../../app/providers/CartProvider'
import { useAuth } from '../../../app/providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const shipping = 5.99 // Temporal hasta implementar API

export default function Carrito() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()
    const subtotal = cartTotal
    const total = subtotal + (cartItems.length > 0 ? shipping : 0)

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) return
        updateQuantity(item.id, item.color?.pantone, newQuantity)
        toast.success('Cantidad actualizada')
    }

    const handleRemoveItem = async (item) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Deseas eliminar este producto del carrito?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        })

        if (result.isConfirmed) {
            removeFromCart(item.id, item.color?.pantone)
            toast.success('Producto eliminado del carrito')
        }
    }

    const handleProceedToCheckout = async () => {
        if (!user) {
            const result = await Swal.fire({
                title: 'Iniciar Sesión',
                text: 'Necesitas iniciar sesión para continuar con la compra',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ir a Login',
                cancelButtonText: 'Cancelar'
            })

            if (result.isConfirmed) {
                navigate('/login', { state: { returnUrl: '/carrito' } })
            }
            return
        }

        navigate('/checkout')
    }

    const handleContinueShopping = () => {
        navigate('/productos')
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <IconButton onClick={handleContinueShopping} sx={{ color: 'text.primary' }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Carrito de Compras
                </Typography>
            </Box>

            {cartItems.length === 0 ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                    Tu carrito está vacío. ¡Agrega algunos productos!
                </Alert>
            ) : (
                <Grid container spacing={3}>
                    {/* Cart Items - More compact design */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ overflow: 'hidden' }}>
                            {cartItems.map((item) => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                        '&:last-child': { borderBottom: 'none' }
                                    }}
                                >
                                    {/* Product Image */}
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt={item.name}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            objectFit: 'cover',
                                            borderRadius: 1
                                        }}
                                    />

                                    {/* Product Info */}
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {item.name}
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            mt: 1
                                        }}>
                                            {/* Quantity Controls */}
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 1,
                                                px: 0.5
                                            }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                                >
                                                    <Remove fontSize="small" />
                                                </IconButton>
                                                <Typography sx={{ px: 2, minWidth: 30, textAlign: 'center' }}>
                                                    {item.quantity}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                                >
                                                    <Add fontSize="small" />
                                                </IconButton>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                ${item.price} c/u
                                            </Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, ml: 'auto' }}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleRemoveItem(item)}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Paper>
                    </Grid>

                    {/* Order Summary - Simplified */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                                Resumen
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                mb: 3
                            }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Subtotal</Typography>
                                    <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Envío</Typography>
                                    <Typography variant="body2">
                                        {cartItems.length > 0 ? `$${shipping.toFixed(2)}` : 'Gratis'}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    borderTop: '2px solid',
                                    borderColor: 'divider',
                                    pt: 2
                                }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        Total
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        ${total.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={cartItems.length === 0}
                                onClick={handleProceedToCheckout}
                                sx={{ mb: 2 }}
                            >
                                Proceder al Pago
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={handleContinueShopping}
                            >
                                Continuar Comprando
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Container>
    )
}
