const btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", async () => {
  const response = await fetch("/api/auth/logout", { method: "POST" });
  if (response.ok) {
    window.location.href = "/";
  }
});
