import { Container, Grid, Box, Typography, Button, IconButton, Paper } from '@mui/material'
import { Delete, Remove, Add } from '@mui/icons-material'

const cartItems = [
    {
        id: 1,
        name: 'Paleta de Sombras Pro',
        price: 29.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200',
    },
    {
        id: 2,
        name: 'Labial Hidratante',
        price: 14.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200',
    },
    {
        id: 3,
        name: 'Base de Maquillaje',
        price: 34.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200',
    },
]

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const shipping = 5.99
const total = subtotal + shipping

export default function Carrito() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
                Tu Carrito de Compras
            </Typography>

            <Grid container spacing={3}>
                {/* Cart Items */}
                <Grid item xs={12} md={8}>
                    {cartItems.map((item) => (
                        <Paper key={item.id} sx={{ p: 3, mb: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={4} sm={3}>
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt={item.name}
                                        sx={{
                                            width: '100%',
                                            borderRadius: 2,
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={8} sm={9}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {item.name}
                                        </Typography>
                                        <IconButton size="small" color="error">
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        ${item.price} c/u
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton size="small">
                                                <Remove />
                                            </IconButton>
                                            <Typography variant="body1" sx={{ minWidth: 40, textAlign: 'center' }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton size="small">
                                                <Add />
                                            </IconButton>
                                        </Box>
                                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Grid>

                {/* Order Summary */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                            Resumen del Pedido
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">Subtotal:</Typography>
                            <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">Envío:</Typography>
                            <Typography variant="body2">${shipping.toFixed(2)}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                Descuento:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                -$0.00
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                borderTop: '2px solid',
                                borderColor: 'divider',
                                pt: 2,
                                mb: 3,
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Total:
                                </Typography>
                                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
                                    ${total.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{ py: 1.5, mb: 2 }}
                        >
                            Proceder al Checkout
                        </Button>

                        <Button variant="outlined" fullWidth size="large">
                            Continuar Comprando
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
