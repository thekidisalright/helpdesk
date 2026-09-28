const db = require("../config/db.config");

const camposAtualizaveis = ["nome", "descricao"];

const findById = async (id) => {
  const sql = "SELECT id, nome, descricao FROM categoria WHERE id = ?";
  const [resultado] = await db.query(sql, [id]);
  return resultado[0];
};

const findAll = async () => {
  const sql = "SELECT id, nome, descricao FROM categoria";
  const [resultados] = await db.query(sql);
  return resultados;
};

const insert = async (nome, descricao) => {
  const sql = "INSERT INTO categoria (nome, descricao) VALUES (?, ?)";
  return await db.query(sql, [nome, descricao]);
};

const update = async (id, dados) => {
  const campos = camposAtualizaveis.filter(
    (campo) => dados[campo] !== undefined,
  );

  if (campos.length === 0) return null;

  const valores = campos.map((campo) => dados[campo]);
  const definicoes = campos.map((campo) => `${campo} = ?`).join(", ");
  const sql = `UPDATE categoria SET ${definicoes} WHERE id = ?`;
  valores.push(id);

  return await db.query(sql, valores);
};

const remove = async (id) => {
  const sql = "DELETE FROM categoria WHERE id = ?";
  return await db.query(sql, [id]);
};

module.exports = { findById, findAll, insert, update, remove };
