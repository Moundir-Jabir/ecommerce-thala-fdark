import React, { Fragment } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Accueil/Home'
import Login from './pages/Accueil/Login'
import Register from './pages/Accueil/Register'
import ForgotPassword from './pages/Accueil/ForgotPassword'
import Dashboard from './pages/User/Dashboard'
import { isAuthenticated } from './helpers'
import ResetPassword from './pages/Accueil/ResetPassword'
import NotFound from './pages/Accueil/NotFound'
import Navbar from './components/headers/Navbar'
import { Admin, Categories, CreateCategory, UpdateCategory, Products, CreateProduct, UpdateProduct, CodePromos, CreateCodePromo, UpdateCodePromo, Orders, UpdateOrder } from './pages/admin/index'

const Router = () => {

    const PrivateRoute = ({ children }) => {
        return isAuthenticated() ? (
            <Fragment>
                <Navbar />
                {children}
            </Fragment>
        ) : <Navigate to="/login" />
    }

    const PublicRoute = ({ children }) => {
        return isAuthenticated() ? <Navigate to="/dashboard" /> : children
    }

    return (
        <Routes>
            <Route path='/' element={<Navigate to="login" />} />
            <Route path='home' element={<PublicRoute><Home /></PublicRoute>} />
            <Route path='register' element={<PublicRoute><Register /></PublicRoute>} />
            <Route path='login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='forgotpassword' element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route path='resetpassword/:token' element={<PublicRoute><ResetPassword /></PublicRoute>} />
            <Route path='dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='admin' element={<Admin />} />
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
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Router