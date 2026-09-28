const express = require("express");
const router = express.Router();
const ordensController = require("../controllers/ordens.controller");

router.get("/", ordensController.getAllOrdens);

router.get("/:id", ordensController.getOrdem);

router.post("/", ordensController.createOrdem);

router.patch("/:id", ordensController.updateOrdem);

router.patch("/:id/fechar", ordensController.fecharOrdem);

router.delete("/:id", ordensController.deleteOrdem);

module.exports = router;
