import axios from 'axios'
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { API_URL } from '../../config'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { isAuthenticated, logout } from '../../helpers'
import profil from "../../assets/img/icon/me.png"
import panier from "../../assets/img/icon/cart.png"
import { connect } from 'react-redux'

const Navbar = (props) => {
    const navigate = useNavigate()

    const signout = () => {
        axios.get(`${API_URL}/auth/logout`)
            .then(() => {
                toastr.success('Logout successefuly', 'Logout', {
                    positionClass: "toast-bottom-left"
                })
                logout()
                navigate('/home')
            })
    }

    const { products } = props
    let total = 0
    products.forEach(product => {
        total += product.price * product.count
    })

    return (
        <header className="header">
            <div className="header__top">
                <div>
                    <div className="input-group w-50 mx-auto">
                        <input type="search" className="form-control" placeholder="Search" />
                        <button type="button" className="btn btn-outline-warning">search</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="row">
                    <div className="col-lg-3 col-md-3">
                        <div className="header__logo">
                            <Link to="/home" style={{ fontSize: '25px', fontWeight: 700, color: "black" }}>Thala Fdark</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <nav className="header__menu mobile-menu">
                            <ul>
                                <li className="active"><NavLink to="/home">Home</NavLink></li>
                                <li><NavLink to="/shop">Shop</NavLink></li>
                                {
                                    isAuthenticated() ? (<li onClick={signout}><NavLink>Logout</NavLink></li>) : (<li><NavLink to="/login">Sign in</NavLink></li>)
                                }
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <div className="header__nav__option">
                            <Link to="/profil"><img src={profil} width="25px" alt="" /></Link>
                            <Link to="/cart"><img src={panier} alt="" /> <span style={{ marginLeft: '6px', marginTop: '-18px', padding: '3px', backgroundColor: 'rgb(244, 201, 201)', borderRadius: '50%' }}> {products.length} </span></Link>
                            <div className="price">{total} MAD</div>
                        </div>
                    </div>
                </div>
                <div className="canvas__open"><i className="fa fa-bars"></i></div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({
    products: state.cart.products
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)