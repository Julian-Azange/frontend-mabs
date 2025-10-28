import { BrowserRouter } from 'react-router-dom'
import LayoutRoutes from './app/router/LayoutRoutes'
import ThemeProvider from './app/providers/ThemeProvider'
import AuthProvider from './app/providers/AuthProvider'
import CartProvider from './app/providers/CartProvider' // Importar CartProvider

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider> { /* Envolver con CartProvider */ }
          <BrowserRouter>
            <LayoutRoutes />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
