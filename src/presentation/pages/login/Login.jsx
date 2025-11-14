import { Container, Box, Typography, Paper, Link as MuiLink } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputField from '../../components/common/InputField'
import ButtonPrimary from '../../components/common/ButtonPrimary'
import { useAuth } from '../../../app/providers/AuthProvider'

const LOGO_URL = '/assets/logo.png';

const loginSchema = z.object({
    correo: z.string().email('Correo electrónico inválido').min(1, 'Este campo es requerido'),
    password: z.string().min(1, 'La contraseña es requerida'),
});

export default function Login() {
    const navigate = useNavigate();
    const { loginClient, loginAdmin } = useAuth();
    const { control, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            correo: '',
            password: '',
        }
    });

    const onSubmit = async (data) => {
        console.log('Formulario enviado con datos:', data);

        // Intentar iniciar sesión como administrador/desarrollador primero
        try {
            const adminResponse = await loginAdmin(data);
            if (adminResponse && adminResponse.token && adminResponse.usuario) {
                const userRole = adminResponse.usuario.rol; // Acceder al rol dentro del objeto usuario
                if (userRole === 'ADMIN' || userRole === 'DESARROLLADOR') {
                    navigate('/admin/dashboard');
                } else {
                    // Si el rol no es ADMIN o DESARROLLADOR, redirigir a la página principal o a otra ruta
                    navigate('/');
                }
                return;
            }
        } catch (adminError) {
            console.error("Error al intentar login de admin/desarrollador:", adminError.message);
            // No hacemos nada aquí, simplemente dejamos que el flujo continúe para intentar como cliente
        }

        // Si falla el login de admin/desarrollador, intentar como cliente
        try {
            const clientResponse = await loginClient(data);
            if (clientResponse && clientResponse.token && clientResponse.usuario) {
                navigate('/'); // Redirige a la página principal para clientes
                return;
            }
        } catch (clientError) {
            console.error("Error al intentar login de cliente:", clientError.message);
            // Manejo de errores específicos para el cliente si es necesario
        }

        // Si ambos fallan, mostrar un error general
        setError('correo', {
            type: 'manual',
            message: 'Credenciales incorrectas o usuario inactivo.'
        });
        setError('password', {
            type: 'manual',
            message: ' '
        });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <Box
                    component="img"
                    src={LOGO_URL}
                    alt="Mabs Logo"
                    sx={{ height: 50, mb: 3 }}
                />

                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                    Bienvenido/a de vuelta
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                    Accede a tu cuenta para continuar
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
                    <Box sx={{ mb: 2 }}>
                        <InputField
                            name="correo"
                            label="Correo electrónico"
                            control={control}
                            error={!!errors.correo}
                            helperText={errors.correo?.message}
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
        </Box>
    );
}
