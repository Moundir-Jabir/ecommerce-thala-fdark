let items = JSON.parse(localStorage.getItem('cart')) || []

let myState = {
    products: items
}

const cartReducer = (state = myState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state, products: action.payload
            }
        default:
            return state
    }
}

export default cartReducer