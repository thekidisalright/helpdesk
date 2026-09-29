const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categorias.controller");
const permissaoMiddleware = require("../middlewares/permissao.middleware");

router.get("/", categoriasController.getAllCategorias);

router.get("/:id", categoriasController.getCategoria);

router.post("/", permissaoMiddleware, categoriasController.createCategoria);

router.patch("/:id", permissaoMiddleware, categoriasController.updateCategoria);

router.delete(
  "/:id",
  permissaoMiddleware,
  categoriasController.deleteCategoria,
);

module.exports = router;
