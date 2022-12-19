import Sidebar from '../../components/common/Sidebar'
import AdminNav from '../../components/common/AdminNav'
import '../../css/admin.css'
import { Outlet } from 'react-router-dom'
function Admin() {
    return (
        <>
            <Sidebar />
            <section className="home-section">
                <AdminNav />
                <Outlet/>
            </section>
        </>
    )
}

export default Admin