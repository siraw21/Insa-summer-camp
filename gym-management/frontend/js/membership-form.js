requireAuthentication();

const form = document.getElementById("membership-form");

const memberSelect = document.getElementById("member");

const planSelect = document.getElementById("plan");

const startDateInput = document.getElementById("start-date");

const submitButton = document.getElementById("submit-btn");

const errorMessage = document.getElementById("error-message");

const successMessage = document.getElementById("success-message");

const logoutButton = document.getElementById("logout-btn");

const planPreview = document.getElementById("plan-preview");

const previewPlanName = document.getElementById("preview-plan-name");

const previewDescription = document.getElementById("preview-description");

const previewPrice = document.getElementById("preview-price");

const previewDuration = document.getElementById("preview-duration");

const pageTitle = document.getElementById("page-title");

const pageDescription = document.getElementById("page-description");

let plans = [];

let editingMembershipId = new URLSearchParams(window.location.search).get("id");

const isEditMode = Boolean(editingMembershipId);

async function initialize() {
  try {
    setDefaultStartDate();

    await Promise.all([loadMembers(), loadPlans()]);

    if (isEditMode) {
      await loadMembership();
    }
  } catch (error) {
    showError(error.message);
  }
}

function setDefaultStartDate() {
  const today = new Date().toISOString().split("T")[0];

  startDateInput.value = today;
}

async function loadMembers() {
  const members = await apiRequest("/members/");

  memberSelect.innerHTML = `
        <option value="">
            Select member
        </option>
    `;

  members.forEach((member) => {
    const option = document.createElement("option");

    option.value = member.id;

    option.textContent = `${member.member_number} — ${member.first_name} ${member.last_name}`;

    memberSelect.appendChild(option);
  });
}

async function loadPlans() {
  plans = await apiRequest("/memberships/plans/");

  planSelect.innerHTML = `
        <option value="">
            Select membership plan
        </option>
    `;

  plans
    .filter((plan) => plan.is_active)
    .forEach((plan) => {
      const option = document.createElement("option");

      option.value = plan.id;

      option.textContent = `${plan.name} — ${plan.price} ETB`;

      planSelect.appendChild(option);
    });
}

function showPlanPreview() {
  const planId = Number(planSelect.value);

  const selectedPlan = plans.find((plan) => plan.id === planId);

  if (!selectedPlan) {
    planPreview.style.display = "none";

    return;
  }

  previewPlanName.textContent = selectedPlan.name;

  previewDescription.textContent =
    selectedPlan.description || "No description available.";

  previewPrice.textContent = `${selectedPlan.price} ETB`;

  previewDuration.textContent = `${selectedPlan.duration_days} days`;

  planPreview.style.display = "block";
}

async function loadMembership() {
  const membership = await apiRequest(`/memberships/${editingMembershipId}/`);

  pageTitle.textContent = "Edit Membership";

  pageDescription.textContent = "Update the membership information.";

  submitButton.textContent = "Update Membership";

  memberSelect.value = membership.member;

  planSelect.value = membership.plan;

  startDateInput.value = membership.start_date;

  showPlanPreview();
}

planSelect.addEventListener("change", showPlanPreview);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  hideMessages();

  const member = memberSelect.value;

  const plan = planSelect.value;

  const startDate = startDateInput.value;

  if (!member) {
    showError("Please select a member.");

    return;
  }

  if (!plan) {
    showError("Please select a membership plan.");

    return;
  }

  if (!startDate) {
    showError("Please select a start date.");

    return;
  }

  const payload = {
    member: member,

    plan: Number(plan),

    start_date: startDate,
  };

  try {
    submitButton.disabled = true;

    submitButton.textContent = isEditMode ? "Updating..." : "Assigning...";

    if (isEditMode) {
      await apiRequest(`/memberships/${editingMembershipId}/`, {
        method: "PATCH",

        body: JSON.stringify(payload),
      });
    } else {
      await apiRequest("/memberships/", {
        method: "POST",

        body: JSON.stringify(payload),
      });
    }

    window.location.href = "memberships.html";
  } catch (error) {
    showError(error.message);

    submitButton.disabled = false;

    submitButton.textContent = isEditMode
      ? "Update Membership"
      : "Assign Membership";
  }
});

function showError(message) {
  errorMessage.textContent = message;

  errorMessage.style.display = "block";
}

function hideMessages() {
  errorMessage.style.display = "none";

  successMessage.style.display = "none";
}

logoutButton.addEventListener("click", logout);

initialize();
