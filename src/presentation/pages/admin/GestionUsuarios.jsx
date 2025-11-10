import { Container, Box, Typography, Button, Stack, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import usersData from '../../../data/users.json'

export default function GestionUsuarios() {
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [query, setQuery] = useState('')

    useEffect(() => {
        setUsers(usersData)
    }, [])

    const columns = useMemo(() => [
        { field: 'id', headerName: 'ID', minWidth: 60 },
        { field: 'name', headerName: 'Nombre', minWidth: 180 },
        { field: 'email', headerName: 'Email', minWidth: 220 },
        { field: 'role', headerName: 'Rol', minWidth: 120 }
    ], [])

    const filtered = users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))

    const handleView = (row) => { setSelected(row); setOpen(true) }
    const handleEdit = (row) => { setSelected(row); setOpen(true) }
    const handleDelete = (row) => {
        if (!confirm(`Eliminar usuario ${row.name}?`)) return
        setUsers(prev => prev.filter(u => u.id !== row.id))
    }

    const handleClose = () => { setSelected(null); setOpen(false) }

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
            />

            <Modal open={open} title={selected ? 'Ver / Editar Usuario' : 'Crear Usuario'} onClose={handleClose}>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField label="Nombre" defaultValue={selected?.name || ''} />
                    <TextField label="Email" defaultValue={selected?.email || ''} />
                    <TextField label="Rol" defaultValue={selected?.role || 'cliente'} />
                </Stack>
            </Modal>
        </Box>
    </Container>
    )
}
