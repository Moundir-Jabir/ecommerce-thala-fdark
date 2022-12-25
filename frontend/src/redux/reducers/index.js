import {combineReducers} from 'redux'
import cartReducer from './cartReducer'

const rootReducers = combineReducers({
    cart: cartReducer
})

export default rootReducers