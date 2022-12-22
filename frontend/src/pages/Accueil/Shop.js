import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Product from '../../components/common/Product'
import CategoryFilter from '../../components/common/CategoryFilter'
import PriceFilter from '../../components/common/PriceFilter'
import SearchFilter from '../../components/common/SearchFilter'
import Navbar from '../../components/headers/Navbar'
import { API_URL } from '../../config'

const Shop = () => {
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    Category_id: [],
    nameFilter: "",
    price: [0, 100000]
  })
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(12)
  const [products, setProducts] = useState([])

  const getCategories = () => {
    axios.get(`${API_URL}/categories`)
      .then(res => setCategories(res.data))
  }

  const getFilterProducts = (filters, skip, limit) => {
    return axios.post(`${API_URL}/product/all/?offset=${skip}&limit=${limit}`, filters)
  }

  useEffect(getCategories, [])
  useEffect(() => {
    getFilterProducts(filters, skip, limit)
      .then(res => setProducts(res.data))
  }, [filters])

  const handleFilters = (filterBy, data) => {
    setFilters({
      ...filters, [filterBy]: data
    })
    setSkip(0)
  }

  const loadMore = () => {
    setSkip(skip + limit)
    getFilterProducts(filters, skip + limit, limit)
      .then(res => setProducts([...products, ...res.data.products]))
  }

  return (
    <div>
      <Navbar />
      <section class="breadcrumb-option">
        <div class="">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb__text">
                <h4>Shop</h4>
                <div class="breadcrumb__links">
                  <Link to="/home">Home</Link>
                  <span>Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="shop spad">
        <div class="">
          <div class="row">
            <div class="col-lg-3">
              <div class="shop__sidebar">
                <SearchFilter handleFilters={handleFilters} />
                <div class="shop__sidebar__accordion">
                  <div class="accordion" id="accordionExample">
                    <CategoryFilter handleFilters={handleFilters} categories={categories} />
                    <PriceFilter handleFilters={handleFilters} />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-9">
              <div class="row">
                {
                  products.length != 0 ? products.map(product => (<Product data={product}/>)) : null
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop