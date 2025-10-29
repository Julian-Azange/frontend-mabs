import { BrowserRouter } from 'react-router-dom'
import LayoutRoutes from './app/router/LayoutRoutes'
import ThemeProvider from './app/providers/ThemeProvider'
import AuthProvider from './app/providers/AuthProvider'
import CartProvider from './app/providers/CartProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <LayoutRoutes />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  )
}

export default App
