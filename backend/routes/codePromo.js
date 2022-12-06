const express = require('express')
const router = express.Router()
// const { requireSignin, isAdmin } = require('../middlewares/auth')


const { addCodePromo ,deleteCodePromo,getCodePromo,updateCodePromo,showAllCodePromo} = require("../controllers/CodePromoController")

// /api/codePromo/add
router.post("/", addCodePromo);

// api/codePromo/delet
router.delete("/:id", deleteCodePromo);



//api/codepromo/getCodePromo
router.get("/:id", getCodePromo)

// api/codePromo/update
router.put("/:id", updateCodePromo)

// api/codePromo/showCodePromo
router.get("/", showAllCodePromo)





module.exports= router
