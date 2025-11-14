import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    CircularProgress,
    Box
} from '@mui/material';

// Recibe el 'user' para precargar los datos
export const UserEditModal = ({ open, onClose, onSubmit, user, isUpdating, updateError }) => {
    const [formData, setFormData] = useState({
        correo: '',
        rol: '',
        // No incluimos la contraseña, la API de 'update'
        // usualmente no la requiere o la maneja por separado.
        // Ajusta esto si tu API SÍ permite cambiarla aquí.
    });

    // Efecto para cargar los datos del usuario cuando el modal se abre
    useEffect(() => {
        if (user) {
            setFormData({
                correo: user.correo || '',
                rol: user.rol || 'CLIENTE', // Asegúrate de tener un valor por defecto
            });
        } else {
            // Limpiar si no hay usuario (aunque no debería pasar)
            setFormData({ correo: '', rol: '' });
        }
    }, [user, open]); // Se re-ejecuta si el 'user' o 'open' cambian

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return; // Seguridad

        try {
            // Llama a 'updateUser' con el ID y los datos
            await onSubmit(user.id, formData);
            onClose(); // Cierra el modal solo si tiene éxito
        } catch (error) {
            console.error("Fallo al actualizar usuario:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Editar Usuario: {user?.correo}</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="correo"
                        label="Correo Electrónico"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />

                    {/* Nota: Es común que el campo 'password' no esté en el modal de 'editar'.
                        Si tu API lo permite, puedes añadirlo.
                        Si lo añades, probablemente solo deba enviarse si no está vacío. */}

                    <FormControl fullWidth margin="dense" required>
                        <InputLabel>Rol</InputLabel>
                        <Select
                            name="rol"
                            value={formData.rol}
                            label="Rol"
                            onChange={handleChange}
                        >
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                            <MenuItem value="DESARROLLADOR">DESARROLLADOR</MenuItem>
                            <MenuItem value="CLIENTE">CLIENTE</MenuItem>
                        </Select>
                    </FormControl>

                    {updateError && (
                        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                            Error: {updateError.message}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={onClose} color="inherit">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isUpdating}
                    >
                        {isUpdating ? <CircularProgress size={24} /> : 'Guardar Cambios'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};