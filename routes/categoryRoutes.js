const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware.isAuthenticated,
  categoryController.createCategory
);
router.put(
  "/:id",
  authMiddleware.isAuthenticated,
  categoryController.updateCategory
);
router.get(
  "/",
  authMiddleware.isAuthenticated,
  categoryController.getAllCategories
);
router.get(
  "/:id",
  authMiddleware.isAuthenticated,
  categoryController.getCategoryById
);
router.delete(
  "/:id",
  authMiddleware.isAuthenticated,
  categoryController.deleteCategory
);

module.exports = router;
