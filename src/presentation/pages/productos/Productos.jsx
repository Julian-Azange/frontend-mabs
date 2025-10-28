import { Container, Typography, Grid, Box, Chip, FormControl, InputLabel, Select, MenuItem, Pagination, Stack } from '@mui/material'
import ProductCard from '../../components/common/ProductCard'
import { useState, useMemo } from 'react'
import { useCart } from '../../../app/providers/CartProvider'

const allProducts = [
    {
        id: 1,
        name: 'Paleta de Sombras Pro',
        description: 'Paleta de 12 tonos profesionales con acabado mate y brillo',
        price: 29.99,
        image: '/assets/images/products/product1.png',
        category: 'maquillaje',
    },
    {
        id: 2,
        name: 'Labial Hidratante',
        description: 'Labial de larga duración con vitamina E',
        price: 14.99,
        image: '/assets/images/products/product2.png',
        category: 'maquillaje',
    },
    {
        id: 3,
        name: 'Shampoo Reparador',
        description: 'Shampoo con queratina para cabello dañado',
        price: 18.99,
        image: '/assets/images/products/product3.png',
        category: 'cabello',
    },
    {
        id: 4,
        name: 'Acondicionador Intensivo',
        description: 'Acondicionador de hidratación profunda',
        price: 16.99,
        image: '/assets/images/products/product4.png',
        category: 'cabello',
    },
    {
        id: 5,
        name: 'Esmalte Secado Rápido',
        description: 'Esmalte con tecnología de secado ultrarrápido',
        price: 8.99,
        image: '/assets/images/products/product5.png',
        category: 'uñas',
    },
    {
        id: 6,
        name: 'Kit Manicure Completo',
        description: 'Kit con 15 tonos de esmaltes y accesorios',
        price: 39.99,
        image: '/assets/images/products/product1.png',
        category: 'uñas',
    },
    {
        id: 7,
        name: 'Crema Facial Hidratante',
        description: 'Crema con ácido hialurónico y vitamina C',
        price: 32.99,
        image: '/assets/images/products/product2.png',
        category: 'cuidado-facial',
    },
    {
        id: 8,
        name: 'Serum Anti-Edad',
        description: 'Serum con retinol y péptidos',
        price: 49.99,
        image: '/assets/images/products/product4.png',
        category: 'cuidado-facial',
    },
    // Adding more products for pagination demo
    ...Array.from({ length: 16 }, (_, i) => ({
        id: i + 9,
        name: `Producto ${i + 9}`,
        description: `Descripción del producto ${i + 9}`,
        price: Math.floor(Math.random() * 50) + 10,
        image: '/assets/images/products/product5.png',
        category: ['maquillaje', 'cabello', 'uñas', 'cuidado-facial'][Math.floor(Math.random() * 4)],
    })),
]

export default function Productos() {
    const { addToCart } = useCart();
    const categories = ['Todos', 'Maquillaje', 'Cabello', 'Uñas', 'Cuidado Facial']
    const [selectedCategory, setSelectedCategory] = useState('Todos')
    const [sortBy, setSortBy] = useState('default')
    const [page, setPage] = useState(1)
    const productsPerPage = 12

    // Filtrar y ordenar productos
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...allProducts]

        // Filtrar por categoría
        if (selectedCategory !== 'Todos') {
            filtered = filtered.filter(product =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            )
        }

        // Ordenar productos
        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price)
                break
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name))
                break
            default:
                break
        }

        return filtered
    }, [selectedCategory, sortBy])

    // Calcular productos para la página actual
    const currentProducts = useMemo(() => {
        const startIndex = (page - 1) * productsPerPage
        return filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage)
    }, [page, filteredAndSortedProducts])

    // Calcular total de páginas
    const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage)

    // Manejadores de eventos
    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
        setPage(1) // Reset page when changing category
    }

    const handleSortChange = (event) => {
        setSortBy(event.target.value)
        setPage(1) // Reset page when changing sort
    }

    const handlePageChange = (event, value) => {
        setPage(value)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleAddToCart = (product) => {
        addToCart(product, 1) // Agregar 1 unidad por defecto
    }

    return (
        <Container maxWidth="xl" sx={{ py: 8 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                Nuestros Productos
            </Typography>

            <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {categories.map((category) => (
                        <Chip
                            key={category}
                            label={category}
                            clickable
                            color="primary"
                            variant={category === selectedCategory ? 'filled' : 'outlined'}
                            onClick={() => handleCategoryChange(category)}
                            sx={{
                                px: 1,
                                fontWeight: category === selectedCategory ? 600 : 400,
                            }}
                        />
                    ))}
                </Box>

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Ordenar por</InputLabel>
                    <Select
                        value={sortBy}
                        label="Ordenar por"
                        onChange={handleSortChange}
                        size="small"
                    >
                        <MenuItem value="default">Relevancia</MenuItem>
                        <MenuItem value="price-asc">Menor precio</MenuItem>
                        <MenuItem value="price-desc">Mayor precio</MenuItem>
                        <MenuItem value="name-asc">A-Z</MenuItem>
                        <MenuItem value="name-desc">Z-A</MenuItem>
                    </Select>
                </FormControl>
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
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => handleAddToCart(product)}
                    />
                ))}
            </Box>

            {totalPages > 1 && (
                <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                    />
                </Stack>
            )}
        </Container>
    )
}
