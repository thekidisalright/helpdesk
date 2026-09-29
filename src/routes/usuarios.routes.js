const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");
const { validarDadosUsuario } = require("../middlewares/validacao.middleware");
const permissaoMiddleware = require("../middlewares/permissao.middleware");

router.get("/", permissaoMiddleware, usuariosController.getAllUsuarios);

router.get("/:id", permissaoMiddleware, usuariosController.getUsuario);

router.post(
  "/",
  permissaoMiddleware,
  validarDadosUsuario,
  usuariosController.createUsuario,
);

router.patch(
  "/:id",
  permissaoMiddleware,
  validarDadosUsuario,
  usuariosController.updateUsuario,
);

router.patch(
  "/:id/novasenha",
  permissaoMiddleware,
  validarDadosUsuario,
  usuariosController.updateSenhaUsuario,
);

router.delete("/:id", permissaoMiddleware, usuariosController.deleteUsuario);

module.exports = router;
