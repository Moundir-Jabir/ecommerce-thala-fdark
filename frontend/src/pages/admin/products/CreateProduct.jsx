import { useState, useEffect } from 'react'
import { api } from '../../../helpers/api'
import '../../../css/admin.css'

function CreateProduct() {

  const [products, setProducts] = useState({})
  const [images, setImages] = useState([])
  const [categories, setCategories] = useState([])
  const [succ, setSucc] = useState('')
  const [err, setErr] = useState('')
  const token = JSON.parse(localStorage.getItem('token'))
  
  const getCategories = () => {
    api.get('/categories', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        // console.log(response)
        setCategories(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChange = (e) => {
    setProducts({
      ...products,
      [e.target.name]: e.target.value
    }) 
  } 

  const handleImages = (e) => {
    setImages({
      ...images,
      [e.target.name]: e.target.files
    })
  }
  
  const saveProducts = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', products.name)
    data.append('description', products.description)
    data.append('stock', products.stock)
    data.append('price', products.price)
    data.append('promotion', products.promotion)
    data.append('promo_expiration', products.promo_expiration)
    data.append('Category_id', products.category)
    Array.from(images.images).forEach((image) => {
      data.append('images', image)
    })

    api.post('/product', data)
        .then((response) => {
          setSucc(response.data)
          console.log(response)
        })
        .catch((error) => {
            if (error.response?.status === 500) return setErr('invalid image format')
            setErr(error.response?.data?.error)
            console.log(error)
        })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <div className="py-5 mx-auto" style={{ width: '80%' }}>
        <div className="mt-5 mb-2 py-2 px-2 rounded" style={{ backgroundColor: '#eee' }}>
            <h4 className="mt-2 p-0 text-center">Publish New Product</h4>
            <p className="mt-2 p-0 text-success text-center">{ succ }</p>
            <p className="mt-2 p-0 text-danger text-center">{ err }</p>
            <form onSubmit={ saveProducts } method="post" encType='multipart/form-data' className="w-75 mx-auto border p-2">
              <div className="form-outline mb-2">
                  <input type="text" id="product-name" name='name' className="form-control rounded-1" placeholder="Product Name" onChange={ handleChange } />
              </div>

              <div className="form-outline mb-2">
                  <input type="number" id="product-price" name='price' className="form-control rounded-1" placeholder="Product Price" onChange={ handleChange } />
              </div>

              <div className="form-outline mb-2">
                  <input type="number" id="product-stock" name='stock' className="form-control rounded-1" placeholder="Product Stock" onChange={ handleChange } />
              </div>

              <div className="form-outline mb-2">
                  <input type="number" id="product-discount" name='promotion' className="form-control rounded-1" placeholder="Product percentage discount" onChange={ handleChange } />
              </div>

              <div className="form-outline mb-2">
                  <input type="datetime-local" id="product-discount-expiration" name='promo_expiration' className="form-control rounded-1" placeholder="Product percentage discount" onChange={ handleChange } />
              </div>

              <div className="form-outline mb-2">
                  <input type="file" id="product-image1" name='images' className="form-control rounded-1" onChange={ handleImages } multiple />
              </div>

              <div className="form-outline mb-2">
                  <textarea type="email" id="product-description" name="description" className="form-control rounded-1" onChange={ handleChange }  placeholder="Product Description ...."></textarea>
              </div>

              <div className="form-outline mb-2">
                  <select name="category" className="form-control" value={ products.category }  onChange={ handleChange } >
                      <option value="" selected disabled hidden>select category</option>
                      {
                        categories.map((category) => (
                          <option value={ category.category_id } key={ category.category_id }>{ category.category_name }</option>
                        ))
                      }                
                  </select>
              </div>

              <button type="submit" className="btn btn-primary rounded-1">Submit</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default CreateProduct

