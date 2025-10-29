import React from 'react'
import { Container, Box, Grid } from '@mui/material'
import { Inventory2, People, ReceiptLong, AttachMoney } from '@mui/icons-material'
import QuickAccessCard from '../../components/admin/QuickAccessCard'
import KpiCard from '../../components/admin/KpiCard'
import LatestOrdersCard from '../../components/admin/LatestOrdersCard'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate();

    const kpis = [
        {
            label: 'Ventas Totales',
            value: '$ 12.500.000',
            icon: <AttachMoney sx={{ color: '#e5b1fa', fontSize: 32 }} />,
            sub: '+15% esta semana',
            subColor: '#43a047',
            borderColor: '#e5b1fa',
        },
        {
            label: 'Pedidos Pendientes',
            value: 47,
            icon: <ReceiptLong sx={{ color: '#ffe1a8', fontSize: 32 }} />,
            sub: 'Revisar urgentes',
            subColor: '#b8860b',
            borderColor: '#ffe1a8',
        },
        {
            label: 'Productos Activos',
            value: 82,
            icon: <Inventory2 sx={{ color: '#f8bbd0', fontSize: 32 }} />,
            sub: 'Último añadido: Labial Mate',
            subColor: '#757575',
            borderColor: '#f8bbd0',
        },
        {
            label: 'Nuevos Usuarios',
            value: 125,
            icon: <People sx={{ color: '#b2ebf2', fontSize: 32 }} />,
            sub: 'Registrados esta semana',
            subColor: '#757575',
            borderColor: '#b2ebf2',
        },
    ];

    const pedidos = [
        { id: '#10015', cliente: 'Laura G.', total: '$ 45.000', estado: 'Pendiente' },
        { id: '#10014', cliente: 'Ana M.', total: '$ 120.000', estado: 'Completado' },
        { id: '#10013', cliente: 'Sofía C.', total: '$ 68.000', estado: 'Pendiente' },
    ];

    return (
        <Container maxWidth="xl" sx={{ py: 8 }}>

            <Box sx={{
                minHeight: '100%',
                width: '100%',
                bgcolor: '#f6f8fb',
                p: { xs: 2, md: 3 },
                display: 'grid',
                gap: 3,
                gridTemplateColumns: '1fr',
                gridAutoRows: 'max-content 1fr'
            }}>

                <Grid container spacing={2}>
                    {kpis.map((kpi) => (
                        <Grid item xs={12} sm={6} lg={3} key={kpi.label}>
                            <KpiCard
                                icon={kpi.icon}
                                label={kpi.label}
                                value={kpi.value}
                                sub={kpi.sub}
                                subColor={kpi.subColor}
                                borderColor={kpi.borderColor}
                            />
                        </Grid>
                    ))}
                </Grid>


                <Grid container spacing={2} sx={{ height: '100%', alignItems: 'stretch' }}>

                    <Grid item xs={12} lg={8} sx={{ display: 'flex' }}>
                        <LatestOrdersCard
                            title="Últimos Pedidos"
                            orders={pedidos}
                            onViewAll={() => navigate('/admin/pedidos')}
                        />
                    </Grid>


                    <Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <QuickAccessCard
                                title="Productos"
                                description="Administra el inventario, precios y descripciones del catálogo."
                                buttonText="Ir a Gestión de Productos"
                                icon={<Inventory2 sx={{ color: '#e91e63', fontSize: 28 }} />}
                                onClick={() => navigate('/admin/productos')}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <QuickAccessCard
                                title="Usuarios"
                                description="Revisa perfiles, asigna roles y gestiona cuentas afiliadas."
                                buttonText="Ir a Gestión de Usuarios"
                                icon={<People sx={{ color: '#e91e63', fontSize: 28 }} />}
                                onClick={() => navigate('/admin/usuarios')}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
