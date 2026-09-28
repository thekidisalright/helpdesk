const permissaoMiddleware = (req, res, next) => {
  if (req.usuarioLogado && req.usuarioLogado.admin) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Acesso negado: Requer privilégios de administrador" });
  }
};

module.exports = permissaoMiddleware;
