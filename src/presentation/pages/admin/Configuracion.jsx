import { Box, Typography, Paper, Button } from '@mui/material'

export default function Configuracion() {
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>Configuración</Typography>
            <Paper sx={{ p: 3 }}>
                <Typography>Opciones generales del panel</Typography>
                <Box sx={{ mt: 2 }}>
                    <Button variant="outlined">Preferencias</Button>
                    <Button variant="outlined" sx={{ ml: 2 }}>Integraciones</Button>
                </Box>
            </Paper>
        </Box>
    )
}
