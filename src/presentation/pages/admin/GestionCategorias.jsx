import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Switch,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
} from '@mui/material';
import { Edit, Delete, Search, Add } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function GestionCategorias() {
    const [query, setQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [dialogType, setDialogType] = useState('add'); // 'add', 'edit', 'delete'

    const [categorias, setCategorias] = useState([
        {
            id: '#ce8d812a',
            nombre: 'Muñeca bebé',
            imagen: '/assets/images/categories/muneca.png',
            nivel: 1,
            destacado: false
        },
        {
            id: '#4c9681ac',
            nombre: 'Regalo de cumpleaños',
            imagen: '/assets/images/categories/regalo-cumple.png',
            nivel: 1,
            destacado: true
        },
        {
            id: '#f7b1da64',
            nombre: 'Cosméticos',
            imagen: '/assets/images/categories/cosmeticos.png',
            nivel: 1,
            destacado: true
        },
        {
            id: '#c8305a8a',
            nombre: 'Regalo de pareja',
            imagen: '/assets/images/categories/regalo-pareja.png',
            nivel: 1,
            destacado: true
        },
        {
            id: '#e6d2c2e3',
            nombre: 'Aparatos',
            imagen: '/assets/images/categories/aparatos.png',
            nivel: 1,
            destacado: true
        },
        {
            id: '#96c813a8',
            nombre: 'Moda masculina',
            imagen: '/assets/images/categories/moda-masculina.png',
            nivel: 1,
            destacado: true
        },
        {
            id: '#76f4a1dd',
            nombre: 'Moda femenina',
            imagen: '/assets/images/categories/moda-femenina.png',
            nivel: 1,
            destacado: false
        }
    ]);

    // Funciones para manejar acciones
    const handleAdd = () => {
        setSelectedCategory({
            id: '#' + Math.random().toString(16).slice(2, 10),
            nombre: '',
            imagen: '',
            nivel: 1,
            destacado: false
        });
        setDialogType('add');
        setOpenDialog(true);
    };

    const handleEdit = (categoria) => {
        setSelectedCategory(categoria);
        setDialogType('edit');
        setOpenDialog(true);
    };

    const handleDelete = (categoria) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setCategorias(prev => prev.filter(c => c.id !== categoria.id));
                Swal.fire(
                    '¡Eliminado!',
                    'La categoría ha sido eliminada.',
                    'success'
                );
            }
        });
    };

    const handleToggleDestacado = (id, currentStatus) => {
        setCategorias(prev => prev.map(c =>
            c.id === id ? { ...c, destacado: !currentStatus } : c
        ));
        toast.success(`Categoría ${currentStatus ? 'removida de' : 'marcada como'} destacada`);
    };

    const handleSave = () => {
        if (dialogType === 'add') {
            setCategorias(prev => [...prev, selectedCategory]);
            toast.success('Categoría creada exitosamente');
        } else {
            setCategorias(prev => prev.map(c =>
                c.id === selectedCategory.id ? selectedCategory : c
            ));
            toast.success('Categoría actualizada exitosamente');
        }
        setOpenDialog(false);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setSelectedCategory(null);
    };

    const filteredCategorias = categorias.filter(
        categoria => categoria.nombre.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Categorías de productos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAdd}
                    sx={{
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' },
                        borderRadius: '8px'
                    }}
                >
                    Agregar Categoría
                </Button>
            </Box>

            {/* Buscador */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar categoría..."
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: '8px',
                            bgcolor: 'background.paper'
                        }
                    }}
                />
            </Box>

            {/* Tabla de categorías */}
            <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Imagen</TableCell>
                            <TableCell>Nivel</TableCell>
                            <TableCell>Destacado</TableCell>
                            <TableCell align="right">Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCategorias.map((categoria) => (
                            <TableRow key={categoria.id}>
                                <TableCell>{categoria.id}</TableCell>
                                <TableCell>{categoria.nombre}</TableCell>
                                <TableCell>
                                    <Box
                                        component="img"
                                        src={categoria.imagen}
                                        alt={categoria.nombre}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1,
                                            objectFit: 'cover'
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{categoria.nivel}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={categoria.destacado}
                                        onChange={() => handleToggleDestacado(categoria.id, categoria.destacado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        sx={{ color: 'primary.main' }}
                                        onClick={() => handleEdit(categoria)}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        sx={{ color: 'error.main' }}
                                        onClick={() => handleDelete(categoria)}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Diálogo para agregar/editar categoría */}
            <Dialog
                open={openDialog}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {dialogType === 'add' ? 'Agregar Nueva Categoría' : 'Editar Categoría'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 200,
                                overflow: 'hidden',
                                borderRadius: 1,
                                border: '2px dashed',
                                borderColor: 'divider',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                            onClick={() => document.getElementById('categoria-imagen-input').click()}
                        >
                            {selectedCategory?.imagenPreview || selectedCategory?.imagen ? (
                                <>
                                    <img
                                        src={selectedCategory.imagenPreview || selectedCategory.imagen}
                                        alt={selectedCategory.nombre}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            bgcolor: 'rgba(0,0,0,0.3)',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0,
                                            transition: '0.3s',
                                            '&:hover': {
                                                opacity: 1
                                            }
                                        }}
                                    >
                                        <Typography>Cambiar imagen</Typography>
                                    </Box>
                                </>
                            ) : (
                                <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                                    <Add sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography>Haga clic para subir una imagen</Typography>
                                </Box>
                            )}
                            <input
                                id="categoria-imagen-input"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            setSelectedCategory(prev => ({
                                                ...prev,
                                                imagen: file,
                                                imagenPreview: e.target.result
                                            }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </Box>
                        <TextField
                            label="Nombre"
                            fullWidth
                            value={selectedCategory?.nombre || ''}
                            onChange={(e) => setSelectedCategory(prev => ({
                                ...prev,
                                nombre: e.target.value
                            }))}
                        />
                        <TextField
                            label="Nivel"
                            fullWidth
                            type="number"
                            value={selectedCategory?.nivel || 1}
                            onChange={(e) => setSelectedCategory(prev => ({
                                ...prev,
                                nivel: parseInt(e.target.value)
                            }))}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        {dialogType === 'add' ? 'Agregar' : 'Guardar'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Paginación */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        '& button': {
                            minWidth: 40,
                            height: 50,
                            borderRadius: '50%',
                            border: 1,
                            borderColor: 'divider',
                            color: 'text.secondary',
                            '&.active': {
                                bgcolor: 'primary.main',
                                color: 'white',
                                borderColor: 'primary.main'
                            }
                        }
                    }}
                >
                    <Button>&lt;</Button>
                    <Button className="active">1</Button>
                    <Button>&gt;</Button>
                </Box>
            </Box>
        </Box>
    );
}