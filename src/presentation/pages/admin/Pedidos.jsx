import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const orders = [
    { id: 101, customer: 'María López', total: 120000, status: 'Pendiente' },
    { id: 102, customer: 'Carlos Pérez', total: 45000, status: 'Enviado' },
]

export default function Pedidos() {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Pedidos</Typography>
            </Box>

            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(o => (
                                <TableRow key={o.id} hover>
                                    <TableCell>{o.id}</TableCell>
                                    <TableCell>{o.customer}</TableCell>
                                    <TableCell>{o.total.toLocaleString('es-CO')}</TableCell>
                                    <TableCell>{o.status}</TableCell>
                                    <TableCell>
                                        <Button size="small">Ver</Button>
                                        <Button size="small">Actualizar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}
