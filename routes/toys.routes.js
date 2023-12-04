const express = require("express");
const { getToys,getToyById,searchToyByCat,searchToyByNameOrInfo,addNewToy,deleteToy,editToy} = require("../controllers/toys.controllers");
const { auth, authNoPermistion } = require("../middlewares/auth");
const router = express.Router();


router.get("/", getToys);
router.get("/search", searchToyByNameOrInfo);
router.get("/category/:catName", searchToyByCat);
router.post("/", auth(), addNewToy);
router.put("/:editId",auth(),editToy);
router.delete("/:delId",auth(),deleteToy);
// router.get("/prices", getToysByPrice);
router.get("/single/:id", getToyById);









module.exports = router;

