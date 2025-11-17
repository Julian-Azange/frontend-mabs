// src/presentation/pages/admin/GestionUsuarios.jsx
import React, { useState } from 'react';
import {
    Paper, Box, Button, Typography, CircularProgress, IconButton, Fab,
    Dialog, DialogTitle, DialogContent, DialogActions, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

import { useUsers } from '../../../app/hooks/useUsers';
import { UserFormModal } from '../../components/admin/UserFormModal';
import { UserEditModal } from '../../components/admin/UserEditModal';
import { DataTable } from '../../components/admin/DataTable';

const PRIMARY_COLOR = '#C43670'; // Raspberry Rose
const SUCCESS_COLOR = '#28a745'; // Verde para ACTIVO

export const GestionUsuarios = () => {
    const {
        users, loadingList, errorList, deleteUser, isSubmitting, isUpdating,  isDeleting, createUser, updateUser
    } = useUsers();

    // Estados de Modales y Confirmación
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [userToDeleteId, setUserToDeleteId] = useState(null);

    // --- Handlers de Acciones (Logica funcional) ---
    const handleEditClick = (id) => {
        const userToEdit = users.find(user => user._id === id);
        setCurrentUser(userToEdit);
        setEditModalOpen(true);
    };

    const confirmDelete = (id) => {
        setUserToDeleteId(id);
        setOpenConfirmDialog(true);
    };

    const handlePerformDelete = async () => {
        if (!userToDeleteId) return;
        setOpenConfirmDialog(false);
        try {
            await deleteUser(userToDeleteId);
        } catch (error) {
            console.error("Error al desactivar:", error);
        }
        setUserToDeleteId(null);
    };

    // --- Definición de Columnas ---
    const columns = [
        {
            field: '_id', headerName: 'ID Ref.', minWidth: 100, flex: 1,
            renderCell: (params) => (<Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#636e72' }}> {params.value.substring(0, 8)}... </Typography>)
        },

        { field: 'correo', headerName: 'Correo', minWidth: 180, flex: 1.5 },

        // ESTADO (Badge Verde/Rojo)
        {
            field: 'estado', headerName: 'Estado', minWidth: 130, flex: 1.2,
            renderCell: (params) => {
                const isActive = params.value;
                const config = isActive
                    ? { text: "ACTIVO", bg: `${SUCCESS_COLOR}15`, color: SUCCESS_COLOR, icon: <CheckIcon sx={{ fontSize: 12 }} /> }
                    : { text: "INACTIVO", bg: "rgba(255, 0, 0, 0.15)", color: "#d32f2f", icon: <CloseIcon sx={{ fontSize: 12 }} /> };
                return (
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 6px", borderRadius: "12px", backgroundColor: config.bg, color: config.color, fontWeight: 600, fontSize: "0.65rem", lineHeight: 1 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: config.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.55rem" }}>
                            {config.icon}
                        </Box>
                        {config.text}
                    </Box>
                );
            }
        },

        { field: 'cantidadPagadas', headerName: 'Pagos', type: 'number', minWidth: 80, flex: 0.7, align: 'center', headerAlign: 'center' },

        // VERIFICADO (Iconos de Check/Close)
        {
            field: 'verificado', headerName: 'Verificado', minWidth: 100, flex: 1,
            renderCell: (params) => {
                const isVerified = params.value;
                return isVerified ? (<VerifiedIcon sx={{ color: PRIMARY_COLOR, fontSize: '1.2rem' }} />) : (<NewReleasesIcon sx={{ color: '#9da4ae', fontSize: '1.2rem' }} />);
            }
        },

        // ÚLTIMA SESIÓN (Corrección de valueGetter)
        {
            field: 'tiempoSesion',
            headerName: 'Última Sesión',
            minWidth: 150,
            flex: 2,
            valueGetter: (dateString) => {
                if (dateString) {
                    return new Date(dateString).toLocaleString('es-CO');
                } else {
                    return 'Nunca';
                }
            }
        },

        // ACCIONES
        {
            field: 'actions', headerName: 'Acciones', type: 'actions', width: 100, sortable: false, filterable: false, disableColumnMenu: true,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton onClick={() => handleEditClick(params.id)} sx={{ color: PRIMARY_COLOR, '&:hover': { bgcolor: `${PRIMARY_COLOR}10` } }} size="small"> <EditIcon fontSize="small" /> </IconButton>
                    <IconButton onClick={() => confirmDelete(params.id)} color="error" disabled={isDeleting} size="small">
                        {isDeleting && userToDeleteId === params.id ? (<CircularProgress size={16} color="inherit" />) : (<DeleteIcon fontSize="small" />)}
                    </IconButton>
                </Box>
            )
        }
    ];

    if (loadingList) return (<Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}> <CircularProgress sx={{ color: PRIMARY_COLOR }} /> </Box>);

    return (
        <Paper
            sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: 'white',
                width: '100%',
                position: 'relative', // CLAVE: Contenedor para el FAB
            }}
        >
            <Box sx={{ width: '100%' }}>

                {/* --- HEADER DESKTOP Y MÓVIL --- */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    {/* Título Responsivo */}
                    <Typography variant="h5" sx={{ fontWeight: 600, fontSize: { xs: '1.2rem', sm: '1.75rem' } }}>Gestión de Usuarios</Typography>

                    {/* Botón de Escritorio */}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setCreateModalOpen(true)}
                        sx={{
                            display: { xs: 'none', sm: 'flex' }, // Ocultar en móvil
                            bgcolor: PRIMARY_COLOR,
                            '&:hover': { bgcolor: '#A53460' },
                            py: 1, px: 2, borderRadius: 1, fontWeight: 600
                        }}
                    >
                        Crear Usuario
                    </Button>
                </Box>

                {errorList && <Alert severity="error" sx={{ mb: 2 }}>Error al cargar usuarios: {errorList.message}</Alert>}

                {/* --- CONTENEDOR DE LA TABLA CON SCROLL HORIZONTAL --- */}
                <Box
                    sx={{
                        borderRadius: 1,
                        overflowX: 'auto', // CLAVE: Permite scroll horizontal en móviles
                        border: '1px solid #e0e0e0',
                        width: '100%'
                    }}
                >
                    {/* DataGrid envuelto con minWidth para forzar el scroll horizontal */}
                    <Box sx={{ minWidth: 900, height: 'auto' }}>
                        <DataTable
                            rows={users.map(u => ({ ...u, id: u._id }))}
                            columns={columns}
                            getRowId={(row) => row._id}
                        />
                    </Box>
                </Box>

                {/* --- BOTÓN FLOTANTE (FAB) PARA MÓVIL --- */}
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => setCreateModalOpen(true)}
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        bgcolor: PRIMARY_COLOR,
                        '&:hover': { bgcolor: '#A53460' },
                        display: { xs: 'flex', sm: 'none' } // Mostrar solo en móvil
                    }}
                >
                    <AddIcon />
                </Fab>

                {/* Diálogos y Modales */}
                <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} maxWidth="xs" PaperProps={{ sx: { borderRadius: 2, boxShadow: 10, p: 2, textAlign: 'center' } }}>
                    <WarningAmberRoundedIcon color="error" sx={{ fontSize: 40, mx: 'auto', mt: 1, mb: 1 }} />
                    <DialogTitle sx={{ p: 0, fontWeight: 700, fontSize: '1.25rem' }}>Confirmar Desactivación</DialogTitle>
                    <DialogContent sx={{ p: 0, mt: 1, mb: 3 }}>
                        <Typography variant="body1" color="text.secondary">Esta acción desactivará el usuario y no podrá acceder. ¿Deseas continuar?</Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 0, justifyContent: 'center', gap: 1 }}>
                        <Button onClick={() => setOpenConfirmDialog(false)} variant="outlined">Cancelar</Button>
                        <Button onClick={handlePerformDelete} variant="contained" color="error">Sí, Desactivar</Button>
                    </DialogActions>
                </Dialog>

                <UserFormModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} onSubmit={createUser} isSubmitting={isSubmitting} />
                <UserEditModal open={editModalOpen} onClose={() => setEditModalOpen(false)} user={currentUser} onSubmit={updateUser} isUpdating={isUpdating} />
            </Box>
        </Paper>
    );
};

export default GestionUsuarios;