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
  static async createbanner(req, res) {
    try {
      const { image, product, company } = req.body;
      const imagePath = req.file.path; // Assuming you're using a file upload middleware

      const bannerData = {
        image: imagePath,
        product,
        company,
      };

      const bannerId = await Product.post_banner(bannerData);

      res.json({ message: 'Banner created successfully', bannerId });
    } catch (error) {
      console.error('Error creating banner:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  static async product_banner(req, res) {
    try {
      const products = await Product.getbanner();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  static async get_discount (req, res) {
    try {
      const data_dis = await Product.all_discount_product();
      const formattedData = data_dis.map(discount => ({
        id: discount.id,
        name: discount.name,
        desc_pro: discount.desc_pro,
        discount_percentage: discount.discount_percentage
      }));

      res.json({ Discount: formattedData })
      // const data_dis = await Product.all_discount_product();
      // res.json(data_dis);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });    }
  }
  static async post_dis_product(req, res) {
    try {
      const { name, desc_pro, discount_percentage } = req.body;
      const result = await Product.createDiscountProduct(name, desc_pro, discount_percentage);
      res.status(201).json(result);

    } catch (error) {
      res.status(500).json({ message: 'Server error' });

    }
  }
}


module.exports = ProductController;
