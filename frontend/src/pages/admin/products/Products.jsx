import '../../../css/admin.css'
import '../../../assets/css/style.css'
import { Link } from 'react-router-dom'

function Products() {
    return (
        <>
            <div className="py-5 mx-auto" style={{ width: '80%' }}>
                <div className="d-flex align-items-center justify-content-between mt-5 mb-2 py-2 px-2 rounded" style={{ backgroundColor: 'rgb(201, 197, 197)' }}>
                    <h4 className="m-0 p-0">Products</h4>
                    <Link to="/admin/products/create" className="btn btn-primary me-1" data-mdb-ripple-color="dark" style={{ width: 'fit-content !important' }}>Create Product</Link>
                </div>
            </div>
        </>
    )
}

export default Products