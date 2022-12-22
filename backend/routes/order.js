const express = require('express')
const router = express.Router()
const { requireSignin, isAdmin } = require('../middlewares/auth')
const { makeOrder, updateOrderStatus, getOrders, getOrder } = require("../controllers/orderController")
const { getOrderById } = require('../middlewares/order')
const { userById } = require('../middlewares/user')

router.post('/:id', [requireSignin], makeOrder)
router.patch('/:order_id', [requireSignin, isAdmin], updateOrderStatus)
router.get('/', getOrders)
router.get('/:order_id', getOrder)

router.param('order_id', getOrderById)
router.param('id', userById)

module.exports = router
