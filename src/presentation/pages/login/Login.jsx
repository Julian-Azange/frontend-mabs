import React, { useState } from 'react';
import {
    Box, Typography, Paper, Link as MuiLink,
    CircularProgress,
    Snackbar, Alert,
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import InputField from '../../components/common/InputField';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import { useAuth } from '../../../app/providers/AuthProvider';

// --- Constantes y Esquemas ---
const LOGO_URL = '/assets/logo.png';
const EMPTY_FIELDS_MESSAGE = 'Por favor, completa todos los campos requeridos para acceder.';
const CREDENTIAL_ERROR_MESSAGE = 'Credenciales inválidas. Verifica tu correo y contraseña.';
const CRITICAL_ERROR_TITLE = 'Error de Conexión';

const loginSchema = z.object({
    correo: z.string().email('Correo electrónico inválido').min(1, 'Este campo es obligatorio'),
    password: z.string().min(1, 'La contraseña es obligatoria'),
});


export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    // --- ESTADO DE CONTROL DE LA UI ---
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estado para el Dialog (Errores críticos de API)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    // Estado para el Snackbar (Alertas: Éxito, Validación Local, Error de Credenciales)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            correo: '',
            password: '',
        }
    });

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setDialogMessage('');
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    // --- 1. FUNCIÓN PARA CAMPOS VACÍOS (onInvalid) ---
    // Se ejecuta si Zod detecta errores de validación.
    const onFormInvalid = () => {
        setIsSubmitting(false);
        setSnackbar({
            open: true,
            message: EMPTY_FIELDS_MESSAGE,
            severity: 'warning'
        });
    };
    // ---------------------------------------------


    // --- 2. Lógica de envío SÓLO si el formulario es válido (onValidSubmit) ---
    const onValidSubmit = async (data) => {
        setIsSubmitting(true);
        setDialogOpen(false);
        setSnackbar({ ...snackbar, open: false });

        try {
            const response = await login(data);

            if (response?.token && response?.usuario) {
                // Éxito: Mostrar Snackbar y Redirigir
                setSnackbar({ open: true, message: '¡Acceso exitoso! Redirigiendo...', severity: 'success' });

                setTimeout(() => {
                    const userRole = response.usuario.rol;
                    const targetPath = (userRole === 'ADMIN' || userRole === 'DESARROLLADOR')
                        ? '/admin/dashboard'
                        : '/';
                    navigate(targetPath);
                }, 1000); // 1 segundo para ver el mensaje
                return;
            } else {
                throw new Error('Respuesta del servidor inesperada. Intenta de nuevo.');
            }

        } catch (error) {
            console.error("Error en Login:", error);
            setIsSubmitting(false);

            // 3. Manejo de Errores de API
            const isCredentialError = error.status === 401 || (error.message && (error.message.includes('401') || error.message.includes('Unauthorized')));

            if (isCredentialError) {
                // Error de Credenciales: Usamos Snackbar
                setSnackbar({
                    open: true,
                    message: CREDENTIAL_ERROR_MESSAGE,
                    severity: 'error'
                });
                return;

            } else {
                // Error Crítico: Usamos Dialog Minimalista
                const userFriendlyMessage = error.message || 'No se pudo conectar al servidor. Verifica tu conexión a internet o intenta más tarde.';
                setDialogMessage(userFriendlyMessage);
                setDialogOpen(true);
            }
        }
    };


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            py: 4
        }}>

            {/* --- SNACKBAR (Alertas Ligeras: Éxito, Validación, Credenciales) --- */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%', boxShadow: 3 }}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* --- DIALOG DE ERROR CRÍTICO (Estilo Minimalista/Referencia) --- */}
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="error-dialog-title"
                maxWidth="xs"
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: 10,
                        p: 2,
                        textAlign: 'center'
                    }
                }}
            >
                <ErrorOutlineIcon color="error" sx={{ fontSize: 40, mx: 'auto', mt: 1, mb: 1 }} />

                <DialogTitle id="error-dialog-title" sx={{
                    p: 0,
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: 'text.primary'
                }}>
                    {CRITICAL_ERROR_TITLE}
                </DialogTitle>

                <DialogContent sx={{ p: 0, mt: 1, mb: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                        {dialogMessage}
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ p: 0, justifyContent: 'center' }}>
                    <Button
                        onClick={handleCloseDialog}
                        variant="outlined"
                        color="inherit"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderColor: 'divider',
                            color: 'text.primary',
                            '&:hover': {
                                borderColor: 'text.primary',
                                backgroundColor: 'action.hover'
                            }
                        }}
                    >
                        Entendido
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ----------------------------------------------------------------- */}

            <Paper sx={{
                p: { xs: 3, md: 5 },
                width: { xs: '90%', sm: 450 },
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 8
            }}>

                {/* Logo y Títulos */}
                <Box component="img" src={LOGO_URL} alt="Mabs Logo" sx={{ height: 60, mb: 3 }} />
                <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 0.5, textAlign: 'center' }}>
                    Bienvenido/a de vuelta
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                    Accede a tu cuenta
                </Typography>

                <Box
                    component="form"
                    // Llamamos a las funciones onValidSubmit y onFormInvalid
                    onSubmit={handleSubmit(onValidSubmit, onFormInvalid)}
                    sx={{ width: '100%' }}
                >

                    {/* Campo Correo (Sin props de error/helperText) */}
                    <InputField
                        name="correo"
                        label="Correo electrónico"
                        control={control}
                        fullWidth
                        margin="normal"
                    />

                    {/* Campo Contraseña (Sin props de error/helperText) */}
                    <InputField
                        name="password"
                        label="Contraseña"
                        type="password"
                        control={control}
                        fullWidth
                        margin="normal"
                    />

                    {/* Enlace Olvidé mi contraseña */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 3 }}>
                        <MuiLink component={RouterLink} to="/recuperar-contrasena" variant="body2" sx={{ fontWeight: 500 }}>
                            ¿Olvidaste tu contraseña?
                        </MuiLink>
                    </Box>

                    {/* Botón de Acceder */}
                    <ButtonPrimary
                        type="submit"
                        fullWidth
                        sx={{ mb: 2, py: 1.5 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Acceder a mi Cuenta'}
                    </ButtonPrimary>

                    {/* Enlace a Registro */}
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