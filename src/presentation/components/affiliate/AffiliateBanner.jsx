import React from "react";
import {
    Box,
    Typography,
    Button,
    useTheme,
    Chip,
    Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

// Ruta de la imagen
const AFFILIATE_BANNER_IMAGE = "/assets/images/banner.jpg";

export default function AffiliateBanner() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{ py: { xs: 6, md: 12 } }}>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: { xs: 4, md: 8 },
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 1,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                    }}
                >
                    {/* --- Columna de Imagen (Izquierda) --- */}
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: 250, md: '100%' },
                            minHeight: { md: 450 },
                            order: { xs: 1, md: 1 }, // Imagen primero en mobile y desktop
                        }}
                    >
                        <Box
                            component="img"
                            src={AFFILIATE_BANNER_IMAGE}
                            alt="Únete a nuestro programa de afiliados"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>

                    {/* --- Columna de Información (Derecha) --- */}
                    <Box
                        sx={{
                            p: { xs: 4, md: 6 },
                            order: { xs: 2, md: 2 },
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        <Chip
                            label="Programa de Afiliados"
                            sx={{
                                mb: 2,
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.primary.contrastText,
                                fontWeight: 600,
                            }}
                        />

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                lineHeight: 1.2,
                                color: theme.palette.text.primary,
                            }}
                        >
                            Transforma tu Pasión en Ganancias
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 4, maxWidth: 500, mx: { xs: 'auto', md: 0 } }}
                        >
                            ¿Te encanta el maquillaje y sueñas con tener tu propio negocio? Únete a nuestro programa de afiliados y obtén comisiones atractivas, capacitación constante y acceso a productos de éxito.
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => navigate("/afiliacion")}
                            endIcon={<ArrowForward />}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                borderRadius: 2,
                                textTransform: 'none',
                                px: 4,
                                py: 1.5,
                                fontSize: "1rem",
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            Quiero Unirme
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
