const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categorias.controller");

router.get("/", categoriasController.getAllCategorias);

router.get("/:id", categoriasController.getCategoria);

router.post("/", categoriasController.createCategoria);

router.patch("/:id", categoriasController.updateCategoria);

router.delete("/:id", categoriasController.deleteCategoria);

module.exports = router;
