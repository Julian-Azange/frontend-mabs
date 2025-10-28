import { Container, Typography, Grid, Box, Chip } from '@mui/material'
import ProductCard from '../../components/common/ProductCard'

const allProducts = [
    {
        id: 1,
        name: 'Paleta de Sombras Pro',
        description: 'Paleta de 12 tonos profesionales con acabado mate y brillo',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400',
        category: 'maquillaje',
    },
    {
        id: 2,
        name: 'Labial Hidratante',
        description: 'Labial de larga duración con vitamina E',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400',
        category: 'maquillaje',
    },
    {
        id: 3,
        name: 'Shampoo Reparador',
        description: 'Shampoo con queratina para cabello dañado',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1606503153255-59d8b8c59620?w=400',
        category: 'cabello',
    },
    {
        id: 4,
        name: 'Acondicionador Intensivo',
        description: 'Acondicionador de hidratación profunda',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1607893019882-a11c5b4e99cf?w=400',
        category: 'cabello',
    },
    {
        id: 5,
        name: 'Esmalte Secado Rápido',
        description: 'Esmalte con tecnología de secado ultrarrápido',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
        category: 'uñas',
    },
    {
        id: 6,
        name: 'Kit Manicure Completo',
        description: 'Kit con 15 tonos de esmaltes y accesorios',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1631214418795-d3979b2fb506?w=400',
        category: 'uñas',
    },
    {
        id: 7,
        name: 'Crema Facial Hidratante',
        description: 'Crema con ácido hialurónico y vitamina C',
        price: 32.99,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
        category: 'cuidado-facial',
    },
    {
        id: 8,
        name: 'Serum Anti-Edad',
        description: 'Serum con retinol y péptidos',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400',
        category: 'cuidado-facial',
    },
]

export default function Productos() {
    const categories = ['Todos', 'Maquillaje', 'Cabello', 'Uñas', 'Cuidado Facial']

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                Nuestros Productos
            </Typography>

            <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        clickable
                        color="primary"
                        variant={category === 'Todos' ? 'filled' : 'outlined'}
                        sx={{
                            px: 1,
                            fontWeight: category === 'Todos' ? 600 : 400,
                        }}
                    />
                ))}
            </Box>

            <Grid container spacing={3}>
                {allProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
