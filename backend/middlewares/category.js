const { Category } = require('../models/Category')
const multer = require('multer')
const path = require('path')

exports.getCategoryById = (req, res, next, category_id) => {
    Category.findByPk(category_id)
        .then(data => {
            req.category = data
            next()
        })
        .catch(err => {
            return res.status(404).json({
                error: 'Category not found'
            })
        })
}

const storeImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

exports.uploadImage = multer({
    storage: storeImage,
    limits: { fileSize: '5000000' },
    fileFilter: (req, file, cb) => {
        const exts = /jpeg|png|jpg|gif/
        const fileType = exts.test(file.mimetype)
        const imgExt = exts.test(path.extname(file.originalname))
        if(fileType && imgExt) return cb(null, true)
        cb(JSON.stringify('file uploded is invalid'))
    }
}).array('images', 4)