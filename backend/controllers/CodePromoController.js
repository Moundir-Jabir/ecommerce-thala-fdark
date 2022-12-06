const codePromo = require("../models/CodePromo");

// method: POST
// url:api/codePromo
// access: privet

exports.addCodePromo = async (req, res) => {
  //check if data Exists
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const newPromocode = {
    name: req.body.name,
    date_expiration: req.body.date_expiration,
    products: [req.body.products]
  };
  console.log(newPromocode);
  try {
    await codePromo.create(newPromocode)
    
  } catch (error) {
    res.send(error)   
  }
};



exports.deleteCodePromo = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  codePromo
    .destroy({
      where: { code_id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send("The PromoCode Got Deleted");
      } else {
        res.send({
          message: `Cannot delete the Code promo !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Something Went Wrong",
      });
    });
};

// Find a single codepromo with an id
exports.getCodePromo = (req, res) => {
  const id = req.params.id;
  codePromo
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Codepromo with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving code Promo with id=" + id,
      });
    });
};

exports.updateCodePromo = async (req, res) => {
  const id = req.params.id;
  codePromo.update(req.body, {
    where: { code_id: id },
  });
};

exports.showAllCodePromo = async (req, res) => {
  const allCodePromo = await codePromo.findAll({ raw: true, nest: true });
  res.status(200).send(allCodePromo);
};
