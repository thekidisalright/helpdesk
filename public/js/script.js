export const appendAlert = (message, type) => {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-dimensional ${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);

  setTimeout(() => {
    const alertNode = wrapper.querySelector(".alert");
    if (alertNode) {
      const bsAlert = new window.bootstrap.Alert(alertNode);
      bsAlert.close();
    }
  }, 4000);
};

export const verificarPermissao = async () => {
  const response = await fetch("/api/auth/me");

  if (!response.ok) {
    window.location.href = "/login.html";
    return;
  }

  const usuario = await response.json();

  if (usuario.admin) {
    window.location.href = "/admin.html";
  } else {
    window.location.href = "/usuario.html";
  }
};
