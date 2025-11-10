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
import { Edit, Visibility, Delete, Search, Add } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function GestionProductos() {
    const [query, setQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dialogType, setDialogType] = useState('view'); // 'view', 'edit', 'delete'
    const [productos, setProductos] = useState([
        {
            id: '#MAC001',
            imagen: 'https://mac-cosmetics.imgix.net/images/products/2x/mac_sku_M2LP01_1x1_0.jpg',
            nombre: 'Labial MAC Retro Matte',
            categoria: 'Labiales',
            marca: 'MAC',
            precio: 19.00,
            publicado: true,
            descripcion: 'Labial de larga duración con acabado mate'
        },
        {
            id: '#NYX002',
            imagen: 'https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwd5e25f68/ProductImages/2016/Face/Total_Control_Drop_Foundation/800897068936_totalcontroldropfoundation_pale_main.jpg',
            nombre: 'Base Total Control',
            categoria: 'Base de Maquillaje',
            marca: 'NYX',
            precio: 15.00,
            publicado: true,
            descripcion: 'Base líquida de cobertura buildable'
        },
        {
            id: '#FEN003',
            imagen: 'https://www.sephora.com/productimages/sku/s2518959-main-zoom.jpg',
            nombre: 'Gloss Bomb Universal',
            categoria: 'Brillos',
            marca: 'Fenty Beauty',
            precio: 20.00,
            publicado: false,
            descripcion: 'Brillo labial con acabado brillante'
        },
        {
            id: '#MAY004',
            imagen: 'https://www.maybelline.com/-/media/project/loreal/brand-sites/mny/americas/us/products/eye-makeup/mascara/sky-high-washable-mascara/super-black/sky-high-mascara-super-black-041554602302-primary.jpg',
            nombre: 'Máscara Sky High',
            categoria: 'Ojos',
            marca: 'Maybelline',
            precio: 12.99,
            publicado: true,
            descripcion: 'Máscara de pestañas de alto impacto'
        },
        {
            id: '#ABH005',
            imagen: 'https://www.anastasiabeverlyhills.com/dw/image/v2/BBLL_PRD/on/demandware.static/-/Sites-anastasia-master-catalog/default/dw8e6cf5d8/images/products/2019/abh-modern-renaissance-eye-palette-a.jpg',
            nombre: 'Modern Renaissance Palette',
            categoria: 'Paletas',
            marca: 'Anastasia Beverly Hills',
            precio: 45.00,
            publicado: true,
            descripcion: 'Paleta de sombras con 14 tonos'
        },
        {
            id: '#RAR006',
            imagen: 'https://www.rarebeauty.com/cdn/shop/products/RareBeauty_LiquidBlush_Joy_OpenProduct.jpg',
            nombre: 'Soft Pinch Liquid Blush',
            categoria: 'Mejillas',
            marca: 'Rare Beauty',
            precio: 22.00,
            publicado: true,
            descripcion: 'Rubor líquido de larga duración'
        }
    ]);

    // Funciones para manejar acciones
    const handleView = (producto) => {
        setSelectedProduct(producto);
        setDialogType('view');
        setOpenDialog(true);
    };

    const handleEdit = (producto) => {
        setSelectedProduct(producto);
        setDialogType('edit');
        setOpenDialog(true);
    };

    const handleDelete = (producto) => {
        setSelectedProduct(producto);
        setDialogType('delete');
        setOpenDialog(true);
    };

    const handlePublish = (id, currentStatus) => {
        setProductos(prev => prev.map(p =>
            p.id === id ? { ...p, publicado: !currentStatus } : p
        ));
        toast.success(`Producto ${currentStatus ? 'despublicado' : 'publicado'} exitosamente`);
    };

    const handleSave = (editedProduct) => {
        setProductos(prev => prev.map(p =>
            p.id === editedProduct.id ? editedProduct : p
        ));
        setOpenDialog(false);
        toast.success('Producto actualizado exitosamente');
    };

    const handleConfirmDelete = () => {
        if (selectedProduct) {
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
                    setProductos(prev => prev.filter(p => p.id !== selectedProduct.id));
                    setOpenDialog(false);
                    Swal.fire(
                        '¡Eliminado!',
                        'El producto ha sido eliminado.',
                        'success'
                    );
                }
            });
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
        setSelectedProduct(null);
    };


    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Lista de productos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {
                        setSelectedProduct({
                            id: '#' + Math.random().toString(16).slice(2, 10),
                            imagen: '',
                            nombre: '',
                            categoria: '',
                            marca: '',
                            precio: 0,
                            publicado: false,
                            descripcion: ''
                        });
                        setDialogType('edit');
                        setOpenDialog(true);
                    }}
                    sx={{
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' },
                        borderRadius: '8px'
                    }}
                >
                    Agregar Producto
                </Button>
            </Box>

            {/* Buscador */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar producto..."
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

            {/* Tabla de productos */}
            <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Publicado</TableCell>
                            <TableCell align="right">Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box
                                            component="img"
                                            src={producto.imagen}
                                            alt={producto.nombre}
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 1,
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="body2">{producto.nombre}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {producto.id}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{producto.categoria}</TableCell>
                                <TableCell>
                                    <Box
                                        component="img"
                                        src={`/assets/images/brands/${producto.marca.toLowerCase()}.png`}
                                        alt={producto.marca}
                                        sx={{ height: 24 }}
                                    />
                                </TableCell>
                                <TableCell>${producto.precio.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={producto.publicado}
                                        size="small"
                                        onChange={() => handlePublish(producto.id, producto.publicado)}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        sx={{ color: 'primary.main' }}
                                        onClick={() => handleEdit(producto)}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        sx={{ color: 'info.main' }}
                                        onClick={() => handleView(producto)}
                                    >
                                        <Visibility fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        sx={{ color: 'error.main' }}
                                        onClick={() => handleDelete(producto)}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

            {/* Diálogo para ver/editar producto */}
            <Dialog
                open={openDialog}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {dialogType === 'view' ? 'Detalles del Producto' :
                        dialogType === 'edit' ? 'Editar Producto' :
                            'Eliminar Producto'}
                </DialogTitle>
                <DialogContent>
                    {dialogType === 'delete' ? (
                        <DialogContentText>
                            ¿Estás seguro de que quieres eliminar el producto "{selectedProduct?.nombre}"?
                        </DialogContentText>
                    ) : (
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
                                    cursor: dialogType === 'view' ? 'default' : 'pointer'
                                }}
                                onClick={() => dialogType !== 'view' && document.getElementById('producto-imagen-input').click()}
                            >
                                {selectedProduct?.imagenPreview || selectedProduct?.imagen ? (
                                    <>
                                        <img
                                            src={selectedProduct.imagenPreview || selectedProduct.imagen}
                                            alt={selectedProduct.nombre}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        {dialogType !== 'view' && (
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
                                        )}
                                    </>
                                ) : (
                                    <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                                        <Add sx={{ fontSize: 40, mb: 1 }} />
                                        <Typography>Haga clic para subir una imagen</Typography>
                                    </Box>
                                )}
                                {dialogType !== 'view' && (
                                    <input
                                        id="producto-imagen-input"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (e) => {
                                                    setSelectedProduct(prev => ({
                                                        ...prev,
                                                        imagen: file,
                                                        imagenPreview: e.target.result
                                                    }));
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                )}
                            </Box>
                            <TextField
                                label="Nombre"
                                fullWidth
                                value={selectedProduct?.nombre || ''}
                                disabled={dialogType === 'view'}
                            />
                            <TextField
                                label="Categoría"
                                fullWidth
                                value={selectedProduct?.categoria || ''}
                                disabled={dialogType === 'view'}
                            />
                            <TextField
                                label="Marca"
                                fullWidth
                                value={selectedProduct?.marca || ''}
                                disabled={dialogType === 'view'}
                            />
                            <TextField
                                label="Precio"
                                fullWidth
                                type="number"
                                value={selectedProduct?.precio || ''}
                                disabled={dialogType === 'view'}
                            />
                            <TextField
                                label="Descripción"
                                fullWidth
                                multiline
                                rows={4}
                                value={selectedProduct?.descripcion || ''}
                                disabled={dialogType === 'view'}
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {dialogType === 'delete' ? 'Cancelar' : 'Cerrar'}
                    </Button>
                    {dialogType === 'edit' && (
                        <Button onClick={() => handleSave(selectedProduct)} variant="contained" color="primary">
                            Guardar
                        </Button>
                    )}
                    {dialogType === 'delete' && (
                        <Button onClick={handleConfirmDelete} variant="contained" color="error">
                            Eliminar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
}
