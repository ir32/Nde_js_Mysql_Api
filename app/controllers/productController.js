const Product = require('../models/productModel');

class ProductController {
  static async createProduct(req, res) {
    try {
      const { name, price, category_id } = req.body;
      const product_image = req.file.path; // Assuming you're using a file upload middleware

      const productData = {
        name,
        price,
        category_id,
        product_image,
      };

      const productId = await Product.createProduct(productData);

      res.json({ message: 'Product created successfully', productId });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  static async getProducts(req, res) {
    try {
      const products = await Product.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

}


module.exports = ProductController;
