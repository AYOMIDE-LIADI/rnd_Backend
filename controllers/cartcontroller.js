const mongoose = require('mongoose');
const Cart = require("../models/cartModel");

// Add item to cart
exports.addToCart = async (req, res) => {
    const { userId, items } = req.body;  
    if (!userId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }
  
    const { productId, quantity = 1 } = items[0];
  
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      const existingItem = cart.items.find(
        item => item.productId.toString() === productId.toString()
      );
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
  
      await cart.save();
      res.status(200).json({ success: true, message: "Cart updated successfully", cart });
    } catch (err) {
      console.error("Backend error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  };
  


// Get user's cart by userId
exports.getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        res.status(200).json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Remove single item from cart
exports.deleteCartItem = async (req, res) => {
    const { userId, productId } = req.params;
  
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
      }
  
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  
      await cart.save();
  
      res.status(200).json({ success: true, message: "Item removed from cart", cart });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  

// Clear entire cart
exports.clearUserCart = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
  
      cart.items = [];
      await cart.save();
  
      res.status(200).json({ success: true, message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
