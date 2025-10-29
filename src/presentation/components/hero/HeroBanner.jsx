import React from "react";
import { Box, Container, Grid, Typography, Button, IconButton, useTheme, Chip } from "@mui/material";
import { ArrowBack, ArrowForward, LocalShipping } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const slides = [
    {
        id: 1,
        title: "Descubre tu Tono Perfecto de Base",
        subtitle: "Envío Gratis en todos los pedidos de bases y correctores.",
        discount: "30% OFF",
        description: "Encuentra la base ideal para tu tipo de piel con nuestra colección exclusiva.",
        image: "/assets/images/products/product1.png",
        cta: "Comprar Bases",
        badge: "Nueva Colección",
    },
    {
        id: 2,
        title: "Labios de Impacto: Colores Vibrantes",
        subtitle: "Obtén un delineador de labios de regalo en tu compra.",
        discount: "40% OFF",
        description: "Una gama completa de labiales para un acabado profesional que dura todo el día.",
        image: "/assets/images/products/product2.png",
        cta: "Ver Labiales",
        badge: "Oferta Flash",
    },
    {
        id: 3,
        title: "Pinceles Esenciales para un Maquillaje Pro",
        subtitle: "Envío rápido en todas las compras de sets de brochas.",
        discount: "20% OFF",
        description: "Herramientas de calidad premium para una aplicación impecable.",
        image: "/assets/images/products/product4.png",
        cta: "Comprar Brochas",
        badge: "Top Ventas",
    },
];

export default function HeroBanner() {
    const [activeSlide, setActiveSlide] = React.useState(0);
    const theme = useTheme();
    const navigate = useNavigate();

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
    };


    React.useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [activeSlide]);

    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: theme.palette.background.default,
                py: { xs: 2, md: 4 },
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Container maxWidth="xl">
                <Box sx={{ position: "relative" }}>

                    <Box
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: 1,
                            backgroundColor: theme.palette.background.paper,

                            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
                            minHeight: {
                                xs: 'auto',
                                sm: '50vh',
                                md: '60vh',
                                lg: '500px'
                            },
                        }}
                    >

                        <Box
                            sx={{
                                display: "flex",
                                transition: "transform 0.5s ease-in-out",
                                transform: `translateX(-${activeSlide * 100}%)`,
                            }}
                        >
                            {slides.map((slide) => (
                                <Box
                                    key={slide.id}
                                    sx={{
                                        minWidth: "100%",
                                        display: "flex",
                                        flexDirection: { xs: "column", md: "row" },
                                        alignItems: "center",
                                        p: { xs: 3, md: 6 },
                                        minHeight: { xs: 350, md: 450 },
                                        color: theme.palette.text.primary,
                                    }}
                                >

                                    <Box
                                        sx={{
                                            flex: 1,
                                            pr: { md: 4 },
                                            mb: { xs: 3, md: 0 },
                                            textAlign: { xs: "center", md: "left" },
                                            zIndex: 2,
                                            position: "relative",
                                        }}
                                    >

                                        <Chip
                                            label={slide.badge}
                                            sx={{
                                                mb: 2,
                                                backgroundColor: theme.palette.grey[200],
                                                color: theme.palette.text.primary,
                                                fontWeight: 700,
                                                fontSize: "0.75rem",
                                                height: 32,
                                                "& .MuiChip-label": {
                                                    px: 2,
                                                },
                                            }}
                                        />


                                        <Typography
                                            variant="h1"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 2,
                                                color: theme.palette.text.primary,
                                                lineHeight: 1.1,
                                                fontSize: { xs: "2rem", md: "3.5rem" },
                                            }}
                                        >
                                            {slide.title}
                                        </Typography>


                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: { xs: "center", md: "flex-start" },
                                                mb: 3,
                                                gap: 1,
                                            }}
                                        >
                                            <LocalShipping
                                                sx={{
                                                    fontSize: "1.5rem",
                                                    color: theme.palette.text.secondary
                                                }}
                                            />
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    fontSize: { xs: "1rem", md: "1.3rem" },
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {slide.subtitle}
                                            </Typography>
                                        </Box>


                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: 3,
                                                textTransform: "none",
                                                px: 5,
                                                py: 1.5,
                                                fontSize: "1rem",
                                                fontWeight: 600,
                                                backgroundColor: theme.palette.text.primary,
                                                color: "white",
                                                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                                                "&:hover": {
                                                    backgroundColor: theme.palette.grey[900],
                                                    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                                                    transform: "translateY(-2px)",
                                                },
                                                transition: "all 0.3s ease",
                                            }}
                                            onClick={() => navigate("/productos")}
                                        >
                                            {slide.cta}
                                        </Button>
                                    </Box>


                                    <Box
                                        sx={{
                                            flex: 1,
                                            textAlign: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                            zIndex: 1,
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={slide.image}
                                            alt={slide.title}
                                            sx={{
                                                width: "100%",
                                                maxHeight: { xs: 200, sm: 300, md: '80%' },
                                                maxWidth: 400,
                                                height: "auto",
                                                borderRadius: 'none',
                                                objectFit: "cover",

                                                transform: "perspective(1000px) rotateY(-5deg)",
                                                transition: "transform 0.3s ease",
                                                "&:hover": {
                                                    transform: "perspective(1000px) rotateY(0deg)",
                                                },
                                            }}
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                    </Box>


                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                            mt: 3,
                        }}
                    >
                        {slides.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => setActiveSlide(index)}
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    backgroundColor:
                                        index === activeSlide
                                            ? theme.palette.text.primary
                                            : theme.palette.grey[400],
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor:
                                            index === activeSlide
                                                ? theme.palette.text.primary
                                                : theme.palette.grey[500],
                                        transform: "scale(1.2)",
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}