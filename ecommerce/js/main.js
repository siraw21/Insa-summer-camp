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
