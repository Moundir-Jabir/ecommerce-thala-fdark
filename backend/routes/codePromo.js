const express = require('express')
const router = express.Router()
const { requireSignin, isAdmin } = require('../middlewares/auth')
const { addCodePromo ,deleteCodePromo,getCodePromo,updateCodePromo,showAllCodePromo, verifieCode} = require("../controllers/CodePromoController")

router.post("/",[requireSignin, isAdmin], addCodePromo);
router.post("/verifie", verifieCode);
router.delete("/:id", [requireSignin, isAdmin], deleteCodePromo);
router.get("/:id",[requireSignin, isAdmin], getCodePromo)
router.put("/:id",[requireSignin, isAdmin], updateCodePromo)
router.get("/",[requireSignin, isAdmin], showAllCodePromo)

module.exports = router