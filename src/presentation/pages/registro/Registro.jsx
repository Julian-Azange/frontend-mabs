import { Container, Box, Typography, Paper, Link as MuiLink } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputField from '../../components/common/InputField'
import ButtonPrimary from '../../components/common/ButtonPrimary'

const LOGO_URL = '/assets/logo.png';

const registerSchema = z.object({
    fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.string().email('Debe ser un correo electrónico válido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    referralId: z.string().optional(),
});

export default function Registro() {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            referralId: '',
        }
    });

    const onSubmit = (data) => {
        console.log('Datos de registro:', data);
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


                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                    Regístrate
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                    Únete a la comunidad Mabs by Gabs
                </Typography>


                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
                    <Box sx={{ mb: 2 }}>
                        <InputField
                            name="fullName"
                            label="Nombre completo"
                            control={control}
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <InputField
                            name="email"
                            label="Correo electrónico"
                            type="email"
                            control={control}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <InputField
                            name="password"
                            label="Contraseña"
                            type="password"
                            control={control}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <InputField
                            name="referralId"
                            label="ID de Referido (opcional)"
                            control={control}
                            error={!!errors.referralId}
                            helperText={errors.referralId?.message}
                        />
                    </Box>

                    <ButtonPrimary
                        type="submit"
                        fullWidth
                        sx={{ mb: 2, py: 1.5 }}
                    >
                        Crear Mi Cuenta
                    </ButtonPrimary>

                    <Typography variant="body2" align="center" color="text.secondary">
                        ¿Ya tienes una cuenta?{' '}
                        <MuiLink component={RouterLink} to="/login" sx={{ fontWeight: 600 }}>
                            Inicia sesión aquí
                        </MuiLink>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}