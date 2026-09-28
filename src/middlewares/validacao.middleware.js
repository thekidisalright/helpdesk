const validarSenha = (senha) => {
  const erros = [];
  if (!senha || senha.length < 8)
    erros.push("A senha deve ter pelo menos 8 caracteres");
  if (!/[A-Z]/.test(senha))
    erros.push("A senha deve conter uma letra maiúscula");
  if (!/[a-z]/.test(senha))
    erros.push("A senha deve conter uma letra minúscula");
  if (!/[0-9]/.test(senha)) erros.push("A senha deve conter um número");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha))
    erros.push("A senha deve conter um caractere especial");

  return erros;
};

const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validarDadosUsuario = (req, res, next) => {
  const { nome, email, senha } = req.body;
  const erros = [];

  if (!nome || typeof nome !== "string") {
    erros.push("O nome é obrigatório");
  } else if (nome.trim().length < 2) {
    erros.push("O nome deve ter pelo menos 2 caracteres");
  }

  if (!email) {
    erros.push("O e-mail é obrigatório.");
  } else if (!validarEmail(email)) {
    erros.push("O formato do e-mail é inválido");
  }

  const errosSenha = validarSenha(senha);
  if (errosSenha.length > 0) {
    erros.push(...errosSenha);
  }

  if (erros.length > 0) {
    return res.status(400).json({
      erro: erros[0],
    });
  }

  next();
};

module.exports = { validarDadosUsuario };
