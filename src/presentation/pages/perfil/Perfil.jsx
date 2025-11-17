// src/presentation/pages/perfil/Perfil.jsx
import React, { useState } from 'react';
import {
    Container, Paper, Typography, Box, Avatar, Button, Grid,
    IconButton, Tabs, Tab, Divider, List, ListItem, ListItemText,
    ListItemIcon, TextField, Dialog, DialogTitle, DialogContent,
    DialogActions, Snackbar, Alert, CircularProgress
} from '@mui/material';
import {
    Person, Email, Phone, LocationOn, Edit, CameraAlt, Security, Payment,
    AccountBalance, History, Add, Logout, WarningAmberRounded,
    ErrorOutline as ErrorOutlineIcon
} from '@mui/icons-material';
import { useAuth } from '../../../app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Importa tu InputField si lo vas a usar
import InputField from '../../components/common/InputField';
// Importa el servicio real o simulado
import { uploadProfileImage } from '../../../app/services/clientService';

// --- CONSTANTES ---
const PRIMARY_COLOR = '#C43670';
const CRITICAL_ERROR_TITLE = '⚠️ Error en la Operación';
const CONFIRM_LOGOUT_TITLE = 'Cerrar Sesión';
const CONFIRM_LOGOUT_MESSAGE = '¿Estás seguro de que quieres cerrar tu sesión actual?';
const BASE_URL_IMG_PROFILE = 'http://localhost:8080/api/imgPerfil/';


// --- ESQUEMAS DE VALIDACIÓN ZOD ---
const passwordSchema = z.object({
    oldPassword: z.string().min(1, 'La contraseña actual es requerida.'),
    newPassword: z.string().min(8, 'Debe tener al menos 8 caracteres.'),
    confirmPassword: z.string().min(1, 'La confirmación es requerida.'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las nuevas contraseñas no coinciden.",
    path: ["confirmPassword"],
});

const nameSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
});

// --- DATOS DUMMY ---
const userBankInfo = { bankName: "Banco XYZ", accountNumber: "**** **** **** 1234", accountType: "Cuenta de Ahorros" };
const paymentHistory = [{ id: 1, date: "2025-10-25", amount: 150.00, status: "Pagado" }];
const addresses = [{ id: 1, type: "Casa", street: "Calle Principal 123", city: "Ciudad Ejemplo", state: "Estado", zipCode: "12345" }];


