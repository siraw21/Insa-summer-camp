requireAuthentication();

const loading = document.getElementById("loading");

const content = document.getElementById("member-content");

const errorMessage = document.getElementById("error-message");

const logoutButton = document.getElementById("logout-btn");

const editButton = document.getElementById("edit-member-btn");

const memberId = new URLSearchParams(window.location.search).get("id");

if (!memberId) {
  showError("Member ID is missing.");
} else {
  loadMember();
}

async function loadMember() {
  try {
    const member = await apiRequest(`/members/${memberId}/`);

    renderMember(member);
  } catch (error) {
    showError(error.message);
  } finally {
    loading.style.display = "none";
  }
}

function renderMember(member) {
  const fullName = `${member.first_name} ${member.last_name}`;

  const initials =
    `${member.first_name?.[0] || ""}${member.last_name?.[0] || ""}`.toUpperCase();

  /*
   * Basic profile information
   */

  document.getElementById("member-name").textContent = fullName;

  document.getElementById("member-number").textContent =
    member.member_number || "No member number";

  document.getElementById("first-name").textContent = member.first_name || "—";

  document.getElementById("last-name").textContent = member.last_name || "—";

  document.getElementById("phone").textContent = member.phone || "—";

  document.getElementById("email").textContent = member.email || "—";

  document.getElementById("address").textContent = member.address || "—";

  document.getElementById("date-of-birth").textContent =
    member.date_of_birth || "—";

  document.getElementById("gender").textContent = member.gender || "—";

  /*
   * Status
   */

  const statusElement = document.getElementById("member-status");

  const status = member.status || "Unknown";

  statusElement.textContent = status;

  statusElement.className = "badge";

  if (status.toLowerCase() === "active") {
    statusElement.classList.add("badge-active");
  } else {
    statusElement.classList.add("badge-expired");
  }

  /*
   * Profile image
   */

  const avatar = document.getElementById("member-avatar");

  if (member.profile_image) {
    avatar.innerHTML = `
      <img
        src="${member.profile_image}"
        alt="${fullName}"
      >
    `;
  } else {
    avatar.textContent = initials;
  }

  /*
   * Edit link
   */

  editButton.href = `member-form.html?id=${member.id}`;

  content.style.display = "block";
}

function showError(message) {
  errorMessage.textContent = message;

  errorMessage.style.display = "block";
}

logoutButton.addEventListener("click", logout);
