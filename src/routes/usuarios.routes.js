const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");
const { validarDadosUsuario } = require("../middlewares/validacao.middleware");

router.get("/", usuariosController.getAllUsuarios);

router.get("/:id", usuariosController.getUsuario);

router.post("/", validarDadosUsuario, usuariosController.createUsuario);

router.patch("/:id", validarDadosUsuario, usuariosController.updateUsuario);

router.patch(
  "/:id/novasenha",
  validarDadosUsuario,
  usuariosController.updateSenhaUsuario,
);

router.delete("/:id", usuariosController.deleteUsuario);

module.exports = router;
