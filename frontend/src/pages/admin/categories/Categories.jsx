import { useEffect, useState } from 'react'
import { api } from '../../../helpers/api' 
import { Link } from "react-router-dom";
import Sidebar from '../../../components/common/Sidebar'
import AdminNav from '../../../components/common/AdminNav'
import '../../../css/admin.css'

function Categories() {

    const [categories, setCategories] = useState([])
    const [err, setErr] = useState()

    const apiHost = 'http://localhost:4000'

    useEffect(() => {
        api.get('/categories')
            .then((response) => {
                // console.log(response)
                setCategories(response.data)
            })
            .catch((error) => {
                // console.log(error)
                setErr(error.response?.data?.message)
            })
    }, [])

    const deleteCategory = (id) => {
        api.delete(`/categories/${id}`)
        .then((response) => {
            let result = categories.filter(cat => cat.category_id !== id)
            console.log(result)
            setCategories(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Sidebar />
            <section className="home-section">
                <AdminNav />
                <div className="container py-5">
                    <p className='text-center text-danger'>{ err }</p>
                    <div className="d-flex align-items-center justify-content-between mt-5 mb-2 py-2 px-2 rounded" style={ { backgroundColor: 'rgb(201, 197, 197)' } }>
                        <h4 className="m-0 p-0">Categories</h4>
                        <Link to="/categories/create" className="btn btn-primary me-1" data-mdb-ripple-color="dark" style={ { width: 'fit-content !important' } }>Create Category</Link>
                    </div>
                    <div className="row">
                        {
                            categories.map((category) => (
                                <div className="col-md-12 col-lg-4 mb-2" key={ category.category_id }>
                                    <div className="card text-black">
                                        <img src={ apiHost+category.category_image } className="card-img-top" alt="iPhone" />
                                        <div className="card-body">
                                            <div className="text-center mt-1">
                                                <h4 className="card-title">{ category.category_name }</h4>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <Link to={{ pathname: `/categories/update/${category.category_id}` }} className="btn btn-primary flex-fill me-1 mx-1" data-mdb-ripple-color="dark">update</Link>
                                                <button type="button" className="btn btn-danger flex-fill ms-1" 
                                                    onClick={ ()=>{ deleteCategory(category.category_id) }}
                                                >Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Categories