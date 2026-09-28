const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection()
  .then((conn) => {
    console.log(
      "Conexão com o banco de dados estabelecida com sucesso via Pool!",
    );
    conn.release();
  })
  .catch((err) => {
    console.error("Erro crítico ao testar conexão com o banco: ", err);
  });

module.exports = db;
