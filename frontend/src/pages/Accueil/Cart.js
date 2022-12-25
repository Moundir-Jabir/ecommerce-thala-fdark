import React from 'react'
import Navbar from '../../components/headers/Navbar'
import { connect } from 'react-redux'
import { updateCount, removeProduct } from '../../redux/actions/cartActions'
import CartItem from '../../components/common/CartItem'
import { Link } from 'react-router-dom'

const Cart = (props) => {
  const { products } = props
  let total = 0
    products.forEach(product => {
        total += product.price * product.count
    })
  return (
    <div>
      <Navbar />
      <section class="breadcrumb-option">
        <div class="">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb__text">
                <h4>Shopping Cart</h4>
                <div class="breadcrumb__links">
                  <a href="./index.html">Home</a>
                  <a href="./shop.html">Shop</a>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="shopping-cart spad">
        <div class="">
          <div class="row">
            <div class="col-lg-8">
              <div class="shopping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.map((product, i) => (<CartItem data={product} key={i}/>))
                    }
                  </tbody>
                </table>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <div class="continue__btn">
                    <Link to="/shop">Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="cart__total">
                <h6>Cart total</h6>
                <ul>
                  <li>Total <span>{total} MAD</span></li>
                </ul>
                <a href="#" class="primary-btn">Proceed to checkout</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.cart.products
})

const mapDispatchToProps = { updateCount, removeProduct }

export default connect(mapStateToProps, mapDispatchToProps)(Cart)