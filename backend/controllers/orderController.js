const makeOrder = (req, res) => {
    res.send(req.body.makeOrder)
}

const updateOrderStatus = (req, res) => {
    res.send(req.body.updateStatus)
}

const getOrders = (req, res) => {
    res.send('all orders')
} 

const getOrder = (req, res) => {
    res.send('one order')
}


module.exports = { makeOrder, updateOrderStatus, getOrders, getOrder }

