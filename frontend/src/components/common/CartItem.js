import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { API_URL, hostname } from '../../config'
import { updateCount, removeProduct } from '../../redux/actions/cartActions'

const CartItem = (props) => {
    const { product_id, price, count } = props.data
    const [product, setProduct] = useState({ images: [] })

    useEffect(() => {
        axios.get(`${API_URL}/product/${product_id}`)
            .then(data => setProduct(data.data))
    })

    const plus = (prod) => {
        if (prod.count < product.stock) {
            prod.count++
            props.updateCount(prod)
        }
    }

    const minus = (product) => {
        if (product.count > 1) {
            product.count--
            props.updateCount(product)
        }
    }

    const remove = (id) => {
        props.removeProduct(id)
    }

    return (
        <tr>
            <td class="product__cart__item">
                <div class="product__cart__item__pic">
                    <img style={{ width: "100px" }} src={`${hostname}/${product.images[0]}`} alt="product image" />
                </div>
                <div class="product__cart__item__text">
                    <h6>{product.name}</h6>
                    <h5>{price} MAD</h5>
                </div>
            </td>
            <td class="quantity__item cart__close">
                <div class="quantity">
                    <div class="pro-qty-2">
                        <i onClick={() => minus(props.data)} class="fa fa-minus"></i>
                        <span> {count} </span>
                        <i onClick={() => plus(props.data)} class="fa fa-plus"></i>
                    </div>
                </div>
            </td>
            <td class="cart__price">{price * count} MAD</td>
            <td class="cart__discuont__code discount-switch">Discount Code ?</td>
            <td class="cart__close"><i onClick={() => remove(product_id)} class="fa fa-close"></i></td> <br />
        </tr>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { updateCount, removeProduct }

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)