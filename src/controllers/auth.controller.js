const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/auth.model");

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await authModel.findByEmail(email);

    if (!usuario)
      return res.status(401).json({ erro: "Email ou senha incorretos" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ erro: "Email ou senha incorretos" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        admin: usuario.admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ token: token, mensagem: "Login bem-sucedido" });
  } catch (error) {
    res.status(500).json({
      erro: "Não foi possível fazer login. Por favor, tente novamente mais tarde",
    });
  }
};

module.exports = { login };
