import React, { useEffect, useState } from 'react'
import '../../assets/css/font-awesome.min.css'
import '../../assets/css/elegant-icons.css'
import '../../assets/css/magnific-popup.css'
import '../../assets/css/nice-select.css'
import '../../assets/css/slicknav.min.css'
import '../../assets/css/style.css'
import '../../assets/css/bootstrap.min.css'
import Navbar from '../../components/headers/Navbar'
import Footer from '../../components/headers/Footer'
import axios from 'axios'
import { API_URL, hostname } from '../../config'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Product from '../../components/common/Product'

const Home = () => {
  const [dealWeak, setDealWeak] = useState(null)
  const [sousMenu, setSousMenu] = useState(true)
  const [products, setProducts] = useState([])
  let bestSealer = sousMenu ? "active" : ""
  let newArrivals = sousMenu ? "" : "active"

  useEffect(() => {
    axios.get(`${API_URL}/product/promo/dealOfTheWeak`)
      .then(data => {
        setDealWeak(data.data)
      })
  }, [])

  useEffect(() => {
    let orderby = sousMenu ? "qauntity_purchased" : "createdAt"
    axios.post(`${API_URL}/product/all/?orderby=${orderby}&&limit=8`)
      .then(data => {
        setProducts(data.data)
      })
  }, [sousMenu])

  const handleClick = () => {
    setSousMenu(!sousMenu)
  }

  return (
    <div>
      <Navbar />
      {
        dealWeak ? (
          <section className="categories spad swiper mySwiper">
            <div className="swiper-wrapper">
              <div className="row swiper-slide">
                <div className="col-lg-5">
                  <div className="categories__hot__deal">
                    <img src={`${hostname}${dealWeak.images[0]}`} alt="" />
                    <div className="hot__deal__sticker">
                      <span style={{ marginBottom: "15px" }}></span>
                      <h5>{dealWeak.promotion}% Off</h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 offset-lg-1">
                  <div className="categories__deal__countdown">
                    <span>Deal Of The Week</span>
                    <h2>{dealWeak.name}</h2>
                    <div className="categories__deal__countdown__timer" id="countdown">
                      <div>
                        <span style={{ marginLeft: "30px" }}>{moment(dealWeak.promo_expiration).fromNow(true)} left</span>
                      </div>
                    </div>
                    <Link to="/shop" className="primary-btn">Shop now</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null
      }
      <section className="product spad">
        <div className="mt-5">
          <div className="row">
            <div className="col-lg-12">
              <ul className="filter__controls">
                <li onClick={handleClick} className={bestSealer}>Best Sellers</li>
                <li onClick={handleClick} className={newArrivals}>New Arrivals</li>
              </ul>
            </div>
          </div>
          <div className="row product__filter">
            {
              products.map(product => (
                <Product key={product.product_id} data={product} />
              ))
            }
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default Home