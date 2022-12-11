const express = require('express')
const router = express.Router()
// const { requireSignin, isAdmin } = require('../middlewares/auth')
const {addProduct,getProduct,updateProduct} = require("../controllers/productController")
const { uploadImage } = require('../middlewares/category')

router.post("/",uploadImage, addProduct);
router.get("/:id",uploadImage,getProduct);
router.put("/:id",uploadImage,updateProduct)


// router.post("/verifie", verifieCode);
// router.delete("/:id", deleteCodePromo);
// router.put("/:id", updateCodePromo)
// router.get("/", showAllCodePromo)

module.exports = router