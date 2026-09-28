import { appendAlert } from "./script.js";

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  await login(email, senha);
});

const login = async (email, senha) => {
  try {
    const dados = {
      email: email,
      senha: senha,
    };
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro);
    }

    console.log(data);
    return appendAlert("oi", "success");
  } catch (error) {
    console.error("Falha na requisição:", error.message);
    appendAlert(error.message, "danger");
  }
};
