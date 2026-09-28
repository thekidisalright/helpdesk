const usuariosModel = require("../models/usuarios.model");

const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await usuariosModel.findById(id);

    if (!usuario)
      return res.status(401).json({ erro: "Usuário não encontrado" });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível carregar os dados do usuário. Por favor, tente novamente mais tarde.",
    });
  }
};
const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosModel.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível carregar a lista de usuários. Por favor, tente novamente mais tarde.",
    });
  }
};
const createUsuario = async (req, res) => {
  try {
    const { nome, email, senha, admin, ativo } = req.body;

    await usuariosModel.insert(nome, email, senha, admin, ativo);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível criar o usuário. Por favor, tente novamente mais tarde.",
    });
  }
};
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await usuariosModel.update(id, req.body);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível atualizar o usuário. Por favor, tente novamente mais tarde.",
    });
  }
};

const updateSenhaUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { senha } = req.body;

    await usuariosModel.updateSenha(id, senha);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível atualizar a senha. Por favor, tente novamente mais tarde.",
    });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await usuariosModel.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível excluir o usuário. Por favor, tente novamente mais tarde.",
    });
  }
};

module.exports = {
  getUsuario,
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  updateSenhaUsuario,
};
