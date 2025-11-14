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

// Este componente recibe:
// - open: (boolean) para saber si está abierto
// - onClose: (función) para cerrarlo
// - onSubmit: (función) la función 'createUser' del hook
// - isSubmitting: (boolean) el estado 'isSubmitting' del hook
// - submitError: (error) el estado 'submitError' del hook
export const UserFormModal = ({ open, onClose, onSubmit, isSubmitting, submitError }) => {
    const [formData, setFormData] = useState({
        correo: '',
        password: '',
        rol: 'ADMIN',
    });

    // Limpiar el formulario si cerramos el modal
    useEffect(() => {
        if (!open) {
            setFormData({ correo: '', password: '', rol: 'ADMIN' });
        }
    }, [open]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData); // Llama a 'createUser'
            onClose(); // Cierra el modal solo si tiene éxito
        } catch (error) {
            // El error ya se maneja en el hook y se muestra (submitError)
            console.error("Fallo al crear usuario:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Crear Nuevo Usuario</DialogTitle>
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
                    <TextField
                        margin="dense"
                        name="password"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
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
                        </Select>
                    </FormControl>

                    {/* Mostrar error de envío */}
                    {submitError && (
                        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                            Error: {submitError.message}
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
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={24} /> : 'Crear Usuario'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};