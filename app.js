const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./src/middlewares/auth.middleware");

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// Rotas
const authRoutes = require("./src/routes/auth.routes");
const usuariosRoutes = require("./src/routes/usuarios.routes");
const categoriasRoutes = require("./src/routes/categorias.routes");
const ordensRoutes = require("./src/routes/ordens.routes");

// Publica
app.use("/api/auth", authRoutes);

// Privada
app.use("/api/usuarios", authMiddleware, usuariosRoutes);
app.use("/api/categorias", authMiddleware, categoriasRoutes);
app.use("/api/ordens", authMiddleware, ordensRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}`);
});
