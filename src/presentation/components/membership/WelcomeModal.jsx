import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Modal,
    Box,
    Typography,
    Button,
    Grid,
    IconButton,
    Backdrop
} from '@mui/material';
import { Close } from '@mui/icons-material';

export default function WelcomeModal() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            aria-labelledby="membership-modal"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 0,
                    width: { xs: '95%', sm: '80%', md: '800px' },
                    maxHeight: '90vh',
                    overflow: 'hidden'
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'grey.500',
                        zIndex: 1
                    }}
                >
                    <Close />
                </IconButton>

                <Grid container>
                    {/* Imagen lado izquierdo */}
                    <Grid item md={6} xs={12}>
                        <Box
                            sx={{
                                height: { xs: '200px', md: '400px' },
                                width: '100%',
                                backgroundImage: 'url(/assets/images/membership-banner.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                    </Grid>

                    {/* Contenido lado derecho */}
                    <Grid item md={6} xs={12}>
                        <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography
                                variant="h4"
                                sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}
                            >
                                ¡Adquiere tu Membresía!
                            </Typography>

                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                                Empieza a ganar <span style={{ color: 'primary.main', fontWeight: 700 }}>25% de ganancias</span> por ventas
                            </Typography>

                            <Typography sx={{ mb: 4, color: 'text.secondary', fontSize: '1.1rem' }}>
                                Únete a nuestro exclusivo programa de membresía y comienza a generar ingresos mientras recomiendas nuestros productos.
                            </Typography>

                            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: 'primary.main' }}>
                                COP $200,000
                            </Typography>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={() => {
                                    handleClose();
                                    navigate('/membresia/pago');
                                }}
                                sx={{
                                    py: 2,
                                    borderRadius: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    textTransform: 'none'
                                }}
                            >
                                Adquirir Membresía
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}