import { createTheme } from '@mui/material/styles'

export function createAppTheme(mode = 'light') {
    const isDark = mode === 'dark'
    return createTheme({
        palette: {
            mode,
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
                default: isDark ? '#0b1220' : '#FFFFFF',
                paper: isDark ? '#071223' : '#F8F8F8',
            },
            text: {
                primary: isDark ? '#e6eef8' : '#111827',
                secondary: isDark ? '#9fb0c8' : '#4B5563'
            },
            grey: {
                50: isDark ? '#0b1220' : '#FAFAFA',
                100: isDark ? '#0e1624' : '#F5F5F5',
                200: isDark ? '#14202e' : '#E5E7EB',
                300: isDark ? '#1b2a3a' : '#D1D5DB',
                400: isDark ? '#233544' : '#9CA3AF',
                500: isDark ? '#324a62' : '#6B7280',
                600: isDark ? '#223746' : '#4B5563',
                700: isDark ? '#1b2a33' : '#374151',
                800: isDark ? '#0f1a27' : '#1F2937',
                900: isDark ? '#071423' : '#111827',
            },
        },
        typography: {
            fontFamily: 'Poppins, sans-serif',
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
                        boxShadow: isDark ? '0 6px 18px rgba(0,0,0,0.6)' : '0 4px 12px rgba(0,0,0,0.08)',
                    },
                },
            },
        },
    })
}

export default createAppTheme('light')