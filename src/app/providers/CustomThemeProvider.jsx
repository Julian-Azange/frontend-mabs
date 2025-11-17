import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createAppTheme } from '../../theme/muiTheme';

const CustomThemeContext = createContext();

export function useTheme() {
    return useContext(CustomThemeContext);
}

export function CustomThemeProvider({ children }) {
    const [mode, setMode] = useState('light');
    const [themeName, setThemeName] = useState('default');

    const theme = useMemo(() => createAppTheme(mode, themeName), [mode, themeName]);

    const toggleThemeMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const changeThemeName = (name) => {
        setThemeName(name);
    };

    return (
        <CustomThemeContext.Provider value={{ mode, themeName, toggleThemeMode, changeThemeName }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </CustomThemeContext.Provider>
    );
}
