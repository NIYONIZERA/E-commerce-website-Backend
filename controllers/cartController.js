import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

const cartController = {
  // Add a product to the cart
  addToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const user = await userModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the product is already in the cart, if so, update the quantity
      const existingProductIndex = user.cart.findIndex(item => item.product.equals(productId));
      if (existingProductIndex !== -1) {
        user.cart[existingProductIndex].quantity += quantity;
      } else {
        user.cart.push({ product: productId, quantity });
      }

      await user.save();

      res.status(200).json({ message: 'Product added to cart successfully', cart: user.cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Update a product in the cart
  updateCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const user = await userModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Find the product in the user's cart
      const productIndex = user.cart.findIndex(item => item.product.equals(productId));
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }

      // Update the quantity of the product
      user.cart[productIndex].quantity = quantity;

      await user.save();

      res.status(200).json({ message: 'Cart updated successfully', cart: user.cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Remove a product from the cart
  removeFromCart: async (req, res) => {
    try {
      const { productId } = req.body;
      const user = await userModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Remove the product from the user's cart
      user.cart = user.cart.filter(item => !item.product.equals(productId));

      await user.save();

      res.status(200).json({ message: 'Product removed from cart successfully', cart: user.cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export default cartController;