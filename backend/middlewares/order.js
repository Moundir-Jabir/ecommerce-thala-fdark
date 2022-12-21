const Order = require('../models/Order')

exports.getOrderById = (req, res, next, order_id) => {
    Order.findByPk(order_id)
        .then(data => {
            req.order = data
            next()
        })
        .catch(err => {
            return res.status(404).json({
                error: 'Order not found'
            })
        })
}