// src/presentation/pages/registro/Registro.jsx
import React, { useState } from 'react';
import {
    Box, Typography, Paper, Link as MuiLink,
    CircularProgress,
    // Notificaciones
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
import { registerClient } from '../../../app/services/clientService'; // Asumo que es tu servicio

// --- Constantes y Esquemas ---
const LOGO_URL = '/assets/logo.png';
const EMPTY_FIELDS_MESSAGE = 'Por favor, completa todos los campos requeridos.';
const CRITICAL_ERROR_TITLE = '⚠️ Error del Servidor';

// Schema Extendido: Incluye confirmPassword y validación de coincidencia
const registerSchema = z.object({
    email: z.string().email('Debe ser un correo electrónico válido').min(1, 'El correo es obligatorio'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Las contraseñas no coinciden.',
        path: ['confirmPassword'],
    });


export default function Registro() {
    const navigate = useNavigate();

    // --- ESTADO DE CONTROL DE LA UI ---
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estado para el Dialog (Errores críticos)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    // Estado para el Snackbar (Alertas ligeras: Éxito, Validación Local, Error de API 4xx)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
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

    // --- 1. FUNCIÓN PARA CAMPOS VACÍOS O VALIDACIÓN FALLIDA (onInvalid) ---
    const onFormInvalid = (errors) => {
        setIsSubmitting(false);
        // Usamos el error de Zod para la coincidencia de contraseñas si existe.
        const errorMessage = errors.confirmPassword?.message || EMPTY_FIELDS_MESSAGE;

        setSnackbar({
            open: true,
            message: errorMessage,
            severity: 'warning'
        });
    };
    // ---------------------------------------------


    // --- 2. Lógica de envío SÓLO si el formulario es válido (onValidSubmit) ---
    const onValidSubmit = async (data) => {
        setIsSubmitting(true);
        setDialogOpen(false);
        setSnackbar({ ...snackbar, open: false });

        // Prepara los datos para la API (quitamos confirmPassword)
        const clientData = {
            correo: data.email,
            password: data.password,
            rol: "CLIENTE"
        };

        try {
            await registerClient(clientData); // Llama a la API

            // Éxito: Mostrar Snackbar y Redirigir
            setSnackbar({ open: true, message: '¡Registro exitoso! Redirigiendo a Login...', severity: 'success' });

            setTimeout(() => {
                navigate('/login');
            }, 1000);
            return;

        } catch (error) {
            console.error("Error en Registro:", error);
            setIsSubmitting(false);

            // --- MANEJO DE ERRORES DEL API ---

            // 1. Error de Correo Existente (ej. 409 Conflict)
            const isConflictError = error.status === 409 || (error.message && error.message.toLowerCase().includes('correo en uso'));

            if (isConflictError) {
                setSnackbar({
                    open: true,
                    message: 'Este correo ya está registrado. Intenta iniciar sesión.',
                    severity: 'error'
                });
                return;

            } else {
                // 2. Error Crítico: Usamos Dialog Minimalista
                const userFriendlyMessage = error.message || 'Error al registrar. Intenta más tarde.';
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

            {/* --- SNACKBAR (Alertas Ligeras: Éxito, Validación, Error de API 4xx) --- */}
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
                    Regístrate
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                    Únete a la comunidad Mabs by Gabs
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onValidSubmit, onFormInvalid)}
                    sx={{ width: '100%' }}
                >

                    {/* Campo Correo */}
                    <InputField
                        name="email"
                        label="Correo electrónico"
                        type="email"
                        control={control}
                        fullWidth
                        margin="normal"
                    />

                    {/* Campo Contraseña */}
                    <InputField
                        name="password"
                        label="Contraseña"
                        type="password"
                        control={control}
                        fullWidth
                        margin="normal"
                    />

                    {/* Campo Confirmar Contraseña */}
                    <InputField
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        control={control}
                        fullWidth
                        margin="normal"
                    />

                    <ButtonPrimary
                        type="submit"
                        fullWidth
                        sx={{ mt: 2, mb: 2, py: 1.5 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Crear Mi Cuenta'}
                    </ButtonPrimary>

                    <Typography variant="body2" align="center" color="text.secondary">
                        ¿Ya tienes una cuenta?{' '}
                        <MuiLink component={RouterLink} to="/login" sx={{ fontWeight: 600 }}>
                            Inicia sesión aquí
                        </MuiLink>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}