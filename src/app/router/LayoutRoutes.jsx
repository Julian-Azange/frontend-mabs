import { Routes, Route } from 'react-router-dom'

import PublicLayout from '../../presentation/layouts/PublicLayout'
import AuthLayout from '../../presentation/layouts/AuthLayout'
import Home from '../../presentation/pages/home/Home'
import Productos from '../../presentation/pages/productos/Productos'
import DetalleProducto from '../../presentation/pages/producto/DetalleProducto'
import Carrito from '../../presentation/pages/carrito/Carrito'
import Checkout from '../../presentation/pages/checkout/Checkout'
import Perfil from '../../presentation/pages/perfil/Perfil'
import AdminLayout from '../../presentation/layouts/AdminLayout'
import DashboardAdmin from '../../presentation/pages/admin/Dashboard'
import GestionProductos from '../../presentation/pages/admin/GestionProductos'
import GestionUsuarios from '../../presentation/pages/admin/GestionUsuarios'
import PedidosAdmin from '../../presentation/pages/admin/Pedidos'
import ConfiguracionAdmin from '../../presentation/pages/admin/Configuracion'
import Login from '../../presentation/pages/login/Login'
import Registro from '../../presentation/pages/registro/Registro'
import RecuperarContrasena from '../../presentation/pages/recuperar-contrasena/RecuperarContrasena'

export default function LayoutRoutes() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="productos" element={<Productos />} />
                <Route path="producto/:id" element={<DetalleProducto />} />
                <Route path="carrito" element={<Carrito />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="perfil" element={<Perfil />} />
            </Route>

            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="registro" element={<Registro />} />
                <Route path="recuperar-contrasena" element={<RecuperarContrasena />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardAdmin />} />
                <Route path="productos" element={<GestionProductos />} />
                <Route path="usuarios" element={<GestionUsuarios />} />
                <Route path="pedidos" element={<PedidosAdmin />} />
                <Route path="configuracion" element={<ConfiguracionAdmin />} />
            </Route>
        </Routes>
    )
}
