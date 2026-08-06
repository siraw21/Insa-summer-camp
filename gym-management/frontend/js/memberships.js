requireAuthentication();

const tableBody = document.getElementById("memberships-table-body");
const loading = document.getElementById("loading");
const emptyState = document.getElementById("empty-state");
const errorMessage = document.getElementById("error-message");
const membershipCount = document.getElementById("membership-count");
const logoutButton = document.getElementById("logout-btn");

async function loadMemberships() {
  try {
    loading.style.display = "block";
    emptyState.style.display = "none";
    errorMessage.style.display = "none";

    const memberships = await apiRequest("/memberships/");

    renderMemberships(memberships);
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  } finally {
    loading.style.display = "none";
  }
}

function renderMemberships(memberships) {
  tableBody.innerHTML = "";

  membershipCount.textContent = `${memberships.length} membership${memberships.length === 1 ? "" : "s"}`;

  if (memberships.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  memberships.forEach((membership) => {
    const row = document.createElement("tr");

    const memberName = membership.member_name || "Unknown member";
    const memberNumber = membership.member_number || "—";

    const planName = membership.plan_name || "—";
    const planPrice = membership.plan_price || "0.00";

    const startDate = membership.start_date || "—";
    const endDate = membership.end_date || "—";

    const status = membership.status || "UNKNOWN";

    let statusClass = "badge-pending";

    if (status === "ACTIVE") {
      statusClass = "badge-active";
    } else if (status === "EXPIRED") {
      statusClass = "badge-expired";
    }

    const initials = memberName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    row.innerHTML = `
            <td>
                <div class="member-cell">

                    <div class="member-avatar">
                        ${initials}
                    </div>

                    <div>
                        <div class="member-name">
                            ${memberName}
                        </div>

                        <div class="member-number">
                            ${memberNumber}
                        </div>
                    </div>

                </div>
            </td>

            <td>
                <div class="member-name">
                    ${planName}
                </div>

                <div class="member-number">
                    ${planPrice} ETB
                </div>
            </td>

            <td>
                ${startDate}
            </td>

            <td>
                ${endDate}
            </td>

            <td>
                <span class="badge ${statusClass}">
                    ${status}
                </span>
            </td>

            <td>
                <div class="action-group">

                    <button
                        class="btn btn-secondary btn-sm edit-btn"
                        data-id="${membership.id}"
                    >
                        Edit
                    </button>

                    <button
                        class="btn btn-danger btn-sm delete-btn"
                        data-id="${membership.id}"
                    >
                        Delete
                    </button>

                </div>
            </td>
        `;

    tableBody.appendChild(row);
  });
}

tableBody.addEventListener("click", async (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const membershipId = button.dataset.id;

  if (button.classList.contains("edit-btn")) {
    window.location.href = `membership-form.html?id=${membershipId}`;

    return;
  }

  if (button.classList.contains("delete-btn")) {
    await deleteMembership(membershipId);
  }
});

async function deleteMembership(id) {
  const confirmed = confirm("Are you sure you want to delete this membership?");

  if (!confirmed) {
    return;
  }

  try {
    await apiRequest(`/memberships/${id}/`, {
      method: "DELETE",
    });

    await loadMemberships();
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  }
}

logoutButton.addEventListener("click", logout);

loadMemberships();
