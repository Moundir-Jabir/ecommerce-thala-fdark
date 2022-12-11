import axios from 'axios'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { API_URL } from '../../config'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { logout } from '../../helpers'

const Navbar = () => {
    const id = JSON.parse(localStorage.getItem('user_info'))._id
    const navigate = useNavigate()

    const signout = () => {
        axios.get(`${API_URL}/auth/logout`)
            .then(() => {
                toastr.success('Logout successefuly', 'Logout', {
                    positionClass: "toast-bottom-left"
                })
                logout()
                navigate('/')
            })
    }
    return (
        <header className="page-topbar" id="header">
            <div className="navbar navbar-fixed">
                <nav className="navbar-main navbar-color nav-collapsible sideNav-lock navbar-dark gradient-45deg-indigo-purple no-shadow">
                    <div className="nav-wrapper">
                        <ul className="navbar-list right">
                            <li><NavLink to='/dashboard' className="waves-effect waves-block waves-light profile-button" data-target="profile-dropdown">Dashboard</NavLink></li>
                            <li><NavLink to='/profil' className="waves-effect waves-block waves-light profile-button" data-target="profile-dropdown"><span className="avatar-status avatar-online"><img src={`${API_URL}/user/image/${id}`} alt="avatar" /><i></i></span></NavLink></li>
                            <li onClick={signout}><a className="waves-effect waves-block waves-light notification-button" data-target="notifications-dropdown"><i className="material-icons">exit_to_app</i></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar