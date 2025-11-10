import React from 'react'
import { Box, Grid, Paper, Typography, Select, MenuItem, Stack } from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts'

export default function Dashboard() {
    const metricsData = {
        orders: { value: '32,350', change: 25.25, secondary: '9350', trend: 'up' },
        soldItems: { value: '2,360', change: -2.65, secondary: '1350', trend: 'down' },
        grossSale: { value: '$12,460.25', change: 10.25, secondary: '11350', trend: 'up' },
        shipping: { value: '$6,240', change: -13.15, secondary: '4350', trend: 'down' }
    };

    const analyticsData = [
        { month: 'Ene', ventas: 17000, gastos: 15000 },
        { month: 'Feb', ventas: 33000, gastos: 30000 },
        { month: 'Mar', ventas: 17000, gastos: 15000 },
        { month: 'Abr', ventas: 48000, gastos: 45000 },
        { month: 'May', ventas: 67000, gastos: 50000 },
        { month: 'Jun', ventas: 32000, gastos: 30000 },
        { month: 'Jul', ventas: 48000, gastos: 42000 },
        { month: 'Ago', ventas: 67000, gastos: 48000 },
        { month: 'Sep', ventas: 58000, gastos: 50000 },
        { month: 'Oct', ventas: 48000, gastos: 42000 },
        { month: 'Nov', ventas: 17000, gastos: 15000 },
        { month: 'Dic', ventas: 33000, gastos: 30000 }
    ];

    const metrics = [
        { title: 'Order', value: '32,350', change: 25.25, secondary: '9350', trend: 'up', label: "Today's Visit" },
        { title: 'Sold Items', value: '2,360', change: -2.65, secondary: '1350', trend: 'down', label: "Today's Total Sales" },
        { title: 'Gross Sale', value: '$12,460.25', change: 10.25, secondary: '11350', trend: 'up', label: "Weekly Sales" },
        { title: 'Total Shipping Cost', value: '$6,240', change: -13.15, secondary: '4350', trend: 'down', label: "Market Share" }
    ];

    return (
        <Box sx={{ p: 3 }}>
            {/* Bienvenida */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#0052CC' }}>
                    Good Morning, Martin!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Here's what happening with your store today!
                </Typography>
            </Box>

            {/* KPIs */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 3,
                mb: 4
            }}>
                {metrics.map((metric, index) => (
                    <Paper key={index} sx={{ p: 2.5, borderRadius: 2 }}>
                        <Stack spacing={1.5}>
                            <Typography variant="body2" color="text.secondary">{metric.title}</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>{metric.value}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: metric.trend === 'up' ? 'success.main' : 'error.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    }}
                                >
                                    {metric.trend === 'up' ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                                    {Math.abs(metric.change)}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {metric.secondary}
                                </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto' }}>
                                {metric.label}
                            </Typography>
                        </Stack>
                    </Paper>
                ))}

                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">Productos Vendidos</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>2,360</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'error.main',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />
                                    2.65%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    1,350
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">Ventas Brutas</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>$12,460.25</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'success.main',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                                    10.25%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    11,350
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">Costos de Envío</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>$6,240</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'error.main',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />
                                    13.15%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    4,350
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 4,
                    mb: 4
                }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Analytics</Typography>
                            <Select
                                size="small"
                                defaultValue="yearly"
                                sx={{
                                    minWidth: 120,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'divider'
                                    }
                                }}
                            >
                                <MenuItem value="yearly">Yearly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                                <MenuItem value="weekly">Weekly</MenuItem>
                            </Select>
                        </Box>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={analyticsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f7" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) => `${value / 1000}K`}
                                    tick={{ fill: '#6B7280' }}
                                />
                                <Tooltip />
                                <Bar
                                    dataKey="ventas"
                                    name="Sales"
                                    fill="#4318FF"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                />
                                <Bar
                                    dataKey="gastos"
                                    name="Expense"
                                    fill="#6AD2FF"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Order</Typography>
                            <Select
                                size="small"
                                defaultValue="yearly"
                                sx={{
                                    minWidth: 120,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'divider'
                                    }
                                }}
                            >
                                <MenuItem value="yearly">Yearly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                                <MenuItem value="weekly">Weekly</MenuItem>
                            </Select>
                        </Box>
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={analyticsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f7" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) => `${value / 1000}K`}
                                    tick={{ fill: '#6B7280' }}
                                />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="ventas"
                                    stroke="#4318FF"
                                    fill="#4318FF20"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>

                </Box>
            </Box>
        </Box>
    );
}