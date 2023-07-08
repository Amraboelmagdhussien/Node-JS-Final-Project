const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware.isAuthenticated,
  productController.createProduct
);
router.put(
  "/:id",
  authMiddleware.isAuthenticated,
  productController.updateProduct
);
router.get(
  "/",
  authMiddleware.isAuthenticated,
  productController.getAllProducts
);
router.get(
  "/:id",
  authMiddleware.isAuthenticated,
  productController.getProductById
);
router.delete(
  "/:id",
  authMiddleware.isAuthenticated,
  productController.deleteProduct
);

module.exports = router;
