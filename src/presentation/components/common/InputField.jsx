import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

export default function InputField({ label, type = 'text', fullWidth = true, control, name, ...props }) {
    if (control && name) {
        return (
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label={label}
                        type={type}
                        fullWidth={fullWidth}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                        {...props}
                    />
                )}
            />
        )
    }

    return (
        <TextField
            label={label}
            type={type}
            fullWidth={fullWidth}
            variant="outlined"
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                },
            }}
            {...props}
        />
    )
}
