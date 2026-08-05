// const tableBody = document.getElementById("members-table-body");

// const loading = document.getElementById("loading");

// const errorMessage = document.getElementById("error-message");

// const logoutButton = document.getElementById("logout-btn");

// async function loadMembers() {
//   try {
//     const members = await apiRequest("/members/");

//     renderMembers(members);
//   } catch (error) {
//     errorMessage.textContent = error.message;
//   } finally {
//     loading.style.display = "none";
//   }
// }

// function renderMembers(members) {
//   tableBody.innerHTML = "";

//   members.forEach((member) => {
//     const row = document.createElement("tr");

//     row.innerHTML = `
//             <td>${member.member_number}</td>

//             <td>
//                 ${member.first_name}
//                 ${member.last_name}
//             </td>

//             <td>${member.phone}</td>

//             <td>${member.status}</td>

//             <td>
//                 <button
//                     class="view-btn"
//                     data-id="${member.id}"
//                 >
//                     View
//                 </button>

//                 <button
//                     class="edit-btn"
//                     data-id="${member.id}"
//                 >
//                     Edit
//                 </button>

//                 <button
//                     class="delete-btn"
//                     data-id="${member.id}"
//                 >
//                     Delete
//                 </button>
//             </td>
//         `;

//     tableBody.appendChild(row);
//   });
// }

// tableBody.addEventListener("click", async (event) => {
//   const button = event.target.closest("button");

//   if (!button) {
//     return;
//   }

//   const memberId = button.dataset.id;

//   if (button.classList.contains("view-btn")) {
//     window.location.href = `member-detail.html?id=${memberId}`;

//     return;
//   }

//   if (button.classList.contains("edit-btn")) {
//     window.location.href = `member-form.html?id=${memberId}`;

//     return;
//   }

//   if (button.classList.contains("delete-btn")) {
//     await deleteMember(memberId);
//   }
// });

// function viewMember(id) {
//   window.location.href = `member-detail.html?id=${id}`;
// }

// function editMember(id) {
//   window.location.href = `member-form.html?id=${id}`;
// }

// async function deleteMember(id) {
//   const confirmed = confirm("Are you sure you want to delete this member?");

//   if (!confirmed) {
//     return;
//   }

//   try {
//     await apiRequest(`/members/${id}/`, {
//       method: "DELETE",
//     });

//     await loadMembers();
//   } catch (error) {
//     errorMessage.textContent = error.message;
//   }
// }

// logoutButton.addEventListener("click", () => {
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("refresh_token");

//   window.location.href = "login.html";
// });

// loadMembers();
// document.getElementById("add-member-btn").addEventListener("click", () => {
//   window.location.href = "member-form.html";
// });

const tableBody = document.getElementById("members-table-body");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const logoutButton = document.getElementById("logout-btn");

async function loadMembers() {
  try {
    const members = await apiRequest("/members/");

    renderMembers(members);
  } catch (error) {
    errorMessage.textContent = error.message;
  } finally {
    loading.style.display = "none";
  }
}

function renderMembers(members) {
  tableBody.innerHTML = "";

  members.forEach((member) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${member.member_number}</td>

            <td>
                ${member.first_name}
                ${member.last_name}
            </td>

            <td>${member.phone}</td>

            <td>${member.status}</td>

            <td>
                <button
                    class="view-btn"
                    data-id="${member.id}"
                >
                    View
                </button>

                <button
                    class="edit-btn"
                    data-id="${member.id}"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    data-id="${member.id}"
                >
                    Delete
                </button>
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
  }
}

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  window.location.href = "login.html";
});

const addMemberButton = document.getElementById("add-member-btn");

addMemberButton.addEventListener("click", () => {
  window.location.href = "member-form.html";
});

loadMembers();
