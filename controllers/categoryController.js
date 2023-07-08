const Category = require("../models/categoryModel");

// In-memory array to store category data
const categories = [];

const createCategory = (req, res) => {
  const {name} = req.body;

  // Validation
  if (!name || name.length < 3) {
    return res.status(400).json({error: "Invalid category name"});
  }

  // Create a new category
  const category = new Category(name);
  categories.push(category);

  res.json(category);
};

const updateCategory = (req, res) => {
  const {id} = req.params;
  const {name} = req.body;

  // Validation
  if (!name || name.length < 3) {
    return res.status(400).json({error: "Invalid category name"});
  }

  // Find category by id
  const category = categories.find((c) => c.id === parseInt(id));

  if (!category) {
    return res.status(404).json({error: "Category not found"});
  }

  // Update the category
  category.name = name;

  res.json(category);
};

const getAllCategories = (req, res) => {
  res.json(categories);
};

const getCategoryById = (req, res) => {
  const {id} = req.params;

  // Find category by id
  const category = categories.find((c) => c.id === parseInt(id));

  if (!category) {
    return res.status(404).json({error: "Category not found"});
  }

  res.json(category);
};

const deleteCategory = (req, res) => {
  const {id} = req.params;

  // Find category index by id
  const categoryIndex = categories.findIndex((c) => c.id === parseInt(id));

  if (categoryIndex === -1) {
    return res.status(404).json({error: "Category not found"});
  }

  // Remove the category from the array
  const deletedCategory = categories.splice(categoryIndex, 1);

  res.json(deletedCategory[0]);
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
