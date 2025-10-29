import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const sampleUsers = [
    { id: 1, name: 'María López', email: 'maria@example.com', role: 'cliente' },
    { id: 2, name: 'Luis Gómez', email: 'luis@example.com', role: 'afiliado' },
    { id: 3, name: 'Admin User', email: 'admin@mabs.com', role: 'admin' },
]

export default function GestionUsuarios() {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Gestión de Usuarios</Typography>
                <Button variant="contained">Crear Usuario</Button>
            </Box>

            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sampleUsers.map(u => (
                                <TableRow key={u.id} hover>
                                    <TableCell>{u.id}</TableCell>
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>{u.role}</TableCell>
                                    <TableCell>
                                        <Button size="small">Ver</Button>
                                        <Button size="small">Editar</Button>
                                        <Button size="small" color="error">Bloquear</Button>
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
