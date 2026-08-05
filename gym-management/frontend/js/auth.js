const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  errorMessage.textContent = "";

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Invalid credentials");
    }

    localStorage.setItem("access_token", data.access);

    localStorage.setItem("refresh_token", data.refresh);

    window.location.href = "members.html";
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});
