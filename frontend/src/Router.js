import React, { Fragment } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Accueil/Home'
import Login from './pages/Accueil/Login'
import Register from './pages/Accueil/Register'
import ForgotPassword from './pages/Accueil/ForgotPassword'
import Dashboard from './pages/User/Dashboard'
import { isAuthenticated, isClient, isManager } from './helpers'
import ResetPassword from './pages/Accueil/ResetPassword'
import NotFound from './pages/Accueil/NotFound'
import Navbar from './components/headers/Navbar'
import { Admin, Categories, CreateCategory, UpdateCategory, Products, CreateProduct, UpdateProduct, CodePromos, CreateCodePromo, UpdateCodePromo, Orders, UpdateOrder } from './pages/admin/index'
import AdminDashboard from './pages/admin/dashbord/AdminDashboard'
import Shop from './pages/Accueil/Shop'
import Profil from './pages/User/Profil'
import Cart from './pages/Accueil/Cart'
import FicheProduct from './pages/Accueil/FicheProduct'

const Router = () => {

    const PrivateRoute = ({ children }) => {
        return isClient() ? (
            <Fragment>
                <Navbar />
                {children}
            </Fragment>
        ) : <Navigate to="/login" />
    }

    const ManagerRoute = ({ children }) => {
        return isManager() ? children : <Navigate to="/login" />
    }

    const PublicRoute = ({ children }) => {
        return isAuthenticated() ? <Navigate to="/home" /> : children
    }

    return (
        <Routes>
            <Route path='/' element={<Navigate to="home" />} />
            <Route path='home' element={<Home />} />
            <Route path='shop' element={<Shop />} />
            <Route path='register' element={<PublicRoute><Register /></PublicRoute>} />
            <Route path='login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='forgotpassword' element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route path='resetpassword/:token' element={<PublicRoute><ResetPassword /></PublicRoute>} />
            <Route path='profil' element={<PrivateRoute><Profil /></PrivateRoute>} />
            <Route path='cart' element={<Cart />} />
            <Route path='product/:id' element={<FicheProduct />} />
            <Route path='admin' element={<ManagerRoute><Admin /></ManagerRoute>}>
                <Route path='dashboard' element={<AdminDashboard />} />
                <Route path='categories' element={<Categories />} />
                <Route path='categories/create' element={<CreateCategory />} />
                <Route path='categories/update/:category_id' element={<UpdateCategory />} />
                <Route path='products' element={<Products />} />
                <Route path='products/create' element={<CreateProduct />} />
                <Route path='products/update/:product_id' element={<UpdateProduct />} />
                <Route path='code-promos' element={<CodePromos />} />
                <Route path='code-promos/create' element={<CreateCodePromo />} />
                <Route path='code-promos/update/:code_promo_id' element={<UpdateCodePromo />} />
                <Route path='orders' element={<Orders />} />
                <Route path='orders/update/:code_promo_id' element={<UpdateOrder />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Router