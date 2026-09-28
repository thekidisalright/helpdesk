const ordensModel = require("../models/ordens.model");

const getOrdem = async (req, res) => {
  try {
    const { id } = req.params;
    const ordem = await ordensModel.findById(id);

    if (!ordem) {
      return res.status(404).json({ erro: "Ordem de Serviço não encontrada" });
    }

    res.json(ordem);
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível carregar os dados da ordem de serviço.",
    });
  }
};
const getAllOrdens = async (req, res) => {
  try {
    const ordens = await ordensModel.findAll();
    res.json(ordens);
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível carregar a lista de ordens de serviço.",
    });
  }
};
const createOrdem = async (req, res) => {
  try {
    await ordensModel.insert(req.body);
    res.status(201).send();
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível criar a ordem de serviço.",
    });
  }
};
const updateOrdem = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await ordensModel.update(id, req.body);

    if (resultado === null) {
      return res.status(400).json({ erro: "Nenhum campo para atualizar" });
    }

    const ordem = await ordensModel.findById(id);
    if (!ordem) {
      return res.status(404).json({ erro: "Ordem de Serviço não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível atualizar a ordem de serviço.",
    });
  }
};
const deleteOrdem = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await ordensModel.remove(id);

    if (resultado[0].affectedRows === 0) {
      return res.status(404).json({ erro: "Ordem de Serviço não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível excluir a ordem de serviço.",
    });
  }
};

const fecharOrdem = async (req, res) => {
  try {
    const { id } = req.params;

    const ordem = await ordensModel.findById(id);
    if (!ordem) {
      return res.status(404).json({ erro: "Ordem de Serviço não encontrada" });
    }

    await ordensModel.fechar(id);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível fechar a ordem de serviço.",
    });
  }
};

module.exports = {
  getOrdem,
  getAllOrdens,
  createOrdem,
  updateOrdem,
  deleteOrdem,
  fecharOrdem,
};
