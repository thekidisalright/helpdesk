const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) res.status(401).json({ erro: "Token não fornecido" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) res.status(403).json({ erro: "Token inválido" });

    req.usuarioLogado = decoded;
    next();
  });
};

module.exports = authMiddleware;
