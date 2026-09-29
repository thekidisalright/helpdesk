const permissaoMiddleware = (req, res, next) => {
  if (!req.usuarioLogado) {
    return res.status(401).json({
      erro: "Usuário não autenticado",
    });
  }

  if (!req.usuarioLogado.admin) {
    return res.status(403).json({
      erro: "Acesso negado: requer privilégios de administrador",
    });
  }

  return next();
};

module.exports = permissaoMiddleware;
