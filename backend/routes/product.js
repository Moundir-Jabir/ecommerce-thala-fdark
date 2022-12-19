const express = require("express");
const router = express.Router();
// const { requireSignin, isAdmin } = require('../middlewares/auth')
const {
  addProduct,
  getProduct,
  updateProduct,
  showAllProducts,
} = require("../controllers/productController");
const { uploadImage } = require("../middlewares/category");

router.post("/", uploadImage, addProduct);
router.put("/:id", uploadImage, updateProduct);
router.get("/", showAllProducts);
router.get("/:id", getProduct);

module.exports = router;
