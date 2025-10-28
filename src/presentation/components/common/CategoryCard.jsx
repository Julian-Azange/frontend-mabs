import { Card, CardMedia, Typography, Box, IconButton, styled } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

// Componente estilizado para el botón de flecha que se mueve en hover
const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: 'white',
    color: theme.palette.text.primary,
    border: '1px solid #ccc',
    width: 30,
    height: 30,
    borderRadius: '50%',
    padding: 0,
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.primary.main,
        transform: 'scale(1.1)',
    },
}));

export default function CategoryCard({ category }) {
    const navigate = useNavigate()

    return (
        <Card
            onClick={() => navigate(`/productos?categoria=${category.id}`)}
            sx={{
                position: 'relative',
                cursor: 'pointer',
                height: '300px',
                // width: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 'none',
                boxShadow: 'none',
                border: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                },
                transition: 'transform 0.2s ease-in-out',
                flex: '1 1 auto',
            }}
        >

            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: '380px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CardMedia
                    component="img"
                    image={category.image}
                    alt={category.name}
                    sx={{
                        width: '100%',
                        height: '100%',
                        maxWidth: '80%',
                        maxHeight: '80%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        transition: 'transform 0.5s ease',
                        display: 'block',
                    }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        p: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                                lineHeight: 1.2,
                            }}
                        >
                            {category.name}
                        </Typography>

                        <StyledIconButton>
                            <ArrowForward sx={{ fontSize: 16 }} />
                        </StyledIconButton>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}