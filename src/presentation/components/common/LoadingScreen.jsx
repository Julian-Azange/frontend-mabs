import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingScreen() {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (theme) => theme.palette.background.default,
                zIndex: (theme) => theme.zIndex.modal + 1,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: 100,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress
                    size={60}
                    thickness={4}
                    sx={{
                        color: 'primary.main',
                        animation: 'spin 1s linear infinite',
                        position: 'absolute',
                    }}
                />
                <Box
                    component="img"
                    src="/assets/logo.png"
                    alt="Logo"
                    sx={{
                        width: 40,
                        height: 'auto',
                        animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                />
            </Box>
            <Typography
                variant="h6"
                sx={{
                    mt: 2,
                    fontWeight: 500,
                    background: (theme) =>
                        `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    animation: 'fadeInOut 1.5s ease-in-out infinite',
                }}
            >
                Cargando...
            </Typography>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                    }
                    @keyframes fadeInOut {
                        0%, 100% { opacity: 0.6; }
                        50% { opacity: 1; }
                    }
                `}
            </style>
        </Box>
    );
}