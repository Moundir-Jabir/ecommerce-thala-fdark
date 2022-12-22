const Category = require("../models/Category");
const Product = require("../models/Product");
const path = require("path");
const { Op } = require("sequelize");

exports.addProduct = async (req, res) => {
  const Category_id = req.body.Category_id;
  const findCategory = await Category.findByPk(Category_id);
  if (!findCategory) {
    res.status(404).send("Category dose Not exist");
  }
  if (
    req.body.name !== "" &&
    req.body.description !== "" &&
    req.body.price !== "" &&
    req.body.stock !== "" &&
    req.body.qauntity_purchased !== "" &&
    req.body.promotion !== ""
  ) {
    const img = [];
    req.files.forEach((filePath) => {
      const pathOne = filePath.path.split(path.sep);
      const imgPath = "/" + pathOne[1] + "/" + pathOne[2];
      img.push(imgPath);
    });
    console.log(req)
    Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      promotion: req.body.promotion,
      promo_expiration: req.body.promo_expiration,
      images: img,
      categoryCategoryId: findCategory?.category_id,
    })
    .then(() => {
      res.send("New Product inserted Succefully");
    })
    .catch((err) => {
      res.json({ error: err });
    });
  } else {
    return res.status(400).json({
      erreur: "fill all the fields",
    });
  }
};

exports.getProduct = (req, res) => {
  const id = req.params.id;
  Product.findByPk(id, { include: Category })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id,
      });
    });
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  if (
    req.body.name !== "" &&
    req.body.description !== "" &&
    req.body.price !== "" &&
    req.body.stock !== "" &&
    req.body.qauntity_purchased !== "" &&
    req.body.promotion !== ""
  ) {
    const img = [];
    req.files.forEach((filePath) => {
      const pathOne = filePath.path.split(path.sep);
      const imgPath = "/" + pathOne[1] + "/" + pathOne[2];
      img.push(imgPath);
    });
    Product.update(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        qauntity_purchased: req.body.qauntity_purchased,
        promotion: req.body.promotion,
        promo_expiration: req.body.promo_expiration,
        images: img,
      },
      { where: { product_id: id } }
    )
      .then(() => {
        res.send(" Product UpDatede Succefully");
      })
      .catch((err) => {
        res.json({ error: err });
      });
  } else {
    return res.status(400).json({
      erreur: "fill all the fields",
    });
  }
};

exports.showAllProducts = async (req, res) => {
  const limit = req.query.limit || 4;
  const offset = req.query.offset || 0;
  const orderby = req.query.orderby || "createdAt";
  const value = req.query.value || "DESC";
  const Category_id = req.body.Category_id || []
  const searchName = req.body.nameFilter;
  const price = req.body.price;
  const priceCondition = price ? { price: { [Op.between]: [price[0], price[1]] } } : null
  const categoryCondition = (Category_id.length != 0) ? { categoryCategoryId: Category_id } : null;
  const filterByName = searchName ? { name: { [Op.like]: `%${searchName}%` } } : null;
  try {
    const allProduct = await Product.findAll({
      limit: limit,
      offset: offset,
      order: [[orderby, value]],
      where: { [Op.and]: [categoryCondition, filterByName, priceCondition] }

    });
    return res.status(200).json(allProduct);

  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.dealOfTheWeak = (req, res) => {
  Product.findOne({
    order: [["promotion", "DESC"]],
    where: {
      promo_expiration: {
        [Op.gt]: new Date()
      }
    }
  }).then(data => {
    return res.send(data)
  }).catch(err => {
    return res.status(404).send(err)
  })
}