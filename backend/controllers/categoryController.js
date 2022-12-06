const { Category } = require('../models/Category')
// const path = require('path')

const createCategory = (req, res) => {
    if(req.body.name !== '') {
        const imgPath = req.file.path.slice(-25)
        Category.create({
            category_name: req.body.name, 
            category_image: imgPath
        }).then(() => {
            res.send('New category inserted Succefully')
        }).catch((err) => {
            res.send(err.message)
        })
    } else {
        return res.status(400).json({
            erreur: 'fill all the fields'
        })
    }
}

const updateCategory = (req, res) => {
    if(req.body.name !== '') {
        Category.update({
            category_name: req.body.name, 
            category_image: req.file.path
        }, 
        { where: { category_id: req.category.category_id }  
        }).then(() => {
            res.send('Category updated Succefully')
        }).catch((err) => {
            res.send(err.message)
        })
    } else {
        return res.status(400).json({
            erreur: 'fill all the fields'
        })
    }
}

const removeCategory = (req, res) => {
    Category.destroy( { where: { category_id: req.category.category_id }  
    }).then(() => {
        res.send('Category Removed Succefully')
    }).catch((err) => {
        res.send(err.message)
    })
}

const getCategory = (req, res) => {
    res.send(req.category)
}

const getCategories = (req, res) => {
    Category.findAll()
        .then((data) => {
            res.json(data)
        }).catch((err) => {
            res.status(400).json({
                error: err.message
            })
        })
}

module.exports = {
    createCategory,
    updateCategory,
    removeCategory,
    getCategory,
    getCategories,
}