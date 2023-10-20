//______________________________
//          COMP229             |
//  Assignment 2                |
//  Student: Radmir Taskynbayev |
//  ID: 301239725               |
//______________________________|

const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  try {
    const newProduct = new Product({ name, description, price, quantity, category });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, quantity, category } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      name,
      description,
      price,
      quantity,
      category
    }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products have been removed.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.findProductsByName = async (req, res) => {
  const keyword = req.query.name;
  try {
    const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
