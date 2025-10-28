// src/theme/muiTheme.js
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#C43670',
            light: '#D96C9B',
            dark: '#A32B5A',
            contrastText: '#fff'
        },
        secondary: {
            main: '#4B5563',
            light: '#6B7280',
            dark: '#374151',
            contrastText: '#fff'
        },
        background: {
            default: '#FFFFFF',
            paper: '#F8F8F8',
        },
        text: {
            primary: '#111827',
            secondary: '#4B5563'
        },
        grey: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '3rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2.5rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 24px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
            },
        },
    },
})

export default theme