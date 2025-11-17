// src/presentation/pages/perfil/Perfil.jsx
import React, { useState } from 'react';
import {
    Container, Paper, Typography, Box, Avatar, Button, Grid,
    IconButton, Tabs, Tab, Divider, List, ListItem, ListItemText,
    ListItemIcon, TextField, Dialog, DialogTitle, DialogContent,
    DialogActions, Snackbar, Alert
} from '@mui/material';
import {
    Person, Email, Phone, LocationOn, Edit, CameraAlt, Security, Payment,
    AccountBalance, History, Add, Logout, WarningAmberRounded, CheckCircle,
    ErrorOutline as ErrorOutlineIcon
} from '@mui/icons-material';
import { useAuth } from '../../../app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

// --- Importaciones de Validación ---
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../../components/common/InputField';


// --- CONSTANTES ---
const PRIMARY_COLOR = '#C43670'; // Raspberry Rose
const CRITICAL_ERROR_TITLE = '⚠️ Error en la Operación';
const CONFIRM_LOGOUT_TITLE = 'Cerrar Sesión';
const CONFIRM_LOGOUT_MESSAGE = '¿Estás seguro de que quieres cerrar tu sesión actual?';

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


// --- DATOS DUMMY (Mantenidos) ---
const userBankInfo = { bankName: "Banco XYZ", accountNumber: "**** **** **** 1234", accountType: "Cuenta de Ahorros" };
const paymentHistory = [{ id: 1, date: "2025-10-25", amount: 150.00, status: "Pagado" }];
const addresses = [{ id: 1, type: "Casa", street: "Calle Principal 123", city: "Ciudad Ejemplo", state: "Estado", zipCode: "12345" }];
// ------------------------------------


