requireAuthentication();

const tableBody = document.getElementById("members-table-body");

const loading = document.getElementById("loading");

const emptyState = document.getElementById("empty-state");

const errorMessage = document.getElementById("error-message");

const searchInput = document.getElementById("search-input");

const memberCount = document.getElementById("member-count");

const logoutButton = document.getElementById("logout-btn");

let allMembers = [];

async function loadMembers() {
  try {
    loading.style.display = "block";
    emptyState.style.display = "none";
    errorMessage.style.display = "none";

    allMembers = await apiRequest("/members/");

    renderMembers(allMembers);
  } catch (error) {
    errorMessage.textContent = error.message;

    errorMessage.style.display = "block";
  } finally {
    loading.style.display = "none";
  }
}

function renderMembers(members) {
  tableBody.innerHTML = "";

  memberCount.textContent = `${members.length} member${members.length === 1 ? "" : "s"}`;

  if (members.length === 0) {
    emptyState.style.display = "block";

    return;
  }

  emptyState.style.display = "none";

  members.forEach((member) => {
    const row = document.createElement("tr");

    const fullName = `${member.first_name} ${member.last_name}`;

    const initials =
      `${member.first_name?.[0] || ""}${member.last_name?.[0] || ""}`.toUpperCase();

    const status = member.status || "Unknown";

    const statusClass =
      status.toLowerCase() === "active" ? "badge-active" : "badge-expired";

    const image = member.profile_image
      ? `
          <img
            src="${member.profile_image}"
            alt="${fullName}"
          >
        `
      : initials;

    row.innerHTML = `

      <td>

        <div class="member-cell">

          <div class="member-avatar">
            ${image}
          </div>

          <div>

            <div class="member-name">
              ${fullName}
            </div>

            <div class="member-number">
              ${member.member_number}
            </div>

          </div>

        </div>

      </td>


      <td>
        ${member.phone || "—"}
      </td>


      <td>

        <span class="badge ${statusClass}">
          ${status}
        </span>

      </td>


      <td>

        <div class="action-group">

          <button
            class="btn btn-secondary btn-sm view-btn"
            data-id="${member.id}"
          >
            View
          </button>


          <button
            class="btn btn-secondary btn-sm edit-btn"
            data-id="${member.id}"
          >
            Edit
          </button>


          <button
            class="btn btn-danger btn-sm delete-btn"
            data-id="${member.id}"
          >
            Delete
          </button>

        </div>

      </td>

    `;

    tableBody.appendChild(row);
  });
}

function searchMembers() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    renderMembers(allMembers);

    return;
  }

  const filtered = allMembers.filter((member) => {
    const fullName = `${member.first_name} ${member.last_name}`.toLowerCase();

    return (
      fullName.includes(query) ||
      member.member_number?.toLowerCase().includes(query) ||
      member.phone?.toLowerCase().includes(query)
    );
  });

  renderMembers(filtered);
}

tableBody.addEventListener("click", async (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const memberId = button.dataset.id;

  if (button.classList.contains("view-btn")) {
    window.location.href = `member-detail.html?id=${memberId}`;

    return;
  }

  if (button.classList.contains("edit-btn")) {
    window.location.href = `member-form.html?id=${memberId}`;

    return;
  }

  if (button.classList.contains("delete-btn")) {
    await deleteMember(memberId);
  }
});

async function deleteMember(id) {
  const confirmed = confirm("Are you sure you want to delete this member?");

  if (!confirmed) {
    return;
  }

  try {
    await apiRequest(`/members/${id}/`, {
      method: "DELETE",
    });

    await loadMembers();
  } catch (error) {
    errorMessage.textContent = error.message;

    errorMessage.style.display = "block";
  }
}

searchInput.addEventListener("input", searchMembers);

logoutButton.addEventListener("click", logout);

loadMembers();
