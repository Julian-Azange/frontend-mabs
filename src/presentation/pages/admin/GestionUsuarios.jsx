// src/presentation/pages/admin/GestionUsuarios.jsx
import React, { useState } from 'react';
import {
    Box, Button, Typography, CircularProgress, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { CheckCircle, HourglassEmpty, VpnKey, PersonOutlined, Verified, NewReleases } from '@mui/icons-material';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useUsers } from '../../../app/hooks/useUsers';
import { UserFormModal } from '../../components/admin/UserFormModal';
import { UserEditModal } from '../../components/admin/UserEditModal';
import { DataTable } from '../../components/admin/DataTable'; // Usaremos este componente estilizado

const PRIMARY_COLOR = '#C43670'; // Raspberry Rose
const SECONDARY_COLOR = '#4318FF'; // Azul (para verificación, si Raspberry Rose es demasiado)

export const GestionUsuarios = () => {
    const {
        users, loadingList, errorList, isSubmitting, deleteUser,
        isDeleting, submitError, isUpdating, createUser, updateUser, updateError
    } = useUsers();

    // Estados de Modales y Confirmación (Manteniendo la funcionalidad)
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
            // Aquí se mostraría un Snackbar de éxito
        } catch (error) {
            // Aquí se mostraría un Snackbar o Dialog de error
            console.error("Error al desactivar:", error);
        }
        setUserToDeleteId(null);
    };

    // --- Definición de Columnas (Estilos Minimalistas y Funcionalidad) ---
    const columns = [
        // 1. ID DE REFERENCIA (Compacto)
        {
            field: '_id',
            headerName: 'ID Ref.',
            minWidth: 100,
            flex: 1,
            // Utilizamos renderCell para mostrar solo una parte del ID largo
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#636e72' }}>
                    {params.value.substring(0, 8)}...
                </Typography>
            )
        },

        // 2. CORREO
        {
            field: 'correo', headerName: 'Correo', minWidth: 180,
            maxWidth: 260, flex: 1
        },

        // 3. ESTADO (Badge de color)
        {
            field: 'estado',
            headerName: 'Estado',
            minWidth: 130,
            flex: 1.2,
            renderCell: (params) => {
                const isActive = params.value;

                const config = isActive
                    ? {
                        text: "ACTIVO",
                        bg: "rgba(0, 200, 0, 0.15)",
                        color: "#0f8f00",
                        icon: <CheckIcon sx={{ fontSize: 12 }} />
                    }
                    : {
                        text: "INACTIVO",
                        bg: "rgba(255, 0, 0, 0.15)",
                        color: "#d32f2f",
                        icon: <CloseIcon sx={{ fontSize: 12 }} />
                    };

                return (
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "2px 6px",
                            borderRadius: "12px",
                            backgroundColor: config.bg,
                            color: config.color,
                            fontWeight: 600,
                            fontSize: "0.65rem",   // Reducido
                            lineHeight: 1,
                        }}
                    >
                        <Box
                            sx={{
                                width: 12,             // Reducido
                                height: 12,            // Reducido
                                borderRadius: "50%",
                                backgroundColor: config.color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: "0.55rem",   // Reducido
                            }}
                        >
                            {config.icon}
                        </Box>

                        {config.text}
                    </Box>
                );
            }
        },


        // 4. PAGOS (Alineado al centro)
        { field: 'cantidadPagadas', headerName: 'Pagos', type: 'number', minWidth: 80, flex: 0.7, align: 'center', headerAlign: 'center' },

        // 5. VERIFICADO (Icono Azul)
        {
            field: 'verificado',
            headerName: 'Verificado',
            minWidth: 100,
            flex: 1,
            renderCell: (params) => {
                const isVerified = params.value;
                return isVerified ? (
                    <VerifiedIcon sx={{ color: 'rgba(66, 49, 255, 1)', fontSize: '1.2rem' }} />
                ) : (
                    <NewReleasesIcon sx={{ color: '#9da4ae', fontSize: '1.2rem' }} />
                );
            }
        },

        // 6. ÚLTIMA SESIÓN
        {
            field: 'tiempoSesion',
            headerName: 'Última Sesión',
            flex: 0.6,
            minWidth: 160,
            sortable: false,
            // ...
            valueGetter: (value) => { // 'value' es el string de la fecha
                // 'value' puede ser null o undefined para algunas filas
                return new Date(value).toLocaleString('es-CO'); // <--- ¡Falla si 'value' es null/undefined!
            }
        },

        // 7. ACCIONES (Botones Personalizados)
        {
            field: 'actions',
            headerName: 'Acciones',
            type: 'actions',
            width: 100, // Anchura fija para acciones
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {/* Botón de Editar (Lápiz) */}
                    <IconButton
                        onClick={() => handleEditClick(params.id)}
                        sx={{ color: PRIMARY_COLOR, '&:hover': { bgcolor: `${PRIMARY_COLOR}10` } }}
                        size="small"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    {/* Botón de Eliminar/Desactivar (Papelera) */}
                    <IconButton
                        onClick={() => confirmDelete(params.id)}
                        color="error"
                        disabled={isDeleting}
                        size="small"
                    >
                        {isDeleting && userToDeleteId === params.id ?
                            <CircularProgress size={16} color="inherit" />
                            : <DeleteIcon fontSize="small" />
                        }
                    </IconButton>
                </Box>
            )
        }
    ];

    // --- Renderizado y Lógica de Carga ---
    if (loadingList) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress sx={{ color: PRIMARY_COLOR }} />
        </Box>
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>Gestión de Usuarios</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setCreateModalOpen(true)}
                    sx={{
                        bgcolor: PRIMARY_COLOR,
                        '&:hover': { bgcolor: '#A53460' },
                        py: 1,
                        px: 2,
                        borderRadius: 1, // Redondeo sutil
                        fontWeight: 600
                    }}
                >
                    Crear Usuario
                </Button>
            </Box>

            {errorList && <Alert severity="error" sx={{ mb: 2 }}>Error al cargar usuarios: {errorList.message}</Alert>}

            {/* Contenedor de la Tabla con estilo limpio */}
            <Box
                sx={{
                    borderRadius: 1, // Redondeo sutil
                    overflow: 'auto', // Permite el scroll horizontal en móviles
                    border: '1px solid #e0e0e0',
                    width: '100%'
                }}
            >
                <DataTable
                    rows={users.map(u => ({ ...u, id: u._id }))}
                    columns={columns}
                    getRowId={(row) => row._id}
                />
            </Box>

            {/* Diálogo de Confirmación Minimalista */}
            <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
                maxWidth="xs"
                PaperProps={{ sx: { borderRadius: 2, boxShadow: 10, p: 2, textAlign: 'center' } }}
            >
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

            {/* Modales de Creación y Edición (se asume que usan InputField para estética) */}
            <UserFormModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} onSubmit={createUser} isSubmitting={isSubmitting} submitError={submitError} />
            <UserEditModal open={editModalOpen} onClose={() => setEditModalOpen(false)} user={currentUser} onSubmit={updateUser} isUpdating={isUpdating} updateError={updateError} />
        </Box>
    );
};

export default GestionUsuarios;