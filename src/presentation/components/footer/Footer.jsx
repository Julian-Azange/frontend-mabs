import { Box, Container, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone } from '@mui/icons-material'

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#FBD9E5',
                py: 4,
                mt: 8,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                            Belleza & Glam
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Tu destino para accesorios de belleza y maquillaje de alta calidad.
                            Descubre tu estilo y resalta tu belleza natural.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            <Box component="a" href="#" sx={{ color: 'inherit' }}>
                                <Facebook />
                            </Box>
                            <Box component="a" href="#" sx={{ color: 'inherit' }}>
                                <Instagram />
                            </Box>
                            <Box component="a" href="#" sx={{ color: 'inherit' }}>
                                <Twitter />
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Enlaces Rápidos
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link to="/productos" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                                Productos
                            </Link>
                            <Link to="/nosotros" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                                Sobre Nosotros
                            </Link>
                            <Link to="/contacto" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                                Contacto
                            </Link>
                            <Link to="/envios" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                                Envíos y Devoluciones
                            </Link>
                            <Link to="/politicas" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                                Política de Privacidad
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Contacto
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Mail fontSize="small" />
                                <Typography variant="body2" color="text.secondary">
                                    contacto@bellezayglam.com
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Phone fontSize="small" />
                                <Typography variant="body2" color="text.secondary">
                                    +1 234 567 890
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Lunes a Viernes: 9:00 AM - 6:00 PM
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.1)', mt: 4, pt: 2 }}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        © {new Date().getFullYear()} Belleza & Glam. Todos los derechos reservados.
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}
