import { Button } from '@mui/material'

export default function ButtonPrimary({ children, variant = 'contained', sx = {}, ...props }) {
    return (
        <Button
            variant={variant}
            sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                padding: '10px 24px',
                ...sx
            }}
            {...props}
        >
            {children}
        </Button>
    )
}
