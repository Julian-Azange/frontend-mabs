import { useState } from 'react';
import { Container, Grid, Box, Typography, Button, Divider, Rating, IconButton, Chip, useTheme } from '@mui/material';
import { ShoppingCart, FavoriteBorder, Add, Remove, Check } from '@mui/icons-material';
import ProductCard from '../../components/common/ProductCard';
import { useCart } from '../../../app/providers/CartProvider';
const product = {
    id: 1,
    name: 'Base Fluida Hidratante',
    brand: 'Mabs by Gabs',
    price: 39.99,
    rating: 4.5,
    reviews: 128,
    description: 'Una base de maquillaje ligera y de larga duración que proporciona una cobertura media y un acabado natural y radiante. Formulada con ácido hialurónico para mantener la piel hidratada durante todo el día.',
    features: [
        'Acabado natural y radiante',
        'Larga duración (12 horas)',
        'Fórmula hidratante con ácido hialurónico',
        'No comedogénico y apto para piel sensible',
        'Vegano y libre de crueldad animal'
    ],
    images: [
        '/assets/images/products/product3.png',
        '/assets/images/products/product1.png',
        '/assets/images/products/product2.png',
        '/assets/images/products/product5.png',
    ],
    colors: [
        { name: 'Natural Beige', pantone: '#E6A4B4', code: '#D1A78B' },
        { name: 'Ivory', pantone: '#F5D7DB', code: '#F3D4C4' },
        { name: 'Golden Sand', pantone: '#FFD180', code: '#E0B99A' },
        { name: 'Deep Mocha', pantone: '#A1887F', code: '#A17A64' },
    ],
};

const relatedProducts = [
    { id: 2, name: 'Labial Hidratante', price: 14.99, image: '/assets/images/products/product2.png', color: '#C43670' },
    { id: 4, name: 'Set de Brochas Premium', price: 49.99, image: '/assets/images/products/product4.png' },
    { id: 1, name: 'Paleta de Sombras Pro', price: 29.99, image: '/assets/images/products/product1.png', color: '#E6A4B4' },
];

export default function DetalleProducto() {

    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const theme = useTheme();

    const handleAddToCart = () => {
        const productToAdd = {
            ...product,
            color: selectedColor,
            image: selectedImage,
        };
        addToCart(productToAdd, quantity);
        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: theme.palette.background.default }}>
            <Container maxWidth="xl">

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: { xs: 4, md: 8 },
                        backgroundColor: theme.palette.background.paper,
                        p: { xs: 2, md: 4 },
                        borderRadius: 1,
                    }}
                >

                    <Box>
                        <Box sx={{
                            width: '100%',
                            height: { xs: 300, sm: 400, md: 500 },
                            borderRadius: 1,
                            overflow: 'hidden',
                            mb: 2,
                            backgroundColor: 'grey.100'
                        }}>
                            <Box
                                component="img"
                                src={selectedImage}
                                alt={product.name}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    transition: 'transform 0.4s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            />
                        </Box>
                        <Grid container spacing={1}>
                            {product.images.map((img, index) => (
                                <Grid item xs={3} key={index}>
                                    <Box
                                        component="img"
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        onClick={() => setSelectedImage(img)}
                                        sx={{
                                            width: '100%',
                                            height: { xs: 60, md: 90 },
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                            cursor: 'pointer',
                                            border: selectedImage === img ? '2px solid' : '2px solid transparent',
                                            borderColor: selectedImage === img ? 'primary.main' : 'transparent',
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>


                    <Box>
                        <Chip label={product.brand} size="small" sx={{ mb: 1 }} />
                        <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
                            {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Rating value={product.rating} precision={0.5} readOnly />
                            <Typography variant="body2" color="text.secondary">({product.reviews} reseñas)</Typography>
                        </Box>
                        <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                            ${product.price.toFixed(2)}
                        </Typography>

                        <Divider sx={{ my: 2 }} />


                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                                Tono: <Typography component="span" color="text.secondary">{selectedColor.name} - {selectedColor.pantone}</Typography>
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {product.colors.map((color) => (
                                    <Box
                                        key={color.pantone}
                                        onClick={() => setSelectedColor(color)}
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            backgroundColor: color.code,
                                            cursor: 'pointer',
                                            border: '2px solid',
                                            borderColor: selectedColor.pantone === color.pantone ? 'primary.main' : 'grey.300',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {selectedColor.pantone === color.pantone && <Check sx={{ color: 'white', fontSize: 16 }} />}
                                    </Box>
                                ))}
                            </Box>
                        </Box>


                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {product.description}
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                            {product.features.map((feature, i) => (
                                <Typography component="li" variant="body2" key={i} sx={{ mb: 0.5 }}>{feature}</Typography>
                            ))}
                        </Box>

                        <Divider sx={{ my: 2 }} />


                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
                                <IconButton onClick={() => setQuantity(q => Math.max(1, q - 1))} size="small"><Remove /></IconButton>
                                <Typography sx={{ px: 2, fontWeight: 600 }}>{quantity}</Typography>
                                <IconButton onClick={() => setQuantity(q => q + 1)} size="small"><Add /></IconButton>
                            </Box>
                            <Button
                                variant="contained"
                                startIcon={isAdded ? <Check /> : <ShoppingCart />}
                                size="large"
                                sx={{
                                    flexGrow: 1,
                                    py: 1.5,
                                    backgroundColor: isAdded ? 'success.main' : 'primary.main',
                                    '&:hover': {
                                        backgroundColor: isAdded ? 'success.dark' : 'primary.dark',
                                    }
                                }}
                                onClick={handleAddToCart}
                                disabled={isAdded}
                            >
                                {isAdded ? '¡Agregado!' : 'Agregar al Carrito'}
                            </Button>
                            <IconButton sx={{ border: '1px solid', borderColor: 'grey.300' }}>
                                <FavoriteBorder />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>


                <Box sx={{ mt: { xs: 6, md: 12 } }}>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>También te podría gustar</Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)'
                            },
                            gap: 3,
                        }}
                    >
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
