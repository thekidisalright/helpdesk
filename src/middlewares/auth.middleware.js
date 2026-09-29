const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ erro: "Usuário não autenticado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuarioLogado = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ erro: "Sessão inválida ou expirada" });
  }
};

module.exports = authMiddleware;
