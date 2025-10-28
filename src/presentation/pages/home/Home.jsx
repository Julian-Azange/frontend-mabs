import { Container, Typography, Box, IconButton } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import HeroBanner from '../../components/hero/HeroBanner'
import CategoryCard from '../../components/common/CategoryCard'
import ProductCard from '../../components/common/ProductCard'
import AffiliateBanner from '../../components/affiliate/AffiliateBanner'
import { useState } from 'react'
import { useCart } from '../../../app/providers/CartProvider'
import { toast } from 'react-toastify'
import AboutUs from '../../components/about/AboutUs'

// Categorías de belleza y maquillaje
const categories = [
    {
        id: 1,
        name: 'Maquillaje',
        image: '/assets/images/products/product1.png',
    },
    {
        id: 2,
        name: 'Labiales',
        image: '/assets/images/products/product2.png',
    },
    {
        id: 3,
        name: 'Brochas',
        image: '/assets/images/products/product3.png',
    },
    {
        id: 4,
        name: 'Base & Corrector',
        image: '/assets/images/products/product4.png',
    },
    {
        id: 5,
        name: 'Cuidado Facial',
        image: '/assets/images/products/product5.png',
    },
]

// Productos Flash Deals
const flashDeals = [
    {
        id: 1,
        name: 'Paleta de Sombras Pro',
        description: 'Paleta de 12 tonos profesionales con acabado mate y brillo',
        price: 29.99,
        originalPrice: 39.99,
        discount: 25,
        image: '/assets/images/products/product1.png',
        category: 'MAQUILLAJE',
        color: '#E6A4B4', // Color de ejemplo
    },
    {
        id: 2,
        name: 'Labial Hidratante',
        description: 'Labial de larga duración con vitamina E',
        price: 14.99,
        originalPrice: 19.99,
        discount: 15,
        image: '/assets/images/products/product2.png',
        category: 'LABIALES',
        color: '#C43670', // Color de ejemplo
    },
    {
        id: 3,
        name: 'Base de Maquillaje HD',
        description: 'Base líquida de cobertura completa',
        price: 34.99,
        originalPrice: 44.99,
        discount: 22,
        image: '/assets/images/products/product3.png',
        category: 'BASE',
        color: '#F5D7DB', // Color de ejemplo
    },
    {
        id: 4,
        name: 'Set de Brochas Premium',
        description: 'Set de 8 brochas sintéticas de lujo',
        price: 49.99,
        originalPrice: 79.99,
        discount: 38,
        image: '/assets/images/products/product4.png',
        category: 'ACCESORIOS',
        color: '#fd304bff', // Color de ejemplo
        // Sin color para mostrar que es opcional
    }
]

export default function Home() {
    const [flashDealIndex, setFlashDealIndex] = useState(0)
    const productsPerView = 4

    const nextFlashDeals = () => {
        const maxIndex = Math.ceil(flashDeals.length / productsPerView) - 1
        setFlashDealIndex(prev => prev === maxIndex ? 0 : prev + 1)
    }

    const prevFlashDeals = () => {
        const maxIndex = Math.ceil(flashDeals.length / productsPerView) - 1
        setFlashDealIndex(prev => prev === 0 ? maxIndex : prev - 1)
    }

    const visibleFlashDeals = flashDeals.slice(
        flashDealIndex * productsPerView,
        (flashDealIndex + 1) * productsPerView
    )

    const { addToCart } = useCart()

    const handleAddToCart = (product) => {
        addToCart(product, 1)
        toast.success(`${product.name} agregado al carrito`)
    }

    return (
        <>
            <HeroBanner />

            <Container maxWidth="xl" sx={{ py: 8 }}>
                <Box sx={{ mb: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                fontSize: { xs: '1.8rem', md: '2.2rem' }
                            }}
                        >
                            Productos Destacados
                        </Typography>

                        {/* Navigation Arrows */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                onClick={prevFlashDeals}
                                sx={{
                                    backgroundColor: 'background.paper',
                                    border: '1px solid #e0e0e0',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    }
                                }}
                            >
                                <ArrowBack />
                            </IconButton>
                            <IconButton
                                onClick={nextFlashDeals}
                                sx={{
                                    backgroundColor: 'background.paper',
                                    border: '1px solid #e0e0e0',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    }
                                }}
                            >
                                <ArrowForward />
                            </IconButton>
                        </Box>
                    </Box>

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
                        {visibleFlashDeals.map((product) => (
                            <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
                        ))}
                    </Box>
                </Box>

                <Box sx={{ mb: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                fontSize: { xs: '1.8rem', md: '2.2rem' }
                            }}
                        >
                            Soluciones a tus necesidades
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                            },
                            gap: 3,
                        }}
                    >
                        <CategoryCard category={categories[0]} />
                        <CategoryCard category={categories[1]} />
                        <CategoryCard category={categories[2]} />
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            },
                            gap: 3,
                            mt: 3,
                        }}
                    >
                        <CategoryCard category={categories[3]} />
                        <CategoryCard category={categories[4]} />
                    </Box>
                </Box>
            </Container>

            <AboutUs />

            <AffiliateBanner />
        </>
    )
}
