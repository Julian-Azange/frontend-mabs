import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CustomThemeProvider } from './app/providers/CustomThemeProvider.jsx'
import LoadingProvider from './app/providers/LoadingProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </LoadingProvider>
  </StrictMode>,
)