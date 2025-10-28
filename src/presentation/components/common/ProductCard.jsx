import { Card, CardMedia, Typography, Box, Chip, Button, useTheme, Fade, alpha } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product, onAddToCart }) {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [isSwatchHovered, setIsSwatchHovered] = useState(false);
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/producto/${product.id}`)
    }

    const handleAddToCart = (e) => {
        e.stopPropagation()
        if (typeof onAddToCart === 'function') {
            onAddToCart(product)
        }
    }

    const handleQuickView = (e) => {
        e.stopPropagation()
        console.log('Quick view:', product.id)
        // Navegar a la página de detalle del producto
        navigate(`/producto/${product.id}`)
    }

    return (
        <Card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleProductClick}
            sx={{
                position: 'relative',
                cursor: 'pointer',
                height: '480px', // Altura fija para todas las tarjetas
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'visible', // Permitir que el tooltip se vea fuera de la card
                borderRadius: 'none',
                transition: 'all 0.3s ease',
                boxShadow: 'none',
                border: 'none',
                backgroundColor: 'white',
            }}
        >
            {/* Image Container */}
            <Box sx={{
                position: 'relative',
                overflow: 'hidden',
                height: '80%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F8F8F8',
            }}>
                <CardMedia
                    className="product-image"
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '80%',
                        maxHeight: '80%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        transition: 'transform 0.5s ease',
                        display: 'block',
                    }}
                />

                {/* Discount Badge */}
                {product.discount && (
                    <Chip
                        label={`${product.discount}% off`}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            zIndex: 2,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            backgroundColor: '#E0E0E0',
                            color: '#333333',
                            height: 24,
                        }}
                    />
                )}

                {/* Color Swatch with Interactive Tooltip */}
                {product.color && (
                    <Box
                        onMouseEnter={() => setIsSwatchHovered(true)}
                        onMouseLeave={() => setIsSwatchHovered(false)}
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            zIndex: 3, // zIndex mayor para estar sobre otros elementos
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Fade in={isSwatchHovered}>
                            <Typography
                                sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: theme.palette.common.white,
                                    backgroundColor: alpha(theme.palette.common.black, 0.7),
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    mr: 1, // Margen a la derecha de la etiqueta
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {product.color}
                            </Typography>
                        </Fade>
                        <Box
                            sx={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                backgroundColor: product.color,
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                cursor: 'pointer',
                            }}
                        />
                    </Box>
                )}

                {/* Hover Buttons */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        right: 12,
                        display: 'flex',
                        gap: 1,
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        fullWidth
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            py: 0.8,
                            backgroundColor: '#333333',
                            color: 'white',
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: '#000000',
                            },
                        }}
                    >
                        Agregar al Carrito
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleQuickView}
                        fullWidth
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            py: 0.8,
                            borderColor: '#333333',
                            color: '#333333',
                            backgroundColor: 'white',
                            borderRadius: 1,
                            '&:hover': {
                                borderColor: '#000000',
                                backgroundColor: '#F5F5F5',
                            },
                        }}
                    >
                        Ver Detalles
                    </Button>
                </Box>
            </Box>

            {/* Product Info Section - Centered */}
            <Box
                sx={{
                    height: '40%',
                    backgroundColor: '#F8F8F8',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 2.5,
                }}
            >
                {/* Product Category */}
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        color: '#888888',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        mb: 0.5,
                    }}
                >
                    {product.category || 'SPEAKERS'}
                </Typography>

                {/* Product Name */}
                <Typography
                    variant="h6"
                    title={product.name} // Tooltip para ver el nombre completo
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#333333',
                        mb: 1,
                        lineHeight: 1.3,
                        width: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis', // Añade ... si el texto es muy largo
                    }}
                >
                    {product.name}
                </Typography>

                {/* Price Section */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: '#333333',
                        fontSize: '1rem',
                    }}
                >
                    ${product.price}
                </Typography>

                {product.originalPrice && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#999999',
                            textDecoration: 'line-through',
                            fontSize: '0.85rem',
                            mt: 0.5,
                        }}
                    >
                        ${product.originalPrice}
                    </Typography>
                )}
            </Box>
        </Card>
    )
}
