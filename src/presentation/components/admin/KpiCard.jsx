import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

export default function KpiCard({ icon, label, value, sub, subColor = '#757575', borderColor = '#eee', children }) {
    return (
        <Paper elevation={0} sx={{
            borderRadius: 3,
            p: 2.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 1,
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            border: `2px solid ${borderColor}`,
            minHeight: 120,
            background: '#fff',
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {icon}
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{label}</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
            <Typography variant="body2" sx={{ color: subColor }}>{sub}</Typography>
            {children}
        </Paper>
    );
}
