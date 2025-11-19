import React, { useState, useEffect } from 'react';
import {
    Container, Paper, Typography, Box, Avatar, Button, Grid,
    IconButton, Divider, List, ListItem, ListItemText,
    ListItemIcon, Dialog, DialogTitle, DialogContent,
    DialogActions, Snackbar, Alert, CircularProgress
} from '@mui/material';
import {
    Email, Phone, CameraAlt,
    WarningAmberRounded
} from '@mui/icons-material';
import { useAuth } from '../../../app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { uploadProfileImage, getProfileImageBlobUrl } from '../../../app/services/clientService';

// --- CONSTANTES ---
const PRIMARY_COLOR = '#C43670';
const CHAMPAGNE_LIGHT = '#FBF4EB';
const CONFIRM_LOGOUT_TITLE = 'Cerrar Sesión';
const CONFIRM_LOGOUT_MESSAGE = '¿Estás seguro de que quieres cerrar tu sesión actual?';

export default function Perfil() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // --- ESTADOS ---
    const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [cacheBuster, setCacheBuster] = useState(Date.now());
    // profileImageBlobUrl ahora almacenará la URL temporal (blob:http://...)
    const [profileImageBlobUrl, setProfileImageBlobUrl] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [imageLoading, setImageLoading] = useState(false);

    if (!user) { navigate('/login'); return null; }

    useEffect(() => {
        let isMounted = true;

        const loadImage = async () => {
            if (!user?.id) return;

            setImageLoading(true);

            // ⚠️ IMPORTANTE: Revocar la URL anterior para liberar memoria
            if (profileImageBlobUrl) {
                URL.revokeObjectURL(profileImageBlobUrl);
                setProfileImageBlobUrl(null);
            }

            try {
                // Usamos la función que obtiene el Blob con el token y crea la URL
                const blobUrl = await getProfileImageBlobUrl(user.id);

                if (isMounted) {
                    setProfileImageBlobUrl(blobUrl);
                }
            } catch (error) {
                setProfileImageBlobUrl(null);
            } finally {
                if (isMounted) {
                    setImageLoading(false);
                }
            }
        };

        loadImage();

        // ⚠️ FUNCIÓN DE LIMPIEZA CRUCIAL
        return () => {
            isMounted = false;
            // Solo revocar si la URL fue creada por el hook
            if (profileImageBlobUrl && profileImageBlobUrl.startsWith('blob:')) {
                URL.revokeObjectURL(profileImageBlobUrl);
            }
        };
    }, [user?.id, cacheBuster]); // Dependencias: user.id y cacheBuster para recarga


    // --- HANDLERS (Iguales) ---
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    const confirmLogout = () => {
        setOpenConfirmDialog(true);
    };

    const handlePerformLogout = async () => {
        setOpenConfirmDialog(false);
        try {
            await logout();
            setSnackbar({ open: true, message: 'Sesión cerrada exitosamente.', severity: 'success' });
            setTimeout(() => navigate('/login'), 500);
        } catch (error) {
            setSnackbar({ open: true, message: error.message || 'Error al cerrar sesión.', severity: 'error' });
        }
    };

    // --- LÓGICA DE SUBIDA DE IMAGEN ---
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setImageFile(file);
            setOpenPhotoDialog(true);
        }
    };

    const handleUploadImage = async () => {
        if (!imageFile || !user?.id) {
            setSnackbar({ open: true, message: 'Error: No se seleccionó ningún archivo.', severity: 'error' });
            return;
        }
        setIsUploading(true);
        setOpenPhotoDialog(false);
        const formData = new FormData();
        formData.append('img', imageFile);
        try {
            await uploadProfileImage(user.id, formData);
            // Fuerza la recarga: incrementamos cacheBuster para disparar el useEffect de carga
            setCacheBuster(Date.now());
            setSnackbar({ open: true, message: 'Foto de perfil actualizada.', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: error.message || 'Error al subir la imagen.', severity: 'error' });
        } finally {
            setIsUploading(false);
            setPreviewImage(null);
            setImageFile(null);
        }
    };

    const handleClosePhotoDialog = () => {
        setPreviewImage(null);
        setImageFile(null);
        setOpenPhotoDialog(false);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={3} justifyContent="center">
                {/* --- COLUMNA PRINCIPAL (Perfil) --- */}
                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ p: 3, borderRadius: 2, height: 'auto', boxShadow: 3 }}>

                        {/* 1. Avatar y Nombre */}
                        <Box sx={{ textAlign: 'center', pb: 2, borderBottom: '1px solid #f0f0f0' }}>
                            <Box sx={{ position: 'relative', display: 'inline-block', mb: 1.5 }}>
                                <Avatar
                                    // Usa la Blob URL autenticada o la preview de subida
                                    src={previewImage || profileImageBlobUrl}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        bgcolor: PRIMARY_COLOR,
                                        fontSize: '2.5rem'
                                    }}
                                >
                                    {user.name ? user.name[0].toUpperCase() : 'U'}
                                </Avatar>

                                {imageLoading && (
                                    <CircularProgress
                                        size={104}
                                        sx={{
                                            position: 'absolute',
                                            top: -2,
                                            left: -2,
                                            color: PRIMARY_COLOR
                                        }}
                                    />
                                )}

                                <IconButton
                                    component="label"
                                    sx={{
                                        position: 'absolute',
                                        bottom: -5,
                                        right: -5,
                                        backgroundColor: PRIMARY_COLOR,
                                        color: 'white',
                                        '&:hover': { backgroundColor: '#A53460' },
                                        boxShadow: 2,
                                        width: 32,
                                        height: 32
                                    }}
                                >
                                    <CameraAlt sx={{ fontSize: 18 }} />
                                    <input type="file" hidden accept="image/*" onChange={handleFileSelect} />
                                </IconButton>
                            </Box>

                            <Typography variant="h6" sx={{ fontWeight: 600 }}>{user.name || 'Usuario'}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {user.email}
                            </Typography>
                        </Box>

                        {/* 2. Información de Contacto */}
                        <Box sx={{ pt: 2 }}>
                            <List disablePadding>
                                <ListItem sx={{ bgcolor: CHAMPAGNE_LIGHT, borderRadius: 1.5, mb: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}><Email sx={{ color: PRIMARY_COLOR }} /></ListItemIcon>
                                    <ListItemText primary="Email" secondary={user.email} />
                                </ListItem>
                                <ListItem sx={{ bgcolor: CHAMPAGNE_LIGHT, borderRadius: 1.5, mb: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}><Phone sx={{ color: PRIMARY_COLOR }} /></ListItemIcon>
                                    <ListItemText primary="Teléfono" secondary={user.phone || "No configurado"} />
                                </ListItem>
                            </List>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Botón Cerrar Sesión */}
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={confirmLogout}
                            fullWidth
                            sx={{ borderRadius: 1.5 }}
                        >
                            Cerrar Sesión
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* MODALES Y SNACKBARS (Se omiten por brevedad, asumo que son correctos) */}
            {/* ... (Snackbar, Dialogo de Confirmación, Dialogo de Subir Foto) ... */}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ bgcolor: snackbar.severity === 'success' ? PRIMARY_COLOR : undefined }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
                maxWidth="xs"
                PaperProps={{ sx: { borderRadius: 2, boxShadow: 10, p: 2, textAlign: 'center' } }}
            >
                <WarningAmberRounded color="warning" sx={{ fontSize: 40, mx: 'auto', mt: 1, mb: 1 }} />
                <DialogTitle sx={{ p: 0, fontWeight: 700, fontSize: '1.25rem' }}>{CONFIRM_LOGOUT_TITLE}</DialogTitle>
                <DialogContent sx={{ p: 0, mt: 1, mb: 3 }}>
                    <Typography variant="body1" color="text.secondary">{CONFIRM_LOGOUT_MESSAGE}</Typography>
                </DialogContent>
                <DialogActions sx={{ p: 0, justifyContent: 'center', gap: 1 }}>
                    <Button onClick={() => setOpenConfirmDialog(false)} variant="outlined">Cancelar</Button>
                    <Button onClick={handlePerformLogout} variant="contained" color="error">Sí, Cerrar Sesión</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openPhotoDialog} onClose={handleClosePhotoDialog} maxWidth="xs">
                <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
                    <CameraAlt sx={{ mr: 1, color: PRIMARY_COLOR }} />
                    Subir Foto de Perfil
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ position: 'relative', width: 150, height: 150, mx: 'auto', mb: 2 }}>
                        <Avatar
                            src={previewImage}
                            sx={{ width: 150, height: 150, bgcolor: PRIMARY_COLOR, fontSize: '3rem', mx: 'auto' }}
                        >
                            {user.name ? user.name[0].toUpperCase() : 'U'}
                        </Avatar>
                        {isUploading && (
                            <CircularProgress
                                size={150}
                                sx={{ color: PRIMARY_COLOR, position: 'absolute', top: 0, left: 0, opacity: 0.7 }}
                            />
                        )}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Asegúrate que la imagen sea clara y tenga un buen enfoque.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', p: 3, pt: 0 }}>
                    <Button onClick={handleClosePhotoDialog} variant="outlined" color="error">
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleUploadImage}
                        variant="contained"
                        sx={{ bgcolor: PRIMARY_COLOR }}
                        disabled={isUploading}
                    >
                        {isUploading ? <CircularProgress size={24} color="inherit" /> : 'Confirmar Subida'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}