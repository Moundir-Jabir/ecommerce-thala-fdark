import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React from 'react'
import { API_URL } from '../../config'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { logout } from '../../helpers'

function Sidebar() {

    // let sidebar = document.querySelector(".sidebar")
    // let sidebarBtn = document.querySelector(".sidebarBtn")
    // sidebarBtn.onclick = function() {
    // sidebar.classList.toggle("active")
    // if(sidebar.classList.contains("active")){
    //     sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right")
    // } else
    //     sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu")
    // }

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
        <div className="sidebar">
            <div className="logo-details">
                <i className='bx bx-store-alt'></i>                
                <span className="logo_name">ThalaFdark</span>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/admin/dashboard">
                        <i className='bx bx-grid-alt' ></i>
                        <span className="links_name">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/products">
                        <i className='bx bx-box' ></i>
                        <span className="links_name">Products</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/orders">
                        <i className='bx bx-book-alt' ></i>
                        <span className="links_name">Total orders</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/categories">
                        <i className='bx bx-category' ></i>
                        <span className="links_name">Categories</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/code-promos">
                        <i className='bx bx-barcode'></i>                        
                        <span className="links_name">Code Promos</span>
                    </Link>
                </li>
                <li onClick={signout} className="log_out">
                    <p>
                        <i className='bx bx-log-out'></i>
                        <span className="links_name">Log out</span>
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar