import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material'
import { useState } from 'react'

const sampleProducts = Array.from({ length: 34 }, (_, i) => ({ id: i + 1, name: `Producto ${i + 1}`, price: (i + 1) * 1000, stock: Math.floor(Math.random() * 20) + 1 }))

export default function GestionProductos() {
    const [page, setPage] = useState(1)
    const perPage = 10
    const totalPages = Math.ceil(sampleProducts.length / perPage)
    const displayed = sampleProducts.slice((page - 1) * perPage, page * perPage)

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Gestión de Productos</Typography>
                <Button variant="contained">Agregar Producto</Button>
            </Box>

            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayed.map(p => (
                                <TableRow key={p.id} hover>
                                    <TableCell>{p.id}</TableCell>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell>{p.price.toLocaleString('es-CO')}</TableCell>
                                    <TableCell>{p.stock}</TableCell>
                                    <TableCell>
                                        <Button size="small">Editar</Button>
                                        <Button size="small" color="error">Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={totalPages} page={page} onChange={(e, v) => setPage(v)} />
            </Box>
        </Box>
    )
}
