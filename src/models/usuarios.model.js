const db = require("../config/db.config");
const bcrypt = require("bcrypt");

const saltRounds = 12;

const findById = async (id) => {
  const sql = "SELECT id, nome, email, admin, ativo FROM usuario WHERE id = ?";
  const [resultado] = await db.query(sql, [id]);
  return resultado[0];
};
const findAll = async () => {
  const sql = "SELECT id, nome, email, admin, ativo FROM usuario";
  const [resultados] = await db.query(sql);
  return resultados;
};
const insert = async (nome, email, senha, admin, ativo) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(senha, salt);
  const sql =
    "INSERT INTO usuario (nome, email, senha_hash, admin, ativo) VALUES (?, ?, ?, ?, ?)";
  return await db.query(sql, [nome, email, hash, admin, ativo]);
};
const update = async (id, dados) => {
  const camposPermitidos = ["nome", "email", "admin", "ativo"];
  const campos = camposPermitidos.filter((campo) => dados[campo] !== undefined);

  if (campos.length === 0) {
    return;
  }

  const sql = `UPDATE usuario SET ${campos
    .map((campo) => `${campo} = ?`)
    .join(", ")} WHERE id = ?`;
  const valores = campos.map((campo) => dados[campo]);

  return await db.query(sql, [...valores, id]);
};
const updateSenha = async (id, senha) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(senha, salt);
  const sql = "UPDATE usuario SET senha_hash = ? WHERE id = ?";
  return await db.query(sql, [hash, id]);
};
const remove = async (id) => {
  const sql = "DELETE FROM usuario WHERE id = ?";
  return await db.query(sql, [id]);
};

module.exports = { findById, findAll, insert, update, remove, updateSenha };
