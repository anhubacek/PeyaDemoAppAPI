const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log('Error creating order:', error);
    res.status(400).json({ message: "Error al crear pedido", error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ timestamp: -1 });
    res.json(orders);
  } catch (error) {
    console.log('Error getting orders:', error);
    res.status(500).json({ message: 'Error al obtener pedidos', error });
  }
};
const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).sort({ timestamp: -1 });
    res.json(orders);
  } catch (error) {
    console.log('Error getting orders by user:', error);
    res.status(500).json({ message: 'Error al obtener pedidos del usuario', error });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrdersByUser
};
