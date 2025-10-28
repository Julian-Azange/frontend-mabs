import {
    Container,
    Paper,
    Typography,
    Box,
    Avatar,
    Button,
    Grid,
    IconButton,
    Tabs,
    Tab,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material'
import {
    Person,
    Email,
    Phone,
    LocationOn,
    Edit,
    CameraAlt,
    Security,
    Payment,
    AccountBalance,
    History,
    Add
} from '@mui/icons-material'
import { useAuth } from '../../../app/providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import Swal from 'sweetalert2'

// Datos de ejemplo - Reemplazar con datos reales de la API
const userBankInfo = {
    bankName: "Banco XYZ",
    accountNumber: "**** **** **** 1234",
    accountType: "Cuenta de Ahorros"
}

const paymentHistory = [
    { id: 1, date: "2025-10-25", amount: 150.00, status: "Pagado" },
    { id: 2, date: "2025-09-25", amount: 180.00, status: "Pagado" },
    { id: 3, date: "2025-08-25", amount: 200.00, status: "Pagado" }
]

const addresses = [
    {
        id: 1,
        type: "Casa",
        street: "Calle Principal 123",
        city: "Ciudad Ejemplo",
        state: "Estado",
        zipCode: "12345"
    },
    {
        id: 2,
        type: "Trabajo",
        street: "Av. Comercial 456",
        city: "Ciudad Ejemplo",
        state: "Estado",
        zipCode: "12345"
    }
]

export default function Perfil() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(0)
    const [openPhotoDialog, setOpenPhotoDialog] = useState(false)
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false)
    const [openBankDialog, setOpenBankDialog] = useState(false)
    const [openAddressDialog, setOpenAddressDialog] = useState(false)

    if (!user) {
        navigate('/login')
        return null
    }

    const handlePhotoChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            // Aquí iría la lógica para subir la foto
            toast.success('Foto de perfil actualizada')
            setOpenPhotoDialog(false)
        }
    }

    const handlePasswordChange = async (oldPassword, newPassword) => {
        try {
            // Aquí iría la lógica para cambiar la contraseña
            toast.success('Contraseña actualizada correctamente')
            setOpenPasswordDialog(false)
        } catch (error) {
            toast.error('Error al actualizar la contraseña')
        }
    }

    const handleBankInfoUpdate = (bankData) => {
        // Aquí iría la lógica para actualizar datos bancarios
        toast.success('Información bancaria actualizada')
        setOpenBankDialog(false)
    }

    const handleAddressAdd = (addressData) => {
        // Aquí iría la lógica para agregar dirección
        toast.success('Dirección agregada correctamente')
        setOpenAddressDialog(false)
    }

    const handleLogout = async () => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Deseas cerrar la sesión?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'Cancelar'
            })

            if (result.isConfirmed) {
                await logout()
                toast.success('Sesión cerrada exitosamente')
                navigate('/login')
            }
        } catch (error) {
            toast.error('Error al cerrar sesión')
        }
    }

    const renderPersonalInfo = () => (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box sx={{ position: 'relative' }}>
                    <Avatar
                        src={user.photoURL}
                        sx={{
                            width: 120,
                            height: 120,
                            bgcolor: 'primary.main',
                            fontSize: '3rem',
                        }}
                    >
                        {user.name ? user.name[0].toUpperCase() : 'U'}
                    </Avatar>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'background.paper',
                            '&:hover': { backgroundColor: 'action.hover' },
                            boxShadow: 1
                        }}
                        onClick={() => setOpenPhotoDialog(true)}
                    >
                        <CameraAlt />
                    </IconButton>
                </Box>
                <Box sx={{ ml: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {user.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {user.email}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText
                                primary="Nombre Completo"
                                secondary={user.name}
                            />
                            <IconButton size="small">
                                <Edit fontSize="small" />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Email />
                            </ListItemIcon>
                            <ListItemText
                                primary="Correo Electrónico"
                                secondary={user.email}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Phone />
                            </ListItemIcon>
                            <ListItemText
                                primary="Teléfono"
                                secondary={user.phone || "No configurado"}
                            />
                            <IconButton size="small">
                                <Edit fontSize="small" />
                            </IconButton>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Direcciones</Typography>
                        <Button
                            startIcon={<Add />}
                            onClick={() => setOpenAddressDialog(true)}
                        >
                            Agregar Dirección
                        </Button>
                    </Box>
                    {addresses.map((address) => (
                        <Paper
                            key={address.id}
                            sx={{ p: 2, mb: 2, backgroundColor: 'action.hover' }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle2" color="primary">
                                    {address.type}
                                </Typography>
                                <IconButton size="small">
                                    <Edit fontSize="small" />
                                </IconButton>
                            </Box>
                            <Typography variant="body2">
                                {address.street}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {`${address.city}, ${address.state} ${address.zipCode}`}
                            </Typography>
                        </Paper>
                    ))}
                </Grid>
            </Grid>
        </Box>
    )

    const renderSecurity = () => (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Seguridad de la Cuenta
            </Typography>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Contraseña
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    La última actualización fue hace 30 días
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<Security />}
                    onClick={() => setOpenPasswordDialog(true)}
                >
                    Cambiar Contraseña
                </Button>
            </Paper>

            <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                fullWidth
                sx={{ mt: 2 }}
            >
                Cerrar Sesión
            </Button>
        </Box>
    )

    const renderPaymentInfo = () => (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">
                                Información Bancaria
                            </Typography>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => setOpenBankDialog(true)}
                            >
                                Actualizar
                            </Button>
                        </Box>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <AccountBalance />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Banco"
                                    secondary={userBankInfo.bankName}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Payment />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Número de Cuenta"
                                    secondary={userBankInfo.accountNumber}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <AccountBalance />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Tipo de Cuenta"
                                    secondary={userBankInfo.accountType}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Historial de Pagos
                        </Typography>
                        <List>
                            {paymentHistory.map((payment) => (
                                <ListItem key={payment.id}>
                                    <ListItemIcon>
                                        <History />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`$${payment.amount.toFixed(2)}`}
                                        secondary={`Fecha: ${payment.date} - ${payment.status}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        aria-label="profile tabs"
                    >
                        <Tab label="Información Personal" />
                        <Tab label="Seguridad" />
                        <Tab label="Método de Pago" />
                    </Tabs>
                </Box>

                {activeTab === 0 && renderPersonalInfo()}
                {activeTab === 1 && renderSecurity()}
                {activeTab === 2 && renderPaymentInfo()}
            </Paper>

            {/* Diálogo para cambiar foto */}
            <Dialog open={openPhotoDialog} onClose={() => setOpenPhotoDialog(false)}>
                <DialogTitle>Cambiar Foto de Perfil</DialogTitle>
                <DialogContent>
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Seleccionar Foto
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Diálogo para cambiar contraseña */}
            <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
                <DialogTitle>Cambiar Contraseña</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Contraseña Actual"
                        type="password"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Nueva Contraseña"
                        type="password"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Confirmar Nueva Contraseña"
                        type="password"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPasswordDialog(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={() => handlePasswordChange()} variant="contained">
                        Actualizar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para actualizar datos bancarios */}
            <Dialog open={openBankDialog} onClose={() => setOpenBankDialog(false)}>
                <DialogTitle>Actualizar Datos Bancarios</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Nombre del Banco"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Número de Cuenta"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Tipo de Cuenta"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenBankDialog(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={() => handleBankInfoUpdate()} variant="contained">
                        Actualizar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para agregar dirección */}
            <Dialog open={openAddressDialog} onClose={() => setOpenAddressDialog(false)}>
                <DialogTitle>Agregar Nueva Dirección</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tipo de Dirección"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Calle y Número"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Ciudad"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Estado"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Código Postal"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddressDialog(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={() => handleAddressAdd()} variant="contained">
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}