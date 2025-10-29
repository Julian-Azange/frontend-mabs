import { Container, Box, Typography, Paper, Link as MuiLink } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputField from '../../components/common/InputField'
import ButtonPrimary from '../../components/common/ButtonPrimary'
import { useAuth } from '../../../app/providers/AuthProvider' // Importar el hook de autenticación

// Logo
const LOGO_URL = '/assets/logo.png';

// Esquema de validación con Zod
const loginSchema = z.object({
    emailOrUsername: z.string().min(1, 'Este campo es requerido'),
    password: z.string().min(1, 'La contraseña es requerida'),
});

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Obtener la función de login del contexto
    const { control, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            emailOrUsername: '',
            password: '',
        }
    });

    const onSubmit = (data) => {
        // Lógica de login temporal con roles
        if (data.emailOrUsername === 'admin' && data.password === 'admin') {
            // Usuario administrador
            login({ name: 'Admin User', email: 'admin@mabs.com', role: 'admin' });
            navigate('/admin/dashboard');
            return
        }

        if (data.emailOrUsername === 'cliente' && data.password === 'cliente') {
            // Usuario cliente
            login({ name: 'Cliente Demo', email: 'cliente@example.com', role: 'cliente' });
            navigate('/');
            return
        }

        // Si las credenciales son incorrectas, mostrar un error
        setError('emailOrUsername', {
            type: 'manual',
            message: 'Credenciales incorrectas'
        });
        setError('password', {
            type: 'manual',
            message: 'Credenciales incorrectas'
        });
    };

    return (
        <Container maxWidth="xs" sx={{ py: { xs: 4, md: 8 } }}>
            <Paper sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Logo */}
                <Box
                    component="img"
                    src={LOGO_URL}
                    alt="Mabs Logo"
                    sx={{ height: 50, mb: 3 }}
                />

                {/* Títulos */}
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                    Bienvenido/a de vuelta
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                    Accede a tu cuenta para continuar
                </Typography>

                {/* Formulario */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
                    <Box sx={{ mb: 2 }}>
                        <InputField
                            name="emailOrUsername"
                            label="Correo electrónico / Usuario"
                            control={control}
                            error={!!errors.emailOrUsername}
                            helperText={errors.emailOrUsername?.message}
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

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                        <MuiLink component={RouterLink} to="/recuperar-contrasena" variant="body2" sx={{ fontWeight: 500 }}>
                            ¿Olvidaste tu contraseña?
                        </MuiLink>
                    </Box>

                    <ButtonPrimary
                        type="submit"
                        fullWidth
                        sx={{ mb: 2, py: 1.5 }}
                    >
                        Acceder a mi Cuenta
                    </ButtonPrimary>

                    <Typography variant="body2" align="center" color="text.secondary">
                        ¿Aún no tienes cuenta?{' '}
                        <MuiLink component={RouterLink} to="/registro" sx={{ fontWeight: 600 }}>
                            Regístrate aquí
                        </MuiLink>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
