const db = require("../config/db.config");

const camposAtualizaveis = [
  "titulo",
  "descricao",
  "status",
  "prioridade",
  "categoria_id",
  "solicitante_id",
  "responsavel_id",
];

const camposOrdem =
  "id, titulo, descricao, status, prioridade, categoria_id, solicitante_id, responsavel_id, data_abertura, data_atualizacao, data_fechamento";

const findById = async (id) => {
  const sql = `SELECT ${camposOrdem} FROM ordem_servico WHERE id = ?`;
  const [resultado] = await db.query(sql, [id]);
  return resultado[0];
};

const findAll = async () => {
  const sql = `SELECT ${camposOrdem} FROM ordem_servico`;
  const [resultados] = await db.query(sql);
  return resultados;
};

const insert = async (dados) => {
  const {
    titulo,
    descricao,
    status,
    prioridade,
    categoria_id,
    solicitante_id,
    responsavel_id,
  } = dados;
  const sql =
    "INSERT INTO ordem_servico (titulo, descricao, status, prioridade, categoria_id, solicitante_id, responsavel_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  return await db.query(sql, [
    titulo,
    descricao,
    status,
    prioridade,
    categoria_id,
    solicitante_id,
    responsavel_id,
  ]);
};

const update = async (id, dados) => {
  const campos = camposAtualizaveis.filter(
    (campo) => dados[campo] !== undefined,
  );

  if (campos.length === 0) return null;

  const valores = campos.map((campo) => dados[campo]);
  const definicoes = campos.map((campo) => `${campo} = ?`).join(", ");
  const sql = `UPDATE ordem_servico SET ${definicoes} WHERE id = ?`;
  valores.push(id);

  return await db.query(sql, valores);
};

const fechar = async (id) => {
  const sql =
    "UPDATE ordem_servico SET status = 'fechado', data_fechamento = CURRENT_TIMESTAMP WHERE id = ?";
  return await db.query(sql, [dataFechamento ?? null, id]);
};

const remove = async (id) => {
  const sql = "DELETE FROM ordem_servico WHERE id = ?";
  return await db.query(sql, [id]);
};

module.exports = { findById, findAll, insert, update, fechar, remove };
