
const codePromo = require("../models/CodePromo");

// method: POST
// url:api/codePromo
// access: privet

exports.addCodePromo = async (req, res) => {
  //check if data Exists
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }
  const newPromocode = {
    name: req.body.name,
    date_expiration: req.body.date_expiration,
    promotion: req.body.promotion,
    products: req.body.products
  };
  try {
    await codePromo.create(newPromocode)
    return res.json({message: "New Promo code inserted succefully"})
  } catch (error) {
    res.send(error)
  }
};



exports.deleteCodePromo = async (req, res) => {
  const id = req.params.id;
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
  }).then(data => {
    if(data == 1)
      return res.status(200).send("code updated")
    else
    return res.status(404).send("not found")
  }).catch(err => {
    return res.status(500).json({err})
  })
};

exports.showAllCodePromo = async (req, res) => {
  const allCodePromo = await codePromo.findAll({ raw: true, nest: true });
  res.status(200).send(allCodePromo);
};

exports.verifieCode = async (req, res) => {
  //body fih idproduit ou name dial codepromo
  //verifie si codepromo existe -> si date expiration -> si idproduit inclus dans codepromo.products
  const {Product_id,name} = req.body 
  //check if data Exists
  if (!name) {
    return res.status(404).send({message: `Cannot find Codepromo with name=${name}.`});
  }
  if (!Product_id) {
    return res.status(404).send({message: `Cannot find Product with id=${Product_id}.`});
  } 
  const FnCodePromo = await CodePromo.findOne({where: {name : name}, raw: true, nest: true })
  if(!FnCodePromo){
    return res.status(404).send(`Codepromo  ${name} Not Found `)
  }
  if(!FnCodePromo.products.includes(Product_id)){
   return res.status(404).send("code promo dose not Include this Product ")
  }
   const currentTime = new Date()
   
   if(FnCodePromo.date_expiration>currentTime){
    return res.status(403).send("code promo expired ")
   }

   return res.status(201).send("Code Promo Valide")
   
}