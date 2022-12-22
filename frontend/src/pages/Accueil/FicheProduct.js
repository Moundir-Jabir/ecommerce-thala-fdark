import React, { useEffect, useState } from 'react'
import Navbar from '../../components/headers/Navbar'
import Footer from '../../components/headers/Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL, hostname } from '../../config'
import Product from '../../components/common/Product'

const FicheProduct = () => {

  const id = useParams().id
  const [product, setProduct] = useState({ images: [], category: { category_name: "" } })
  const [indice, setIndice] = useState(0)
  const [relatedProduct, setRelatedProduct] = useState([])
  let now = new Date()
  let oldPrice = ""
  let newPrice = ""
  if (product.promo_expiration > now) {
    oldPrice = product.price
    newPrice = oldPrice - (oldPrice * product.promotion) / 100
  } else
    newPrice = product.price

  useEffect(() => {
    axios.get(`${API_URL}/product/${id}`)
      .then(data => {
        setProduct(data.data)
        axios.post(`${API_URL}/product/all`, { Category_id: data.data.categoryCategoryId })
          .then(d => {
            setRelatedProduct(d.data.filter(p => p.product_id != id))
          })
      })
  }, [])

  return (
    <div>
      <Navbar />
      <section class="breadcrumb-option">
        <div class="">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb__text">
                <h4>Shop details</h4>
                <div class="breadcrumb__links">
                  <Link to="/home">Home</Link>
                  <Link to="/shop">Shop</Link>
                  <span>Shop details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="shop-details">
        <div class="product__details__pic">
          <div class="">
            <div class="row">
              <div class="col-lg-3 col-md-3">
                <ul class="nav nav-tabs" role="tablist">
                  {
                    product.images.map((image, i) => (
                      <li class="nav-item">
                        <img onClick={() => { setIndice(i) }} src={`${hostname}${image}`} />
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div class="col-lg-6 col-md-9">
                <div class="tab-content">
                  <div class="tab-pane active" id="tabs-1" role="tabpanel">
                    <div class="product__details__pic__item">
                      <img style={{ width: "50%" }} src={`${hostname}${product.images[indice]}`} alt="kjhkjhkjhkh" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product__details__content">
          <div class="">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-8">
                <div class="product__details__text">
                  <h4>{product.name}</h4>
                  <div class="rating">
                    <i class="fa fa-star"></i>
                    <span> - 1 Reviews</span>
                  </div>
                  <h3>{newPrice} MAD<span>{oldPrice}</span></h3>
                  <div class="product__details__cart__option">
                    <div class="quantity">
                    </div>
                    <a href="#" class="primary-btn">add to cart</a>
                  </div>
                  <div class="product__details__last__option">
                    <ul>
                      <li><span>Categorie:</span> {product.category.category_name}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="product__details__tab">
                  <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" data-toggle="tab" href="#tabs-5"
                        role="tab">Description</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-toggle="tab" href="#tabs-6" role="tab">Our Customers Experience</a>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="tabs-5" role="tabpanel">
                      <div class="product__details__tab__content">
                        <p class="note">{product.description}</p>
                      </div>
                    </div>
                    <div class="tab-pane" id="tabs-6" role="tabpanel">
                      <div class="product__details__tab__content">
                        <div class="product__details__tab__content__item">
                          <h5>Jhon Doe</h5>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sit molestiae mollitia totam explicabo nostrum, nisi, tempore reiciendis ipsa dolore pariatur fugit? Repudiandae aperiam, incidunt similique quis modi optio delectus?</p>

                          <h5 class="mt-3">Mondir</h5>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sit molestiae mollitia totam explicabo nostrum, nisi, tempore reiciendis ipsa dolore pariatur fugit? Repudiandae aperiam, incidunt similique quis modi optio delectus?</p>

                          <h5 class="mt-3">Bokhari</h5>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sit molestiae mollitia totam explicabo nostrum, nisi, tempore reiciendis ipsa dolore pariatur fugit? Repudiandae aperiam, incidunt similique quis modi optio delectus?</p>

                          <h5 class="mt-3">Jhon Doe Again</h5>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sit molestiae mollitia totam explicabo nostrum, nisi, tempore reiciendis ipsa dolore pariatur fugit? Repudiandae aperiam, incidunt similique quis modi optio delectus?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="related spad">
        <div class="">
          <div class="row">
            <div class="col-lg-12">
              <h3 class="related-title">Related Product</h3>
            </div>
          </div>
          <div class="row">
            {
              relatedProduct.map(product => (
                <Product data={product}/>
              ))
            }
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default FicheProduct