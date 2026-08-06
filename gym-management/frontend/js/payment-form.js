requireAuthentication();

const form = document.getElementById("payment-form");

const memberSelect = document.getElementById("member");
const membershipSelect = document.getElementById("membership");
const amountInput = document.getElementById("amount");
const methodSelect = document.getElementById("payment-method");
const referenceInput = document.getElementById("reference-number");
const notesInput = document.getElementById("notes");

const submitButton = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const logoutButton = document.getElementById("logout-btn");

const membershipPreview = document.getElementById("membership-preview");
const previewPlanName = document.getElementById("preview-plan-name");
const previewDates = document.getElementById("preview-dates");
const previewStatus = document.getElementById("preview-status");
const previewPrice = document.getElementById("preview-price");

// Memberships for whichever member is currently selected — kept in
// memory so selecting one in the dropdown doesn't need another
// round trip to show its preview.
let memberships = [];

async function initialize() {
  try {
    await loadMembers();
  } catch (error) {
    showError(error.message);
  }
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

async function loadMembershipsForMember(memberId) {
  membershipSelect.disabled = true;
  membershipSelect.innerHTML = `<option value="">Loading...</option>`;
  membershipPreview.style.display = "none";

  try {
    memberships = await apiRequest(`/memberships/?member=${memberId}`);

    if (memberships.length === 0) {
      membershipSelect.innerHTML = `
        <option value="">This member has no memberships yet</option>
      `;
      return;
    }

    membershipSelect.innerHTML = `
      <option value="">Select membership</option>
    `;

    memberships.forEach((membership) => {
      const option = document.createElement("option");

      option.value = membership.id;

      option.textContent = `${membership.plan_name} (${membership.start_date} → ${membership.end_date}) — ${membership.status}`;

      membershipSelect.appendChild(option);
    });

    membershipSelect.disabled = false;
  } catch (error) {
    showError(error.message);
  }
}

function showMembershipPreview() {
  const membershipId = Number(membershipSelect.value);

  const selected = memberships.find(
    (membership) => membership.id === membershipId,
  );

  if (!selected) {
    membershipPreview.style.display = "none";

    return;
  }

  previewPlanName.textContent = selected.plan_name;

  previewDates.textContent = `${selected.start_date} → ${selected.end_date}`;

  previewStatus.textContent = selected.status;

  previewPrice.textContent = selected.plan_price
    ? `${selected.plan_price} ETB`
    : "—";

  // Pre-fill the amount from the plan price as a starting point —
  // the receptionist can still adjust it for partial payments.
  if (selected.plan_price && !amountInput.value) {
    amountInput.value = selected.plan_price;
  }

  membershipPreview.style.display = "block";
}

memberSelect.addEventListener("change", () => {
  amountInput.value = "";

  if (memberSelect.value) {
    loadMembershipsForMember(memberSelect.value);
  } else {
    membershipSelect.disabled = true;
    membershipSelect.innerHTML = `
      <option value="">Select member first</option>
    `;
    membershipPreview.style.display = "none";
  }
});

membershipSelect.addEventListener("change", showMembershipPreview);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  hideMessages();

  if (!membershipSelect.value) {
    showError("Please select a membership to record the payment against.");

    return;
  }

  const payload = {
    membership: membershipSelect.value,
    amount: amountInput.value,
    payment_method: methodSelect.value,
    reference_number: referenceInput.value.trim(),
    notes: notesInput.value.trim(),
  };

  try {
    submitButton.disabled = true;
    submitButton.textContent = "Recording...";

    await apiRequest("/payments/", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    window.location.href = "payments.html";
  } catch (error) {
    showError(error.message);

    submitButton.disabled = false;
    submitButton.textContent = "Record Payment";
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
