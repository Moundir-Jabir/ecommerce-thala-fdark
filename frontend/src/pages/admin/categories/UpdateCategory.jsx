import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../helpers/api' 
import Sidebar from '../../../components/common/Sidebar'
import AdminNav from '../../../components/common/AdminNav'
import '../../../css/admin.css'

function CreateCategory() {

    const params = useParams()

    const [categoryName, setCategoryName] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [succ, setSucc] = useState('')
    const [err, setErr] = useState('')

    useEffect(() => {
        api.get(`/categories/${params.category_id}`)
            .then((response) => {
                setCategoryName(response.data.category_name)
                setCategoryImage(response.data.category_image)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [params.category_id])

    const updateCategory = (e) => {

        e.preventDefault()

        const data = new FormData()
        data.append('image', categoryImage)
        data.append('name', categoryName)

        api.put(`/categories/${params.category_id}`, data)
            .then((response) => {
                setSucc(response.data)
            })
            .catch((error) => {
                if(error.response?.status === 500) return setErr('invalid image format')
                setErr(error.response?.data?.erreur)
            })

    }

    return (
        <>
            <Sidebar />
            <section className="home-section">
                <AdminNav />
                <div className="container py-5">
                    <div className="mt-5 mb-2 py-2 px-2 rounded" style={ { backgroundColor: '#eee' } }>
                        <h4 className="mt-2 p-0 text-center">Create New Category</h4>
                        <p className="mt-2 p-0 text-success text-center">{ succ }</p>
                        <p className="mt-2 p-0 text-danger text-center">{ err }</p>
                        <form onSubmit={ updateCategory } method="post" encType='multipart/form-data' className="w-50 mx-auto border p-2">
                            <div className="form-outline mb-2">
                                <input type="text" id="category-name" className="form-control rounded-1" placeholder="Category x" onChange={(e) => { setCategoryName(e.target.value) }} value={categoryName} />
                            </div>
                            <div className="mb-2">
                                <input type="file" id="category-image" className="form-control rounded-1" onChange={(e) => { setCategoryImage(e.target.files[0]) }} />
                            </div>
                            <button type="submit" className="btn btn-primary rounded-1">Submit</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateCategory