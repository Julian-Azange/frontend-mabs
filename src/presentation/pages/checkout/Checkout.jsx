import { Container, Box, Typography, Stepper, Step, StepLabel, Grid, Paper, Button } from '@mui/material'
import InputField from '../../components/common/InputField'
import { useState } from 'react'

const steps = ['Dirección de Envío', 'Método de Pago', 'Confirmación']

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(0)

    const nextStep = () => setActiveStep((prev) => prev + 1)
    const backStep = () => setActiveStep((prev) => prev - 1)

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
                Finalizar Compra
            </Typography>

            <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Step 1: Shipping Address */}
            {activeStep === 0 && (
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Datos de Envío
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InputField label="Nombre completo" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputField label="Teléfono" type="tel" />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField label="Dirección" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputField label="Ciudad" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputField label="Código Postal" />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField label="País" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth size="large" onClick={nextStep}>
                                Continuar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            )}

            {/* Step 2: Payment */}
            {activeStep === 1 && (
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Método de Pago
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputField label="Nombre del titular" />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField label="Número de tarjeta" />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <InputField label="Fecha de vencimiento" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputField label="CVV" />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button variant="outlined" onClick={backStep} sx={{ flex: 1 }}>
                                    Volver
                                </Button>
                                <Button variant="contained" onClick={nextStep} sx={{ flex: 1 }}>
                                    Continuar
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            )}

            {/* Step 3: Confirmation */}
            {activeStep === 2 && (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            backgroundColor: 'success.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                        }}
                    >
                        <Typography variant="h2" color="white">
                            ✓
                        </Typography>
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                        ¡Pedido Confirmado!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Número de pedido: #123456
                    </Typography>
                    <Button variant="contained" size="large">
                        Ver Mis Pedidos
                    </Button>
                </Paper>
            )}
        </Container>
    )
}
