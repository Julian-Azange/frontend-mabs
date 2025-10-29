import {
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    InputAdornment,
} from '@mui/material'
import {
    Phone,
    Email,
    LocationOn,
    ArrowForward,
} from '@mui/icons-material'

const contactInfo = {
    phone: "+57 123 456 789",
    email: "contacto@mabs.com",
    address: "Bogotá, Colombia",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.51141489705!2d-74.107807!3d4.6482837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2zQm9nb3TDoQ!5e0!3m2!1ses!2sco!4v1698538144010!5m2!1ses!2sco"
}

const contactMethods = [
    {
        icon: <Phone sx={{ color: 'primary.main' }} />,
        title: 'Llámanos',
        value: contactInfo.phone
    },
    {
        icon: <Email sx={{ color: 'primary.main' }} />,
        title: 'Escríbenos',
        value: contactInfo.email
    },
    {
        icon: <LocationOn sx={{ color: 'primary.main' }} />,
        title: 'Visítanos',
        value: contactInfo.address
    }
]

export default function Contacto() {
    const handleSubmit = (e) => {
        e.preventDefault()
        // Aquí iría la lógica para enviar el formulario
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                    Contáctanos
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                    ¿Tienes alguna pregunta o comentario? No dudes en contactarnos.
                    Estamos aquí para ayudarte.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Métodos de contacto */}
                <Grid item xs={12}>
                    <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
                        {contactMethods.map((method, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        textAlign: 'center',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                        }
                                    }}
                                >
                                    <CardContent>
                                        <Box sx={{ mb: 2 }}>
                                            {method.icon}
                                        </Box>
                                        <Typography variant="h6" gutterBottom>
                                            {method.title}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {method.value}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Formulario y Mapa */}
                <Grid item xs={12}>
                    <Card sx={{ bgcolor: 'background.default' }}>
                        <CardContent>
                            <Grid container spacing={4}>
                                {/* Formulario */}
                                <Grid item xs={12} md={6}>
                                    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
                                        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                                            Nuestro Boletín
                                        </Typography>
                                        <Typography color="text.secondary" paragraph>
                                            Suscríbete para recibir nuestras últimas novedades y ofertas especiales.
                                        </Typography>

                                        <TextField
                                            fullWidth
                                            placeholder="Ingresa tu email"
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                borderRadius: '50%',
                                                                minWidth: 'unset',
                                                                width: 40,
                                                                height: 40,
                                                                p: 0
                                                            }}
                                                        >
                                                            <ArrowForward />
                                                        </Button>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                {/* Mapa */}
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ height: '100%', minHeight: 300 }}>
                                        <iframe
                                            src={contactInfo.mapUrl}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Ubicación de la empresa"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}