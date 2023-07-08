const Product = require("../models/productModel");

// In-memory array to store product data
const products = [];

const createProduct = (req, res) => {
  const {name, price, category_id} = req.body;

  // Validation
  if (!name || name.length < 3 || isNaN(price) || isNaN(category_id)) {
    return res.status(400).json({error: "Invalid product details"});
  }

  // Check if the category exists
  const categoryExists = categories.some((c) => c.id === parseInt(category_id));

  if (!categoryExists) {
    return res.status(404).json({error: "Category not found"});
  }

  // Create a new product
  const product = new Product(name, price, category_id);
  products.push(product);

  res.json(product);
};

const updateProduct = (req, res) => {
  const {id} = req.params;
  const {name, price, category_id} = req.body;

  // Validation
  if (!name || name.length < 3 || isNaN(price) || isNaN(category_id)) {
    return res.status(400).json({error: "Invalid product details"});
  }

  // Find product by id
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({error: "Product not found"});
  }

  // Check if the category exists
  const categoryExists = categories.some((c) => c.id === parseInt(category_id));

  if (!categoryExists) {
    return res.status(404).json({error: "Category not found"});
  }

  // Update the product
  product.name = name;
  product.price = price;
  product.category_id = category_id;

  res.json(product);
};

const getAllProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const {id} = req.params;

  // Find product by id
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({error: "Product not found"});
  }

  res.json(product);
};

const deleteProduct = (req, res) => {
  const {id} = req.params;

  // Find product index by id
  const productIndex = products.findIndex((p) => p.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).json({error: "Product not found"});
  }

  // Remove the product from the array
  const deletedProduct = products.splice(productIndex, 1);

  res.json(deletedProduct[0]);
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};
