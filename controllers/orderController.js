import orderModel from "../models/orderModel.js"



const orderController = {
  // Create a new order
  createOrder: async (req, res) => {
    try {
        const newOrder = await orderModel.create(req.body);
      
        res.status(201)
        .json({ message: "Order created", Order: newOrder });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: error.message });
    }
  },

  // Get all orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await orderModel.find();
      res.status(200).json({message:'List od Order',Order:orders});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single order by ID
  getOrderById: async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        if (!order) {
          return res.status(404).json({ message: 'order not found with given Id' });
        }
        res.status(200).json(order);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  },

  // Update an order by ID
  updateOrder: async (req, res) => {
    orderModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedOrder) => {
      if (!updatedOrder) {
          return res
              .status(404)
              .json({ msg: 'No order with this id was found.' });
      }
      res.json({ updatedOrder });
  })
  .catch((err) => {
      res.status(400).send(err);
  });

  },

  // Delete an order by ID
  deleteOrder: async (req, res) => {
    orderModel.findByIdAndDelete
    (req.params.id)
    .then(() => {
        res.status(204).json({ msg: `order deleted` });
    }).catch((err) => {
        res.status(404).send("order not found`");
    })
  }
};

export default orderController;