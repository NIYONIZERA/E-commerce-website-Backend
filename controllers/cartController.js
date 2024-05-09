import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import cartModel from "../models/cartModel.js";

const cartController = {
  // Get the user's cart
  getCart: async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const cart= await cartModel.findById(userId,req.params.userId)
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Add a product to the cart
  addToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const product = await productModel.findById(productId);

      // Check if the product exists
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Ensure that a user is logged in and get the user ID
      const userId = req.user._id;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Find the logged-in user and their cart
      let user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the product is already in the cart, if so, update the quantity
      const existingCartItem = await cartModel.findOne({ user: userId, product: productId });
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
      } else {
        const newCartItem = new cartModel({ user: userId, product: productId, quantity });
        await newCartItem.save();
      }

      // Retrieve the updated user cart after adding the product
      user = await userModel.findById(userId);

      // Respond with success message and updated cart
      res.status(200).json({
        message: "Product added to cart successfully",
        cart: user.cart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Remove a product from the cart
  // Remove a product from the cart
  removeFromCart: async (req, res) => {
    try {
      const { cartId } = req.query;
  
      // Find the product in the cart and remove it
      const removedProduct = await cartModel.findByIdAndDelete(cartId);
      
      if (!removedProduct) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
  
      res.status(200).json({
        message: "Product removed from cart successfully",
        removedProduct: removedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
}  
export default cartController;