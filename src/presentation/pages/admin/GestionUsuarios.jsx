import { Container, Box, Typography, Button, Stack, TextField, CircularProgress } from '@mui/material'
import { useMemo, useState } from 'react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import { useUsers } from '../../../app/hooks/useUsers'

export default function GestionUsuarios() {
    const { users, loading, error, refetch } = useUsers()
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [query, setQuery] = useState('')

    const columns = useMemo(() => [
        // El endpoint de listar no devuelve el ID, usamos el correo como key.
        { field: 'correo', headerName: 'Email', minWidth: 220 },
        { field: 'rol.rol', headerName: 'Rol', minWidth: 120, valueGetter: (params) => params.row.rol.rol },
        { field: 'estado', headerName: 'Estado', minWidth: 120, valueGetter: (params) => params.row.estado ? 'Activo' : 'Inactivo' },
        { field: 'verificado', headerName: 'Verificado', minWidth: 120, valueGetter: (params) => params.row.verificado ? 'Sí' : 'No' },
    ], [])

    const filtered = users.filter(u => u.correo.toLowerCase().includes(query.toLowerCase()))

    const handleView = (row) => { setSelected(row); setOpen(true) }
    const handleEdit = (row) => { setSelected(row); setOpen(true) }
    const handleDelete = (row) => {
        // Se necesita el ID para eliminar, pero no viene en la respuesta.
        // Se debería usar el servicio de inactivación aquí.
        if (!confirm(`Inactivar usuario ${row.correo}?`)) return
        console.log("Inactivar usuario", row.correo)
    }

    const handleClose = () => { setSelected(null); setOpen(false) }

    if (loading) {
        return <Container maxWidth="xl" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Container>
    }

    if (error) {
        return <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}><Typography color="error">Error al cargar los usuarios.</Typography></Container>
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Gestión de Usuarios
            </Typography>
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField size="small" placeholder="Buscar usuario..." value={query} onChange={(e) => setQuery(e.target.value)} />
                    <Button variant="contained" onClick={() => setOpen(true)}>Crear Usuario</Button>
                </Stack>
            </Box>

            <DataTable
                columns={columns}
                data={filtered}
                initialPageSize={5}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowId={(row) => row.correo} // Usamos el correo como ID para la tabla
            />

            <Modal open={open} title={selected ? 'Ver / Editar Usuario' : 'Crear Usuario'} onClose={handleClose}>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField label="Email" defaultValue={selected?.correo || ''} />
                    <TextField label="Rol" defaultValue={selected?.rol?.rol || 'CLIENTE'} />
                </Stack>
            </Modal>
        </Box>
    </Container>
    )
}

