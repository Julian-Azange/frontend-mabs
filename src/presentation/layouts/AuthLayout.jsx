import { Outlet, useNavigate } from 'react-router-dom'
import { Box, useTheme, alpha, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

// Imagen de fondo
const BACKGROUND_IMAGE_URL = '/assets/images/banner.jpg';

export default function AuthLayout() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                overflow: 'hidden', // Para contener el fondo
            }}
        >
            {/* Botón para volver al Home */}
            <Button
                onClick={() => navigate('/')}
                startIcon={<ArrowBack />}
                sx={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    zIndex: 4, // Debe estar por encima de todo
                    color: theme.palette.common.white,
                    textTransform: 'none',
                    fontWeight: 600,
                    backgroundColor: alpha(theme.palette.common.black, 0.2),
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.common.black, 0.4),
                    }
                }}
            >
                Regresar
            </Button>

            {/* Fondo con imagen desenfocada */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(8px)', // Efecto de desenfoque
                    transform: 'scale(1.1)', // Evita bordes vacíos por el blur
                    zIndex: 1,
                }}
            />
            {/* Capa de color rosado */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: alpha(theme.palette.primary.main, 0.3), // Tinte rosado semitransparente
                    zIndex: 2,
                }}
            />

            {/* Contenido del formulario */}
            <Box sx={{ zIndex: 3, position: 'relative' }}>
                <Outlet />
            </Box>
        </Box>
    )
}