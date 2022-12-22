const Order = require('../models/Order')
const OrderdProduct = require('../models/OrdredProduct')

const makeOrder = async (req, res) => {

    if(!req.body) return res.status(400).json({ error: 'no data to work with' })

    let orderData = await Order.create({
        amount_paid: req.body.amount,
        client_address: req.body.address,
        client_city: req.body.city, 
        userId: req.profil.id
    }).then((data) => {
        const dataObj = data.get({ plain: true })
        return dataObj
    }).catch((err) => {
        res.status(400).json({
            error: err     
        })
    })

    let productData = req.body.products
    productData.forEach(product => {
        product.orderId = orderData.order_id
    })

    OrderdProduct.bulkCreate(productData)
        .then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(400).json({ error: err })
        })

}

const updateOrderStatus = (req, res) => {
    Order.update({
        order_status: req.body.status
    }, { where: { order_id: req.order.order_id } })
        .then(() => {
            res.send('Order Status updated Succefully')
        }).catch((err) => {
            res.send(err.message)
        })
}

const getOrder = (req, res) => {
    res.send(req.order)
}

const getOrders = (req, res) => {
    OrderdProduct.findAll({ raw: true, nest: true })
        .then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(400).json({ error: err })
        })
} 

module.exports = { makeOrder, updateOrderStatus, getOrders, getOrder }

