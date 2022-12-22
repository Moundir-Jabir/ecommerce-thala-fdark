import React from 'react'
import { Link } from 'react-router-dom'
import { hostname } from '../../config'

const Product = (props) => {
    const { product_id, images, name, price } = props.data
    return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
            <div className="product__item">
                <div className="product__item__pic set-bg">
                    <ul className="product__hover">
                        <Link to={`/product/${product_id}`}><img src={`${hostname}${images[0]}`} style={{ width: "80%" }} /></Link>
                    </ul>
                </div>
                <div className="product__item__text">
                    <h6>{name}</h6>
                    <a href="#" className="add-cart">+ Add To Cart</a>
                    <div className="rating">
                        <i className="fa fa-star-o"></i>
                    </div>
                    <h5>{price} MAD</h5>
                </div>
            </div>
        </div>
    )
}

export default Product