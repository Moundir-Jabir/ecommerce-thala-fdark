import { Link } from 'react-router-dom'

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

    return (
        <div className="sidebar">
            <div className="logo-details">
                <i className='bx bx-store-alt'></i>                
                <span className="logo_name">ThalaFdark</span>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/admin">
                        <i className='bx bx-grid-alt' ></i>
                        <span className="links_name">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/products">
                        <i className='bx bx-box' ></i>
                        <span className="links_name">Products</span>
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <i className='bx bx-book-alt' ></i>
                        <span className="links_name">Total orders</span>
                    </Link>
                </li>
                <li>
                    <Link to="/categories">
                        <i className='bx bx-category' ></i>
                        <span className="links_name">Categories</span>
                    </Link>
                </li>
                <li>
                    <Link to="/code-promos">
                        <i className='bx bx-barcode'></i>                        
                        <span className="links_name">Code Promos</span>
                    </Link>
                </li>
                <li className="log_out">
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