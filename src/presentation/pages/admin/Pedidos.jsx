import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    InputAdornment,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Chip
} from '@mui/material';
import { Add, Search, Visibility, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';

const orders = [
    {
        id: '#10ba538b',
        quantity: 3,
        date: '10 de noviembre de 2022',
        address: 'Kelly Williams 777 Brockton Avenue, Abington MA 2351',
        total: 350.00,
        status: 'Pendiente',
        items: [
            { name: 'Budi 2011', price: 226.00, quantity: 4, properties: 'Negro, L' },
            { name: 'Resla 2015', price: 101.00, quantity: 4, properties: 'Negro, L' },
            { name: 'Xursche 2018', price: 241.00, quantity: 4, properties: 'Negro, L' }
        ],
        shipping: 10,
        discount: 0,
        note: 'Please deliver ASAP!',
        paymentMethod: 'Pagado con tarjeta de crédito/débito'
    },
    {
        id: '#1f110985b',
        quantity: 3,
        date: '10 de noviembre de 2022',
        address: 'Kelly Williams 777 Brockton Avenue, Abington MA 2351',
        total: 500.00,
        status: 'Procesado'
    },
    {
        id: '#6d54d506',
        quantity: 3,
        date: '22 de diciembre de 2020',
        address: 'Kelly Williams 777 Brockton Avenue, Abington MA 2351',
        total: 700.00,
        status: 'Entregado'
    },
    {
        id: '#753deee0',
        quantity: 3,
        date: '14 de diciembre de 2020',
        address: 'Kelly Williams 777 Brockton Avenue, Abington MA 2351',
        total: 300.00,
        status: 'Cancelado'
    },
    {
        id: '#63d35462',
        quantity: 3,
        date: '20 de noviembre de 2020',
        address: 'Kelly Williams 777 Brockton Avenue, Abington MA 2351',
        total: 700.00,
        status: 'Entregado'
    }
];

export default function Pedidos() {
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleStatusColor = (status) => {
        switch (status) {
            case 'Pendiente':
                return '#E3F2FD';
            case 'Procesado':
                return '#FFF3E0';
            case 'Entregado':
                return '#E8F5E9';
            case 'Cancelado':
                return '#FFEBEE';
            default:
                return '#E0E0E0';
        }
    };

    const handleStatusTextColor = (status) => {
        switch (status) {
            case 'Pendiente':
                return '#1976D2';
            case 'Procesado':
                return '#F57C00';
            case 'Entregado':
                return '#43A047';
            case 'Cancelado':
                return '#E53935';
            default:
                return '#757575';
        }
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setOpenDialog(true);
    };

    const handleStatusChange = (orderId, newStatus) => {
        // Aquí iría la lógica para actualizar el estado en el backend
        toast.success(`Estado del pedido actualizado a: ${newStatus}`);
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Órdenes
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    sx={{
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' },
                        borderRadius: '8px'
                    }}
                >
                    Crear Pedido
                </Button>
            </Box>

            {/* Buscador */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Orden de búsqueda..."
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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

            {/* Tabla de órdenes */}
            <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Identificación del pedido</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Fecha de compra</TableCell>
                            <TableCell>Dirección de facturación</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell align="right">Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.address}</TableCell>
                                <TableCell>${order.total.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.status}
                                        sx={{
                                            bgcolor: handleStatusColor(order.status),
                                            color: handleStatusTextColor(order.status),
                                            fontWeight: 500
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleViewOrder(order)}
                                    >
                                        <Visibility fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal de detalles del pedido */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Detalles del pedido</Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            ID del pedido: {selectedOrder?.id}
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedOrder && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {/* Información del pedido */}
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="subtitle1">
                                        Colocado en: {selectedOrder.date}
                                    </Typography>
                                    <FormControl size="small">
                                        <Select
                                            value={selectedOrder.status}
                                            onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                                            sx={{
                                                bgcolor: handleStatusColor(selectedOrder.status),
                                                color: handleStatusTextColor(selectedOrder.status),
                                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' }
                                            }}
                                        >
                                            <MenuItem value="Pendiente">Pendiente</MenuItem>
                                            <MenuItem value="Procesado">Procesado</MenuItem>
                                            <MenuItem value="Entregado">Entregado</MenuItem>
                                            <MenuItem value="Cancelado">Cancelado</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                {/* Productos */}
                                <TableContainer component={Paper} variant="outlined">
                                    <Table>
                                        <TableBody>
                                            {selectedOrder.items?.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                                            <Box>
                                                                <Typography variant="subtitle2">{item.name}</Typography>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    {item.properties}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>${item.price.toFixed(2)} x {item.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                {/* Resumen */}
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography>Subtotal:</Typography>
                                        <Typography>${selectedOrder.total - selectedOrder.shipping}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography>Tarifa de envío:</Typography>
                                        <Typography>${selectedOrder.shipping}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography>Descuento(%):</Typography>
                                        <Typography>${selectedOrder.discount}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Typography variant="h6">Total</Typography>
                                        <Typography variant="h6">${selectedOrder.total}</Typography>
                                    </Box>
                                </Box>

                                {/* Información adicional */}
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="subtitle2" gutterBottom>Dirección de envío</Typography>
                                    <Typography color="text.secondary">{selectedOrder.address}</Typography>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" gutterBottom>Nota del cliente</Typography>
                                    <Typography color="text.secondary">{selectedOrder.note || 'Sin notas'}</Typography>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" gutterBottom>Método de pago</Typography>
                                    <Typography color="text.secondary">{selectedOrder.paymentMethod}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cerrar</Button>
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
