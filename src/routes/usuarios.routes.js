const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");
const { validarDadosUsuario } = require("../middlewares/validacao.middleware");

router.get("/", usuariosController.readAll);

router.get("/:id", usuariosController.read);

router.post("/", validarDadosUsuario, usuariosController.create);

router.patch("/:id", validarDadosUsuario, usuariosController.update);

router.patch(
  "/:id/novasenha",
  validarDadosUsuario,
  usuariosController.updateSenhaUsuario,
);

router.delete("/:id", usuariosController.remove);

module.exports = router;
