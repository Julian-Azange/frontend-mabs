import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createContext, useContext, useMemo, useState } from 'react'
import { createAppTheme } from '../../theme/muiTheme'

const ThemeModeContext = createContext(null)

export function useThemeMode() {
    const ctx = useContext(ThemeModeContext)
    if (!ctx) throw new Error('useThemeMode must be used within ThemeProvider')
    return ctx
}

export default function ThemeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        const saved = (typeof window !== 'undefined') ? localStorage.getItem('theme') : null
        return saved === 'dark' ? 'dark' : 'light'
    })

    const toggleMode = () => {
        setMode(prev => {
            const next = prev === 'light' ? 'dark' : 'light'
            if (typeof window !== 'undefined') {
                try { localStorage.setItem('theme', next) } catch (err) { console.warn('Could not save theme', err) }
            }
            return next
        })
    }

    const theme = useMemo(() => createAppTheme(mode), [mode])

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeModeContext.Provider>
    )
}
