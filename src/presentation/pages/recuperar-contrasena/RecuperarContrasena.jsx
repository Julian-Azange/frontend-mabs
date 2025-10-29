import { Container, Box, Typography, Paper, Link as MuiLink } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputField from '../../components/common/InputField'
import ButtonPrimary from '../../components/common/ButtonPrimary'

const LOGO_URL = '/assets/logo.png';

const recoverySchema = z.object({
    email: z.string().email('Debe ser un correo electrónico válido'),
});

export default function RecuperarContrasena() {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(recoverySchema),
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = (data) => {
        console.log('Datos de recuperación:', data);
        alert('Se ha enviado un enlace de recuperación a tu correo.');
        navigate('/login');
    };

    return (
        <Container maxWidth="xs" sx={{ py: { xs: 4, md: 8 } }}>
            <Paper sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <Box
                    component="img"
                    src={LOGO_URL}
                    alt="Mabs Logo"
                    sx={{ height: 50, mb: 3 }}
                />


                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                    Recuperar Contraseña
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </Typography>


                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
                    <Box sx={{ mb: 3 }}>
                        <InputField
                            name="email"
                            label="Correo electrónico"
                            type="email"
                            control={control}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Box>

                    <ButtonPrimary
                        type="submit"
                        fullWidth
                        sx={{ mb: 2, py: 1.5 }}
                    >
                        Enviar enlace de recuperación
                    </ButtonPrimary>

                    <Typography variant="body2" align="center" color="text.secondary">
                        ¿Recordaste tu contraseña?{' '}
                        <MuiLink component={RouterLink} to="/login" sx={{ fontWeight: 600 }}>
                            Volver a Iniciar Sesión
                        </MuiLink>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