export default function Perfil() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // --- ESTADOS DE LA UI ---
    const [activeTab, setActiveTab] = useState(0);
    const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [openBankDialog, setOpenBankDialog] = useState(false);
    const [openAddressDialog, setOpenAddressDialog] = useState(false);
    const [openEditName, setOpenEditName] = useState(false);
    const [openEditPhone, setOpenEditPhone] = useState(false);
    const [openEditAddress, setOpenEditAddress] = useState(false);
    const [editAddressData, setEditAddressData] = useState(null);
    const [nameValue, setNameValue] = useState(user?.name || '');
    const [phoneValue, setPhoneValue] = useState(user?.phone || '');

    // Diálogos de confirmación
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [confirmAction, setConfirmAction] = useState(() => () => { });
    const [confirmTitle, setConfirmTitle] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');

    // Snackbar
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    // RHF para el formulario de contraseña
    const passwordForm = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' }
    });
    const { handleSubmit: handlePasswordSubmit, control: passwordControl, reset: resetPasswordForm } = passwordForm;

    // RHF para el formulario de nombre
    const nameForm = useForm({
        resolver: zodResolver(nameSchema),
        defaultValues: { name: user?.name || '' }
    });
    const { handleSubmit: handleNameSubmit, control: nameControl, reset: resetNameForm } = nameForm;


    if (!user) {
        navigate('/login');
        return null;
    }

    // --- HANDLERS DE SNACKBAR ---
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    // --- MANEJO DE LOGOUT (Sustituto de Swal) ---
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
    // -----------------------------------------------------------------


    // --- HANDLERS DE FORMULARIOS RHF ---

    const handlePasswordUpdate = async (data) => {
        setOpenPasswordDialog(false);
        try {
            // Llama a tu servicio aquí: await updatePassword(data);
            setSnackbar({ open: true, message: 'Contraseña actualizada correctamente.', severity: 'success' });
            resetPasswordForm();
        } catch (error) {
            setSnackbar({ open: true, message: error.message || 'Error al actualizar la contraseña.', severity: 'error' });
        }
    };

    const onPasswordFormInvalid = (errors) => {
        const firstErrorKey = Object.keys(errors)[0];
        const errorMessage = errors[firstErrorKey].message;
        setSnackbar({ open: true, message: errorMessage, severity: 'warning' });
    };

    const handleNameUpdateRHF = async (data) => {
        setOpenEditName(false);
        try {
            // Llama a tu servicio aquí: await updateName(data.name);
            setSnackbar({ open: true, message: 'Nombre actualizado correctamente.', severity: 'success' });
            setNameValue(data.name); // Actualizar estado local
        } catch (error) {
            setSnackbar({ open: true, message: error.message || 'Error al actualizar el nombre.', severity: 'error' });
        }
    };

    const onNameFormInvalidRHF = (errors) => {
        setSnackbar({ open: true, message: errors.name.message, severity: 'warning' });
    };

    // --- HANDLERS DE ACCIONES SIMPLES (usando Snackbar) ---

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSnackbar({ open: true, message: 'Foto de perfil actualizada.', severity: 'success' });
            setOpenPhotoDialog(false);
        }
    };

    const handlePhoneUpdate = () => {
        // Lógica de validación manual simple
        if (phoneValue.length < 5) {
            setSnackbar({ open: true, message: 'Ingresa un número de teléfono válido.', severity: 'warning' });
            return;
        }
        setSnackbar({ open: true, message: 'Teléfono actualizado.', severity: 'success' });
        setOpenEditPhone(false);
    };

    const handleBankInfoUpdate = () => {
        // En un caso real, validarías los inputs de los TextField antes de llamar a esto.
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                {/* ... (Avatar y botón de Cámara) ... */}
            </Box>

            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="error" onClick={confirmLogout}>
                    Cerrar Sesión
                </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <List>
                        {/* Editar Nombre */}
                        <ListItem>
                            <ListItemIcon><Person /></ListItemIcon>
                            <ListItemText primary="Nombre Completo" secondary={nameValue} />
                            <IconButton size="small" onClick={() => { setNameValue(user?.name || ''); setOpenEditName(true); }}>
                                <Edit fontSize="small" />
                            </IconButton>
                        </ListItem>
                        {/* Correo */}
                        <ListItem>
                            <ListItemIcon><Email /></ListItemIcon>
                            <ListItemText primary="Correo Electrónico" secondary={user.email} />
                        </ListItem>
                        {/* Editar Teléfono */}
                        <ListItem>
                            <ListItemIcon><Phone /></ListItemIcon>
                            <ListItemText primary="Teléfono" secondary={phoneValue || "No configurado"} />
                            <IconButton size="small" onClick={() => { setPhoneValue(user?.phone || ''); setOpenEditPhone(true); }}>
                                <Edit fontSize="small" />
                            </IconButton>
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
                        <Paper key={address.id} sx={{ p: 2, mb: 2, backgroundColor: '#FBF4EB' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle2" sx={{ color: PRIMARY_COLOR }}>
                                    {address.type}
                                </Typography>
                                <IconButton size="small" onClick={() => { setEditAddressData(address); setOpenEditAddress(true); }}>
                                    <Edit fontSize="small" />
                                </IconButton>
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
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>Contraseña</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    La última actualización fue hace 30 días
                </Typography>
                <Button
                    variant="outlined"
                    sx={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
                    startIcon={<Security />}
                    onClick={() => setOpenPasswordDialog(true)}
                >
                    Cambiar Contraseña
                </Button>
            </Paper>

            <Button variant="outlined" color="error" onClick={confirmLogout} fullWidth sx={{ mt: 2 }}>
                Cerrar Sesión
            </Button>
        </Box>
    );

    // ... (renderPaymentInfo, etc.)

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper sx={{ p: 3 }}>
                {/* ... (Tabs de navegación) ... */}
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


            {/* 5. DIALOGO DE EDITAR TELÉFONO (Funcionalidad Original + Snackbar) */}
            <Dialog open={openEditPhone} onClose={() => setOpenEditPhone(false)}>
                <DialogTitle>Editar Teléfono</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" label="Teléfono" fullWidth variant="outlined" value={phoneValue} onChange={e => setPhoneValue(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditPhone(false)}>Cancelar</Button>
                    <Button onClick={handlePhoneUpdate} variant="contained" sx={{ bgcolor: PRIMARY_COLOR }}>Actualizar</Button>
                </DialogActions>
            </Dialog>


            {/* 6. DIALOGO DE EDITAR DIRECCIÓN (Funcionalidad Original + Snackbar) */}
            <Dialog open={openEditAddress} onClose={() => setOpenEditAddress(false)}>
                <DialogTitle>Editar Dirección</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" label="Tipo de Dirección" fullWidth variant="outlined" value={editAddressData?.type || ''} onChange={e => setEditAddressData({ ...editAddressData, type: e.target.value })} />
                    {/* ... (Resto de campos de dirección) ... */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditAddress(false)}>Cancelar</Button>
                    <Button onClick={handleAddressUpdate} variant="contained" sx={{ bgcolor: PRIMARY_COLOR }}>Actualizar</Button>
                </DialogActions>
            </Dialog>


            {/* 7. DIALOGO DE AGREGAR DIRECCIÓN (Funcionalidad Original + Snackbar) */}
            <Dialog open={openAddressDialog} onClose={() => setOpenAddressDialog(false)}>
                <DialogTitle>Agregar Nueva Dirección</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" label="Tipo de Dirección" fullWidth variant="outlined" />
                    {/* ... (Resto de campos de dirección) ... */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddressDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAddressAdd} variant="contained" sx={{ bgcolor: PRIMARY_COLOR }}>Agregar</Button>
                </DialogActions>
            </Dialog>


            {/* 8. DIALOGO DE DATOS BANCARIOS (Funcionalidad Original + Snackbar) */}
            <Dialog open={openBankDialog} onClose={() => setOpenBankDialog(false)}>
                <DialogTitle>Actualizar Datos Bancarios</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" label="Nombre del Banco" fullWidth variant="outlined" />
                    <TextField margin="dense" label="Número de Cuenta" fullWidth variant="outlined" />
                    <TextField margin="dense" label="Tipo de Cuenta" fullWidth variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenBankDialog(false)}>Cancelar</Button>
                    <Button onClick={handleBankInfoUpdate} variant="contained" sx={{ bgcolor: PRIMARY_COLOR }}>Actualizar</Button>
                </DialogActions>
            </Dialog>

            {/* 9. DIALOGO DE FOTO DE PERFIL (Funcionalidad Original + Snackbar) */}
            <Dialog open={openPhotoDialog} onClose={() => setOpenPhotoDialog(false)}>
                <DialogTitle>Cambiar Foto de Perfil</DialogTitle>
                <DialogContent>
                    <Button variant="outlined" component="label" fullWidth sx={{ mt: 2, color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}>
                        Seleccionar Foto
                        <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                    </Button>
                </DialogContent>
            </Dialog>

        </Container>
    );
}