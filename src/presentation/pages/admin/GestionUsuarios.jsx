import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// 1. Importamos el hook y AMBOS modales
import { useUsers } from '../../../app/hooks/useUsers';
import { UserFormModal } from '../../components/admin/UserFormModal';
import { UserEditModal } from '../../components/admin/UserEditModal'; // <-- Nuevo modal
import { DataTable } from '../../components/admin/DataTable';

export const GestionUsuarios = () => {
    // 2. Destructuramos TODAS las funciones y estados del hook
    const {
        users,
        loadingList,
        errorList,
        isSubmitting,
        submitError,
        createUser,
        isUpdating,
        updateError,
        updateUser,
        isDeleting,
        deleteError,
        deleteUser
    } = useUsers();

    // 3. Estados locales para los modales
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // Para saber a quién editar

    // --- Manejadores de Acciones ---
    const handleEditClick = (id) => {
        const userToEdit = users.find(user => user.id === id);
        setCurrentUser(userToEdit);
        setEditModalOpen(true);
    };

    const handleDeleteClick = async (id) => {
        // Pedimos confirmación
        if (window.confirm('¿Estás seguro de que deseas desactivar este usuario?')) {
            try {
                await deleteUser(id);
                // (Opcional: mostrar un toast de éxito)
            } catch (error) {
                // (Opcional: mostrar un toast de error)
                console.error("Error al desactivar:", error);
            }
        }
    };

    // --- Definición de Columnas (con 'isDeleting' en el botón) ---
    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'correo', headerName: 'Correo', width: 300 },
        { field: 'rol', headerName: 'Rol', width: 150 },
        { /* ... Columna de Estado ... */ },
        {
            field: 'actions',
            headerName: 'Acciones',
            type: 'actions',
            width: 120,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        onClick={() => handleEditClick(params.id)}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteClick(params.id)}
                        color="error"
                        disabled={isDeleting} // Deshabilitar si se está borrando algo
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )
        }
    ];

    // --- Renderizado ---
    if (loadingList) return <CircularProgress />;
    if (errorList) return <Typography color="error">Error: {errorList.message}</Typography>;

    return (
        <Box sx={{ p: 3, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Gestión de Usuarios</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setCreateModalOpen(true)} // Abre el modal de CREAR
                >
                    Crear Usuario
                </Button>
            </Box>

            <DataTable rows={users} columns={columns} />

            {/* Modal de CREACIÓN */}
            <UserFormModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={createUser}
                isSubmitting={isSubmitting}
                submitError={submitError}
            />

            {/* Modal de EDICIÓN */}
            <UserEditModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                user={currentUser} // Pasamos el usuario seleccionado
                onSubmit={updateUser} // Pasamos la función de actualizar
                isUpdating={isUpdating}
                updateError={updateError}
            />
        </Box>
    );
};

export default GestionUsuarios;