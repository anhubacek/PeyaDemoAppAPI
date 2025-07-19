const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { email, order } = req.body;
    console.log("Creating order for email:", email);
    console.log("Order details:", order);
    if (!email || !order) {
      return res
        .status(400)
        .json({ message: "Email y productos son requeridos" });
    }
    const newOrder = {
      userEmail: email,
      products: order.products,
      total: order.total,
    };
    await Order.create(newOrder);
    userOrders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });
    res.status(201).json(userOrders);
  } catch (error) {
    console.log("Error creating order:", error);
    res.status(400).json({ message: "Error al crear pedido", error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ timestamp: -1 });
    res.json(orders);
  } catch (error) {
    console.log("Error getting orders:", error);
    res.status(500).json({ message: "Error al obtener pedidos", error });
  }
};
const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).sort({ timestamp: -1 });
    res.json(orders);
  } catch (error) {
    console.log("Error getting orders by user:", error);
    res
      .status(500)
      .json({ message: "Error al obtener pedidos del usuario", error });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrdersByUser,
};
