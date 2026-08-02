const registerForm = document.getElementById("register-form");

const registerMessage = document.getElementById("register-message");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    registerMessage.textContent = "Passwords do not match.";

    return;
  }

  const success = registerUser(name, email, password);

  if (!success) {
    registerMessage.textContent = "An account with this email already exists.";

    return;
  }

  window.location.href = "login.html";
});
