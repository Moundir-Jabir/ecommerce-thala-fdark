import { uniqBy } from 'lodash'

export const addToCart = (item) => {
    let items = JSON.parse(localStorage.getItem('cart')) || []
    item.count = 1
    items = uniqBy([...items, item], 'product_id')
    localStorage.setItem('cart', JSON.stringify(items))
    return {
        type: 'ADD_TO_CART',
        payload: items
    }
}

export const updateCount = (newItem) => {
    let items = JSON.parse(localStorage.getItem('cart'))
    console.log(newItem);
    items = items.map(item => (item.product_id == newItem.product_id) ? newItem : item)
    localStorage.setItem('cart', JSON.stringify(items))
    return {
        type: 'ADD_TO_CART',
        payload: items
    }
}

export const removeProduct = (id) => {
    let items = JSON.parse(localStorage.getItem('cart'))
    items = items.filter(item => item.product_id != id)
    localStorage.setItem('cart', JSON.stringify(items))
    return {
        type: 'ADD_TO_CART',
        payload: items
    }
}

export const emptyCart = () => {
    localStorage.setItem('cart', JSON.stringify([]))
    return {
        type: 'ADD_TO_CART',
        payload: []
    }
}