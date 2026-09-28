const categoriasModel = require("../models/categorias.model");

const getAllCategorias = async (req, res) => {
  try {
    const categorias = await categoriasModel.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível carregar a lista de categorias.",
    });
  }
};

const getCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await categoriasModel.findById(id);

    if (!categoria)
      return res.status(404).json({ erro: "Categoria não encontrada" });

    res.json(categoria);
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível carregar os dados da categoria.",
    });
  }
};

const createCategoria = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    await categoriasModel.insert(nome, descricao);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível criar a categoria.",
    });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await categoriasModel.update(id, req.body);

    if (resultado === null) {
      return res.status(400).json({ erro: "Nenhum campo para atualizar" });
    }

    const categoria = await categoriasModel.findById(id);
    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível atualizar a categoria.",
    });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await categoriasModel.remove(id);

    if (resultado[0].affectedRows === 0) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível excluir a categoria.",
    });
  }
};

module.exports = {
  getAllCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
