const db = require("../config/db.config");

const findByEmail = async (email) => {
  const sql = "SELECT * FROM usuario WHERE email = ? AND ativo = 1";
  const [resultados] = await db.query(sql, [email]);
  return resultados[0];
};

module.exports = { findByEmail };
