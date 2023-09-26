// models/cartModel.js
const pool = require('../config/database');

class CartModel {
  async createCartItem(cartItemData) {
    // Insert a new item into the cart table
    const [result] = await pool.execute(
      'INSERT INTO cart (product_id, quantity) VALUES (?, ?)',
      [cartItemData.product_id, cartItemData.quantity]
    );
    return result.insertId;
  }

  async getCartItems() {
    // Retrieve all items from the cart table
    const [rows] = await pool.execute('SELECT * FROM cart');
    return rows;
  }

  async updateCartItem(cartItemId, newQuantity) {
    // Update the quantity of a cart item
    const [result] = await pool.execute(
      'UPDATE cart SET quantity = ? WHERE id = ?',
      [newQuantity, cartItemId]
    );
    return result.affectedRows > 0;
  }

  async deleteCartItem(cartItemId) {
    // Delete a cart item by ID
    const [result] = await pool.execute('DELETE FROM cart WHERE id = ?', [
      cartItemId,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = new CartModel();
