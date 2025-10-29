import React from "react";
import {
    Box,
    Typography,
    Button,
    Container,
    useTheme,
    Grid,
    Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const IMAGEN_MOCKUP = '/assets/logo.png';

const TITULO_SECUNDARIO = 'Desbloquea nuestra experiencia para impulsar el éxito en diversas industrias.';
const TEXTO_DESCRIPCION = 'En Mabs by Gabs, creemos firmemente que el maquillaje es una extensión de tu personalidad y una herramienta poderosa para expresar tu individualidad. Desde la base perfecta hasta el labial audaz, cada producto está seleccionado para realzar tu belleza natural y potenciar tu confianza. Nuestra misión es ofrecerte no solo productos de alta calidad, sino también inspiración y alegría en cada aplicación. ¡Descubre la magia de Mabs by Gabs y atrévete a brillar con luz propia!';

const PUNTOS_CLAVE = [
    'Maquillaje de alta calidad',
    'Realza tu belleza natural',
    'Potencia tu confianza',
    'Inspiración y alegría',
    'Productos seleccionados',
    'Brilla con luz propia',
];

export default function AboutUs() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                py: { xs: 6, md: 12 },
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(12, 1fr)'
                        },
                        gap: { xs: 4, md: 8 },
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            gridColumn: { xs: 'auto', md: 'span 4' },
                            order: { xs: 1, md: 2 },
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: 1,
                                overflow: 'hidden',
                                boxShadow: theme.shadows[4],
                                width: '100%',
                                height: { xs: 350, sm: 550 },
                                maxWidth: 400,
                                backgroundColor: 'white',
                            }}
                        >
                            <Box
                                component="img"
                                src={IMAGEN_MOCKUP}
                                alt="Logo Mabs by Gabs"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    p: 3,
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            gridColumn: { xs: 'auto', md: 'span 8' },
                            order: { xs: 2, md: 1 },
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
                            variant="h4"
                            component="h2"
                            sx={{
                                fontWeight: 700,
                                mt: 2,
                                mb: 2,
                                lineHeight: 1.2,
                                color: theme.palette.text.primary,
                                fontSize: { xs: '2rem', sm: '2.5rem' }
                            }}
                        >
                            {TITULO_SECUNDARIO}
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            paragraph
                            sx={{ mb: 4, fontSize: { xs: '1rem', md: '1.1rem' } }}
                        >
                            {TEXTO_DESCRIPCION}
                        </Typography>

                        <Grid container spacing={{ xs: 1, sm: 2 }}>
                            {PUNTOS_CLAVE.map((punto, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                        <CheckCircleIcon sx={{
                                            color: theme.palette.secondary.main || '#d8438f',
                                            fontSize: '1.2rem',
                                            mt: '2px'
                                        }} />
                                        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
                                            {punto}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ mt: 5 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 3,
                                    textTransform: "none",
                                    px: 5,
                                    py: 1.5,
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.secondary.contrastText,
                                    boxShadow: theme.shadows[4],
                                    "&:hover": {
                                        backgroundColor: theme.palette.secondary.dark,
                                        boxShadow: theme.shadows[6],
                                        transform: "translateY(-1px)",
                                    },
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Conoce Más de Nuestra Misión
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