export default function Perfil() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // --- ESTADOS DE LA UI ---
    const [activeTab, setActiveTab] = useState(0);
    const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [openBankDialog, setOpenBankDialog] = useState(false);
    const [openAddressDialog, setOpenAddressDialog] = useState(false);
    const [openEditName, setOpenEditName] = useState(false);
    const [openEditPhone, setOpenEditPhone] = useState(false);
    const [openEditAddress, setOpenEditAddress] = useState(false);
    const [editAddressData, setEditAddressData] = useState(null);
    const [nameValue, setNameValue] = useState(user?.name || '');
    const [phoneValue, setPhoneValue] = useState(user?.phone || '');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [confirmAction, setConfirmAction] = useState(() => () => { });
    const [confirmTitle, setConfirmTitle] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    // RHF forms
    const passwordForm = useForm({ resolver: zodResolver(passwordSchema), defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' } });
    const { handleSubmit: handlePasswordSubmit, control: passwordControl, reset: resetPasswordForm } = passwordForm;

    const nameForm = useForm({ resolver: zodResolver(nameSchema), defaultValues: { name: user?.name || '' } });
    const { handleSubmit: handleNameSubmit, control: nameControl, reset: resetNameForm } = nameForm;


    if (!user) {
        navigate('/login');
        return null;
    }

    // --- HANDLERS DE NOTIFICACIÓN ---
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    // --- MANEJO DE LOGOUT ---
    const confirmLogout = () => {
        setConfirmTitle(CONFIRM_LOGOUT_TITLE);
        setConfirmMessage(CONFIRM_LOGOUT_MESSAGE);
        setConfirmAction(() => handlePerformLogout);
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

    // --- HANDLERS DE FOTO DE PERFIL ---
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setImageFile(file);
            setOpenPhotoDialog(true);
        }
    };

    const handleUploadImage = async () => {
        if (!imageFile || !user?.id) return;

        setIsUploading(true);
        setOpenPhotoDialog(false);

        const formData = new FormData();
        formData.append('imgPerfil', imageFile); // 'imgPerfil' debe coincidir con el nombre esperado por tu backend

        try {
            // Llama al servicio de subida de imagen
            await uploadProfileImage(user.id, formData);

            setSnackbar({ open: true, message: 'Foto de perfil actualizada.', severity: 'success' });
            // Forzar recarga o actualización de la URL del Avatar en el estado global si es necesario
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

    // --- HANDLERS DE FORMULARIOS RHF ---
    const handlePasswordUpdate = async (data) => {
        setOpenPasswordDialog(false);
        try {
            // await updatePassword(data);
            setSnackbar({ open: true, message: 'Contraseña actualizada correctamente.', severity: 'success' });
            resetPasswordForm();
        } catch (error) {
            setSnackbar({ open: true, message: error.message || 'Error al actualizar la contraseña.', severity: 'error' });
        }
    };

    const onPasswordFormInvalid = (errors) => {
        const firstErrorKey = Object.keys(errors)[0];
        setSnackbar({ open: true, message: errors[firstErrorKey].message, severity: 'warning' });
    };

    const handleNameUpdateRHF = async (data) => {
        setOpenEditName(false);
        try {
            // await updateName(data.name);
            setSnackbar({ open: true, message: 'Nombre actualizado correctamente.', severity: 'success' });
            setNameValue(data.name);
        } catch (error) {
            setSnackbar({ open: true, message: error.message || 'Error al actualizar el nombre.', severity: 'error' });
        }
    };

    const onNameFormInvalidRHF = (errors) => {
        setSnackbar({ open: true, message: errors.name.message, severity: 'warning' });
    };

    // --- HANDLERS DE ACCIONES SIMPLES ---
    const handlePhoneUpdate = () => {
        if (phoneValue.length < 5) {
            setSnackbar({ open: true, message: 'Ingresa un número de teléfono válido.', severity: 'warning' });
            return;
        }
        setSnackbar({ open: true, message: 'Teléfono actualizado.', severity: 'success' });
        setOpenEditPhone(false);
    };
    const handleBankInfoUpdate = () => {
        setSnackbar({ open: true, message: 'Información bancaria actualizada.', severity: 'success' });
        setOpenBankDialog(false);
    };
    const handleAddressUpdate = () => {
        setSnackbar({ open: true, message: 'Dirección actualizada.', severity: 'success' });
        setOpenEditAddress(false);
    };
    const handleAddressAdd = () => {
        setSnackbar({ open: true, message: 'Dirección agregada correctamente.', severity: 'success' });
        setOpenAddressDialog(false);
    };


    // --- RENDERS DE SECCIONES ---
    const renderPersonalInfo = () => (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, borderBottom: '1px solid #f0f0f0', pb: 4 }}>
                {/* Avatar con Botón de Carga */}
                <Box sx={{ position: 'relative' }}>
                    <Avatar
                        src={user.photoURL ? `${BASE_URL_IMG_PROFILE}${user.id}` : previewImage || undefined}
                        sx={{ width: 120, height: 120, bgcolor: PRIMARY_COLOR, fontSize: '3rem', border: `4px solid ${PRIMARY_COLOR}20` }}
                    >
                        {user.name ? user.name[0].toUpperCase() : 'U'}
                    </Avatar>
                    <IconButton component="label" sx={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: PRIMARY_COLOR, color: 'white', '&:hover': { backgroundColor: '#A53460' }, boxShadow: 2 }}>
                        <CameraAlt />
                        <input type="file" hidden accept="image/*" onChange={handleFileSelect} />
                    </IconButton>
                </Box>

                {/* Información Básica */}
                <Box sx={{ ml: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                    <Typography variant="body1" color="text.secondary">{user.email}</Typography>
                </Box>
            </Box>


            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="error" onClick={confirmLogout} sx={{ borderRadius: 1.5 }}>
                    Cerrar Sesión
                </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Datos Personales</Typography>
                    <List disablePadding>
                        <ListItem sx={{ '&:hover': { bgcolor: '#FBF4EB' }, borderRadius: 1 }} secondaryAction={<IconButton size="small" onClick={() => { setNameValue(user?.name || ''); setOpenEditName(true); }}><Edit fontSize="small" /></IconButton>}>
                            <ListItemIcon sx={{ minWidth: 40 }}><Person sx={{ color: PRIMARY_COLOR }} /></ListItemIcon>
                            <ListItemText primary="Nombre Completo" secondary={nameValue} primaryTypographyProps={{ fontWeight: 500 }} />
                        </ListItem>
                        <ListItem sx={{ '&:hover': { bgcolor: '#FBF4EB' }, borderRadius: 1 }} >
                            <ListItemIcon sx={{ minWidth: 40 }}><Email sx={{ color: PRIMARY_COLOR }} /></ListItemIcon>
                            <ListItemText primary="Correo Electrónico" secondary={user.email} primaryTypographyProps={{ fontWeight: 500 }} />
                        </ListItem>
                        <ListItem sx={{ '&:hover': { bgcolor: '#FBF4EB' }, borderRadius: 1 }} secondaryAction={<IconButton size="small" onClick={() => { setPhoneValue(user?.phone || ''); setOpenEditPhone(true); }}><Edit fontSize="small" /></IconButton>}>
                            <ListItemIcon sx={{ minWidth: 40 }}><Phone sx={{ color: PRIMARY_COLOR }} /></ListItemIcon>
                            <ListItemText primary="Teléfono" secondary={phoneValue || "No configurado"} primaryTypographyProps={{ fontWeight: 500 }} />
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Direcciones</Typography>
                        <Button startIcon={<Add />} onClick={() => setOpenAddressDialog(true)} sx={{ color: PRIMARY_COLOR }}>
                            Agregar Dirección
                        </Button>
                    </Box>
                    {addresses.map((address) => (
                        <Paper key={address.id} sx={{ p: 2, mb: 2, backgroundColor: '#FBF4EB', borderRadius: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle2" sx={{ color: PRIMARY_COLOR }}>{address.type}</Typography>
                                <IconButton size="small" onClick={() => { setEditAddressData(address); setOpenEditAddress(true); }}><Edit fontSize="small" /></IconButton>
                            </Box>
                            <Typography variant="body2">{address.street}</Typography>
                            <Typography variant="body2" color="text.secondary">{`${address.city}, ${address.state} ${address.zipCode}`}</Typography>
                        </Paper>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );

    const renderSecurity = () => (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
            <Typography variant="h6" gutterBottom>Seguridad de la Cuenta</Typography>
            <Paper sx={{ p: 3, mb: 3, borderRadius: 1.5 }}>
                <Typography variant="subtitle1" gutterBottom>Contraseña</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>La última actualización fue hace 30 días</Typography>
                <Button variant="outlined" sx={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }} startIcon={<Security />} onClick={() => setOpenPasswordDialog(true)}>
                    Cambiar Contraseña
                </Button>
            </Paper>
            <Button variant="outlined" color="error" onClick={confirmLogout} fullWidth sx={{ mt: 2 }}>
                Cerrar Sesión
            </Button>
        </Box>
    );

    const renderPaymentInfo = () => (
        <Box>
            {/* Implementación de renderPaymentInfo */}
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} aria-label="profile tabs" TabIndicatorProps={{ sx: { bgcolor: PRIMARY_COLOR } }} sx={{ '& .MuiTab-root.Mui-selected': { color: PRIMARY_COLOR }, '& .MuiTabs-indicator': { bgcolor: PRIMARY_COLOR } }}>
                        <Tab label="Información Personal" />
                        <Tab label="Seguridad" />
                        <Tab label="Método de Pago" />
                    </Tabs>
                </Box>

                {activeTab === 0 && renderPersonalInfo()}
                {activeTab === 1 && renderSecurity()}
                {activeTab === 2 && renderPaymentInfo()}
            </Paper>


            {/* ----------------------------------------------------------- */}
            {/* --- MODALES DE ACCIÓN Y CONFIRMACIÓN --- */}
            {/* ----------------------------------------------------------- */}

            {/* 1. SNACKBAR GENERAL */}
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ bgcolor: snackbar.severity === 'success' ? PRIMARY_COLOR : undefined }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* 2. DIALOGO DE CONFIRMACIÓN MINIMALISTA (Cerrar Sesión) */}
            <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} maxWidth="xs" PaperProps={{ sx: { borderRadius: 2, boxShadow: 10, p: 2, textAlign: 'center' } }}>
                <WarningAmberRounded color="warning" sx={{ fontSize: 40, mx: 'auto', mt: 1, mb: 1 }} />
                <DialogTitle sx={{ p: 0, fontWeight: 700, fontSize: '1.25rem' }}>{confirmTitle}</DialogTitle>
                <DialogContent sx={{ p: 0, mt: 1, mb: 3 }}>
                    <Typography variant="body1" color="text.secondary">{confirmMessage}</Typography>
                </DialogContent>
                <DialogActions sx={{ p: 0, justifyContent: 'center', gap: 1 }}>
                    <Button onClick={() => setOpenConfirmDialog(false)} variant="outlined">Cancelar</Button>
                    <Button onClick={confirmAction} variant="contained" color="error">Sí, Cerrar Sesión</Button>
                </DialogActions>
            </Dialog>


            {/* 3. DIALOGO DE CAMBIAR CONTRASEÑA (RHF y Zod) */}
            <Dialog open={openPasswordDialog} onClose={() => { setOpenPasswordDialog(false); resetPasswordForm(); }} maxWidth="sm" PaperProps={{ component: 'form', onSubmit: handlePasswordSubmit(handlePasswordUpdate, onPasswordFormInvalid) }}>
                <DialogTitle>Cambiar Contraseña</DialogTitle>
                <DialogContent>
                    <InputField name="oldPassword" control={passwordControl} margin="dense" label="Contraseña Actual" type="password" fullWidth />
                    <InputField name="newPassword" control={passwordControl} margin="dense" label="Nueva Contraseña" type="password" fullWidth />
                    <InputField name="confirmPassword" control={passwordControl} margin="dense" label="Confirmar Nueva Contraseña" type="password" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenPasswordDialog(false); resetPasswordForm(); }}>Cancelar</Button>
                    <Button type="submit" variant="contained" sx={{ bgcolor: PRIMARY_COLOR }}>Actualizar</Button>
                </DialogActions>
            </Dialog>

            {/* 4. DIALOGO DE EDITAR NOMBRE (RHF y Zod) */}
            <Dialog open={openEditName} onClose={() => { setOpenEditName(false); resetNameForm(); }} PaperProps={{ component: 'form', onSubmit: handleNameSubmit(handleNameUpdateRHF, onNameFormInvalidRHF) }}>
                <DialogTitle>Editar Nombre</DialogTitle>
                <DialogContent>
                    <InputField name="name" control={nameControl} margin="dense" label="Nombre Completo" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenEditName(false); resetNameForm(); }}>Cancelar</Button>
                    <Button type="submit" variant="contained" sx={{ bgcolor: PRIMARY_COLOR }}>Actualizar</Button>
                </DialogActions>
            </Dialog>

            {/* 5. DIALOGO DE SUBIR/ACTUALIZAR FOTO (Final) */}
            <Dialog open={openPhotoDialog} onClose={handleClosePhotoDialog} maxWidth="xs">
                <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
                    <CameraAlt sx={{ mr: 1, color: PRIMARY_COLOR }} /> Subir Foto de Perfil
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
                            <CircularProgress size={150} sx={{ color: PRIMARY_COLOR, position: 'absolute', top: 0, left: 0, opacity: 0.7 }} />
                        )}
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Asegúrate que la imagen sea clara y tenga un buen enfoque.</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', p: 3, pt: 0 }}>
                    <Button onClick={handleClosePhotoDialog} variant="outlined" color="error">Cancelar</Button>
                    <Button onClick={handleUploadImage} variant="contained" sx={{ bgcolor: PRIMARY_COLOR }} disabled={isUploading}>
                        {isUploading ? <CircularProgress size={24} color="inherit" /> : 'Confirmar Subida'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 6. OTROS DIÁLOGOS (Funcionalidad Original + Snackbar) */}
            <Dialog open={openEditPhone} onClose={() => setOpenEditPhone(false)}>
                <DialogTitle>Editar Teléfono</DialogTitle>
                <DialogContent><TextField margin="dense" label="Teléfono" fullWidth variant="outlined" value={phoneValue} onChange={e => setPhoneValue(e.target.value)} /></DialogContent>
                <DialogActions><Button onClick={() => setOpenEditPhone(false)}>Cancelar</Button><Button onClick={handlePhoneUpdate} variant="contained" sx={{ bgcolor: PRIMARY_COLOR }}>Actualizar</Button></DialogActions>
            </Dialog>
            <Dialog open={openEditAddress} onClose={() => setOpenEditAddress(false)}>
                <DialogTitle>Editar Dirección</DialogTitle>
                <DialogContent><TextField margin="dense" label="Tipo de Dirección" fullWidth variant="outlined" value={editAddressData?.type || ''} onChange={e => setEditAddressData({ ...editAddressData, type: e.target.value })} /></DialogContent>
                <DialogActions><Button onClick={() => setOpenEditAddress(false)}>Cancelar</Button><Button onClick={handleAddressUpdate} variant="contained" sx={{ bgcolor: PRIMARY_COLOR }}>Actualizar</Button></DialogActions>
            </Dialog>
            <Dialog open={openAddressDialog} onClose={() => setOpenAddressDialog(false)}>
                <DialogTitle>Agregar Nueva Dirección</DialogTitle>
                <DialogContent><TextField margin="dense" label="Tipo de Dirección" fullWidth variant="outlined" /></DialogContent>
                <DialogActions><Button onClick={() => setOpenAddressDialog(false)}>Cancelar</Button><Button onClick={handleAddressAdd} variant="contained" sx={{ bgcolor: PRIMARY_COLOR }}>Agregar</Button></DialogActions>
            </Dialog>
            <Dialog open={openBankDialog} onClose={() => setOpenBankDialog(false)}>
                <DialogTitle>Actualizar Datos Bancarios</DialogTitle>
                <DialogContent><TextField margin="dense" label="Nombre del Banco" fullWidth variant="outlined" /></DialogContent>
                <DialogActions><Button onClick={() => setOpenBankDialog(false)}>Cancelar</Button><Button onClick={handleBankInfoUpdate} variant="contained" sx={{ bgcolor: PRIMARY_COLOR }}>Actualizar</Button></DialogActions>
            </Dialog>

        </Container>
    );
}