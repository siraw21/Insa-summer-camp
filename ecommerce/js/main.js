const footerYear = document.getElementById("foot-year");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

// new
const logoutLink = document.getElementById("logout-link");

if (logoutLink) {
  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();

    logoutUser();

    window.location.href = "index.html";
  });
}

//

const loginNav = document.getElementById("login-nav");

const registerNav = document.getElementById("register-nav");

const logoutNav = document.getElementById("logout-nav");

if (isLoggedIn()) {
  if (loginNav) {
    loginNav.style.display = "none";
  }

  if (registerNav) {
    registerNav.style.display = "none";
  }
} else {
  if (logoutNav) {
    logoutNav.style.display = "none";
  }
}
