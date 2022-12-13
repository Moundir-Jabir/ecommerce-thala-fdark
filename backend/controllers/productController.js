const Product = require("../models/Product");
const path = require('path');

exports.addProduct = (req, res) => {
  if (
    req.body.name !== "" &&
    req.body.description !== "" &&
    req.body.price !== "" &&
    req.body.stock !== "" &&
    req.body.qauntity_purchased !== "" &&
    req.body.promotion !== ""
  ) {
    const img = []
    req.files.forEach((filePath) => {
      const path1 = filePath.path.split(path.sep);
      const imgPath = "/" + path1[1] + "/" + path1[2];
      img.push(imgPath);
    });
    Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      qauntity_purchased: req.body.qauntity_purchased,
      promotion: req.body.promotion,
      promo_expiration: req.body.promo_expiration,
      images: img,
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


exports.getProduct =(req,res)=>{
  const id = req.params.id;
  Product.findByPk(id)
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


exports.updateProduct=(req,res)=>{
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
      const path = filePath.path.split("\\");
      const imgPath = "/" + path[1] + "/" + path[2];
      img.push(imgPath);
    });
    Product.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      qauntity_purchased: req.body.qauntity_purchased,
      promotion: req.body.promotion,
      promo_expiration: req.body.promo_expiration,
      images: img,
    },{ where: { product_id: id }
       }).then(() => {
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

}

