import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Card,
    Grid
} from '@mui/material';
import { ContentCopy, Share } from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function MembershipDashboard() {
    const [referralLink] = useState('https://mabs.com/ref/ABC123');
    const [referralCode] = useState('MABS-ABC123');

    // Datos de ejemplo
    const referralStats = {
        totalReferrals: 15,
        totalEarnings: '450,000',
        membershipPaid: true,
        currentLevel: 2,
        percentageEarned: '5%'
    };

    const referralList = [
        { id: 1, name: 'Juan Pérez', date: '2023-11-01', level: 0, commission: '25%', status: 'Activo' },
        { id: 2, name: 'María García', date: '2023-11-02', level: 1, commission: '5%', status: 'Activo' },
        // ... más referidos
    ];

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success('Enlace copiado al portapapeles');
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(referralCode);
        toast.success('Código copiado al portapapeles');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Únete a Mabs',
                text: '¡Únete a Mabs con mi código de referido!',
                url: referralLink
            });
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header Section */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Mi Membresía
            </Typography>

            {/* Tarjetas de estadísticas */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Enlace de Referido
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                value={referralLink}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleCopyLink}>
                                                <ContentCopy />
                                            </IconButton>
                                            <IconButton onClick={handleShare}>
                                                <Share />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            Código de Descuento
                        </Typography>
                        <TextField
                            fullWidth
                            value={referralCode}
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleCopyCode}>
                                            <ContentCopy />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Resumen de Referidos
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Total de Referidos</TableCell>
                                        <TableCell align="right">{referralStats.totalReferrals}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Ganancias Totales</TableCell>
                                        <TableCell align="right">COP ${referralStats.totalEarnings}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Nivel Actual</TableCell>
                                        <TableCell align="right">Generación {referralStats.currentLevel}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Porcentaje de Ganancia</TableCell>
                                        <TableCell align="right">{referralStats.percentageEarned}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabla de Referidos */}
            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Mis Referidos
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Generación</TableCell>
                                <TableCell>Comisión</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {referralList.map((referral) => (
                                <TableRow key={referral.id}>
                                    <TableCell>{referral.name}</TableCell>
                                    <TableCell>{referral.date}</TableCell>
                                    <TableCell>{referral.level}</TableCell>
                                    <TableCell>{referral.commission}</TableCell>
                                    <TableCell>{referral.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}