const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const success = loginUser(email, password);

  if (!success) {
    loginMessage.textContent = "Invalid email or password.";

    return;
  }

  window.location.href = "products.html";
});
