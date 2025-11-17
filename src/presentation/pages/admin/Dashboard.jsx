// src/presentation/pages/admin/Dashboard.jsx
import { Grid, Typography, Box, Paper } from '@mui/material';
import KpiCard from '../../components/admin/KpiCard'; // Asumo que existe
import DataTable from '../../components/admin/DataTable'; // Tu tabla

export default function Dashboard() {
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Resumen del Negocio
            </Typography>

            {/* Fila de KPIs */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <KpiCard title="Ventas Totales" value="$1,250" percent={12.5} isPositive={true} />
                </Grid>
                {/* ... (Otras 3 KpiCard) ... */}
            </Grid>

            {/* Contenedor de la Tabla/Gráfico */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                    Total de Pedidos Recientes
                </Typography>
                {/* Aquí se cargaría DataTable */}
                {/* <DataTable data={...} columns={...} /> */}
            </Paper>
        </Box>
    );
}