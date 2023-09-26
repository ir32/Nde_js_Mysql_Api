const CartModel = require('../models/cartModel');

class CartController {
  async createCartItem(req, res, next) {
    try {
      const cartItemData = req.body;

      // Validate cartItemData here (check for required fields, data types, etc.)

      const cartItemId = await CartModel.createCartItem(cartItemData);
      res.status(201).json({ message: 'Cart item created', cartItemId });
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  }

  async getCartItems(req, res) {
    try {
      const cartItems = await CartModel.getCartItems();
      res.json(cartItems);
    } catch (error) {
      console.error('Error getting cart items:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateCartItem(req, res) {
    try {
      const { cartItemId, newQuantity } = req.body;
      const success = await CartModel.updateCartItem(cartItemId, newQuantity);
      if (success) {
        res.json({ message: 'Cart item updated' });
      } else {
        res.status(404).json({ message: 'Cart item not found' });
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async deleteCartItem(req, res) {
    try {
      const cartItemId = req.params.id;
      const success = await CartModel.deleteCartItem(cartItemId);
      if (success) {
        res.json({ message: 'Cart item deleted' });
      } else {
        res.status(404).json({ message: 'Cart item not found' });
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new CartController();
