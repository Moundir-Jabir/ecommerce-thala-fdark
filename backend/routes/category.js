const express = require('express')
const router = express.Router()
const { requireSignin, isAdmin } = require('../middlewares/auth')
const { createCategory, updateCategory, removeCategory, getCategories, getCategory } = require("../controllers/categoryController")
const { getCategoryById, uploadImage } = require('../middlewares/category')

router.post('/', uploadImage, createCategory)
router.put('/:category_id', uploadImage, updateCategory)
router.get('/', getCategories)
router.get('/:category_id', getCategory)
router.delete('/:category_id', removeCategory)

router.param('category_id', getCategoryById)

module.exports = router