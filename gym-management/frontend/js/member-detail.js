const memberDetails = document.getElementById("member-details");

const errorMessage = document.getElementById("error-message");

const params = new URLSearchParams(window.location.search);

const memberId = params.get("id");

async function loadMember() {
  try {
    const member = await apiRequest(`/members/${memberId}/`);

    renderMember(member);
  } catch (error) {
    errorMessage.textContent = error.message;
  }
}

function renderMember(member) {
  memberDetails.innerHTML = `

        <h2>
            ${member.first_name}
            ${member.last_name}
        </h2>

        <p>
            <strong>Member Number:</strong>
            ${member.member_number}
        </p>

        <p>
            <strong>Phone:</strong>
            ${member.phone}
        </p>

        <p>
            <strong>Email:</strong>
            ${member.email || "N/A"}
        </p>

        <p>
            <strong>Gender:</strong>
            ${member.gender || "N/A"}
        </p>

        <p>
            <strong>Address:</strong>
            ${member.address || "N/A"}
        </p>

        <p>
            <strong>Status:</strong>
            ${member.status}
        </p>

    `;
}

loadMember();
