const memberForm = document.getElementById("member-form");
const errorMessage = document.getElementById("error-message");
const submitButton = document.getElementById("submit-btn");
const pageTitle = document.getElementById("page-title");
const pageDescription = document.getElementById("page-description");

const params = new URLSearchParams(window.location.search);
const memberId = params.get("id");

requireAuthentication();

if (memberId) {
  pageTitle.textContent = "Edit Member";
  pageDescription.textContent = "Update this member's information.";
  submitButton.textContent = "Update Member";
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

async function loadMember() {
  if (!memberId) {
    return;
  }

  try {
    const member = await apiRequest(`/members/${memberId}/`);

    document.getElementById("first-name").value = member.first_name || "";

    document.getElementById("last-name").value = member.last_name || "";

    document.getElementById("phone").value = member.phone || "";

    document.getElementById("email").value = member.email || "";

    document.getElementById("gender").value = member.gender || "";

    document.getElementById("date-of-birth").value = member.date_of_birth || "";

    document.getElementById("address").value = member.address || "";

    document.getElementById("emergency-name").value =
      member.emergency_contact_name || "";

    document.getElementById("emergency-phone").value =
      member.emergency_contact_phone || "";
  } catch (error) {
    showError(error.message);
  }
}

memberForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  errorMessage.style.display = "none";

  const formData = new FormData();

  formData.append("first_name", document.getElementById("first-name").value);

  formData.append("last_name", document.getElementById("last-name").value);

  formData.append("phone", document.getElementById("phone").value);

  formData.append("email", document.getElementById("email").value);

  formData.append("gender", document.getElementById("gender").value);

  formData.append(
    "date_of_birth",
    document.getElementById("date-of-birth").value,
  );

  formData.append("address", document.getElementById("address").value);

  formData.append(
    "emergency_contact_name",
    document.getElementById("emergency-name").value,
  );

  formData.append(
    "emergency_contact_phone",
    document.getElementById("emergency-phone").value,
  );

  const image = document.getElementById("profile-image").files[0];

  if (image) {
    formData.append("profile_image", image);
  }

  try {
    submitButton.disabled = true;
    submitButton.textContent = memberId ? "Updating..." : "Registering...";

    const token = getAccessToken();

    const url = memberId
      ? `${API_BASE_URL}/members/${memberId}/`
      : `${API_BASE_URL}/members/`;

    const method = memberId ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    window.location.href = "members.html";
  } catch (error) {
    showError(error.message);

    submitButton.disabled = false;
    submitButton.textContent = memberId ? "Update Member" : "Register Member";
  }
});

loadMember();
