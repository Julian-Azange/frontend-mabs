import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { getAuthorizedRoutes } from '../services/routeService'

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
import Contacto from '../../presentation/pages/contacto/Contacto'

const componentMap = {
    Home,
    Productos,
    DetalleProducto,
    Carrito,
    Checkout,
    Perfil,
    Login,
    Registro,
    RecuperarContrasena,
    DashboardAdmin,
    GestionProductos,
    GestionUsuarios,
    PedidosAdmin,
    ConfiguracionAdmin,
    Contacto
}

export default function LayoutRoutes() {
    const [authorizedRoutes, setAuthorizedRoutes] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        const loadRoutes = async () => {
            try {
                const routes = await getAuthorizedRoutes()
                setAuthorizedRoutes(routes)
            } catch (error) {
                console.error('Error cargando rutas:', error)
            }
        }

        if (user) {
            loadRoutes()
        }
    }, [user])

    if (!authorizedRoutes && user) {
        return <div>Cargando rutas...</div>
    }

    const renderRoutes = (routes) => {
        return routes.map((route) => {
            const Component = componentMap[route.component]
            if (!Component) {
                console.warn(`Componente no encontrado: ${route.component}`)
                return null
            }

            if (route.children) {
                return (
                    <Route key={route.path} path={route.path} element={<Component />}>
                        {renderRoutes(route.children)}
                    </Route>
                )
            }

            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<Component />}
                />
            )
        })
    }

    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="productos" element={<Productos />} />
                <Route path="producto/:id" element={<DetalleProducto />} />
                <Route path="carrito" element={<Carrito />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="contacto" element={<Contacto />} />
                {user && <Route path="perfil" element={<Perfil />} />}
            </Route>

            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="registro" element={<Registro />} />
                <Route path="recuperar-contrasena" element={<RecuperarContrasena />} />
            </Route>

            {user && authorizedRoutes?.adminRoutes && (
                <Route path="/admin" element={<AdminLayout />}>
                    {renderRoutes(authorizedRoutes.adminRoutes)}
                </Route>
            )}
        </Routes>
    )
}
