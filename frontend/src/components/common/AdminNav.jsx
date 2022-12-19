
function AdminNav() {
    return (
        <div>
            <nav>
                <div className="sidebar-button">
                    <i className='bx bx-menu sidebarBtn'></i>
                    <span className="dashboard">Dashboard</span>
                </div>
                <div className="search-box">
                    <input type="text" placeholder="Search..."/>
                    <i className='bx bx-search' ></i>
                </div>
                <div className="profile-details">
                    <span className="admin_name">Hi, Manager</span>
                </div>
            </nav>
        </div>
    )
}

export default AdminNav