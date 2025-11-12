import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Button,
    TextField,
    Grid,
    Divider,
    CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';
import { useMembership } from '../../../app/providers/MembershipProvider';


const steps = ['Información Personal', 'Resumen', 'Pago'];

export default function MembershipPayment() {
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();
    const { purchaseMembership } = useMembership();
    const [formData, setFormData] = useState({
        personalInfo: {
            nombre: '',
            apellido: '',
            email: '',
            telefono: ''
        },
        paymentInfo: {
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardName: ''
        }
    });

    const handleFormChange = (step, field, value) => {
        setFormData(prev => ({
            ...prev,
            [step]: {
                ...prev[step],
                [field]: value
            }
        }));
    };

    const validateStep = (step) => {
        switch (step) {
            case 0:
                return Object.values(formData.personalInfo).every(value => value.trim() !== '');
            case 1:
                return true; // El resumen no necesita validación
            case 2:
                return Object.values(formData.paymentInfo).every(value => value.trim() !== '');
            default:
                return true;
        }
    };

    const handlePayment = async () => {
        if (!validateStep(activeStep)) {
            toast.error('Por favor completa todos los campos requeridos');
            return;
        }

        setLoading(true);
        try {
            // Usamos la función del contexto para comprar la membresía
            await purchaseMembership(
                token,
                formData.personalInfo.email,
                'Bearer placeholder-token' // Token de referidos (placeholder)
            );
            toast.success('¡Pago procesado exitosamente!');
            navigate('/membresia/dashboard');
        } catch (error) {
            console.error('Error en el pago:', error);
            toast.error('Error al procesar el pago');
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (!validateStep(activeStep)) {
            toast.error('Por favor completa todos los campos requeridos');
            return;
        }

        if (activeStep === steps.length - 1) {
            handlePayment();
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Nombre"
                                variant="outlined"
                                value={formData.personalInfo.nombre}
                                onChange={(e) => handleFormChange('personalInfo', 'nombre', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Apellido"
                                variant="outlined"
                                value={formData.personalInfo.apellido}
                                onChange={(e) => handleFormChange('personalInfo', 'apellido', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={formData.personalInfo.email}
                                onChange={(e) => handleFormChange('personalInfo', 'email', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Teléfono"
                                variant="outlined"
                                value={formData.personalInfo.telefono}
                                onChange={(e) => handleFormChange('personalInfo', 'telefono', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Resumen de la Membresía
                        </Typography>
                        <Box sx={{ my: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Paper variant="outlined" sx={{ p: 2 }}>
                                        <Typography variant="subtitle1">
                                            Membresía Premium
                                        </Typography>
                                        <Typography color="text.secondary">
                                            • Acceso a descuentos exclusivos
                                        </Typography>
                                        <Typography color="text.secondary">
                                            • Programa de referidos
                                        </Typography>
                                        <Typography color="text.secondary">
                                            • Ganancias por referencias
                                        </Typography>
                                        <Divider sx={{ my: 2 }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="h6">Total:</Typography>
                                            <Typography variant="h6" color="primary">
                                                COP $200,000
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Información de Pago
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Número de Tarjeta"
                                    variant="outlined"
                                    placeholder="4111 1111 1111 1111"
                                    value={formData.paymentInfo.cardNumber}
                                    onChange={(e) => handleFormChange('paymentInfo', 'cardNumber', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Fecha de Vencimiento"
                                    variant="outlined"
                                    placeholder="MM/AA"
                                    value={formData.paymentInfo.expiryDate}
                                    onChange={(e) => handleFormChange('paymentInfo', 'expiryDate', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="CVV"
                                    variant="outlined"
                                    placeholder="123"
                                    value={formData.paymentInfo.cvv}
                                    onChange={(e) => handleFormChange('paymentInfo', 'cvv', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Nombre en la Tarjeta"
                                    variant="outlined"
                                    value={formData.paymentInfo.cardName}
                                    onChange={(e) => handleFormChange('paymentInfo', 'cardName', e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Este es un pago simulado para propósitos de demostración.
                                Puedes usar cualquier número de tarjeta válido.
                            </Typography>
                        </Box>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                    Membresía Premium
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {renderStepContent(activeStep)}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
                    {activeStep !== 0 && (
                        <Button onClick={handleBack}>
                            Atrás
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            activeStep === steps.length - 1 ? 'Pagar' : 'Siguiente'
                        )}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}