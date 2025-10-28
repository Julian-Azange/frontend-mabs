import { Routes, Route } from 'react-router-dom'

// Layouts
import PublicLayout from '../../presentation/layouts/PublicLayout'
import AuthLayout from '../../presentation/layouts/AuthLayout'

// Public Pages
import Home from '../../presentation/pages/home/Home'
import Productos from '../../presentation/pages/productos/Productos'
import DetalleProducto from '../../presentation/pages/producto/DetalleProducto'
import Carrito from '../../presentation/pages/carrito/Carrito'
import Checkout from '../../presentation/pages/checkout/Checkout'
import Perfil from '../../presentation/pages/perfil/Perfil'

// Auth Pages
import Login from '../../presentation/pages/login/Login'
import Registro from '../../presentation/pages/registro/Registro'
import RecuperarContrasena from '../../presentation/pages/recuperar-contrasena/RecuperarContrasena'

export default function LayoutRoutes() {
    return (
        <Routes>
            {/* Rutas Públicas con Navbar y Footer */}
            <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="productos" element={<Productos />} />
                <Route path="producto/:id" element={<DetalleProducto />} />
                <Route path="carrito" element={<Carrito />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="perfil" element={<Perfil />} />
            </Route>

            {/* Rutas de Autenticación en pantalla completa */}
            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="registro" element={<Registro />} />
                <Route path="recuperar-contrasena" element={<RecuperarContrasena />} />
            </Route>
        </Routes>
    )
}
