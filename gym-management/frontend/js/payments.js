requireAuthentication();

const tableBody = document.getElementById("payments-table-body");
const loading = document.getElementById("loading");
const emptyState = document.getElementById("empty-state");
const errorMessage = document.getElementById("error-message");
const paymentCount = document.getElementById("payment-count");
const logoutButton = document.getElementById("logout-btn");

async function loadPayments() {
  try {
    loading.style.display = "block";
    emptyState.style.display = "none";
    errorMessage.style.display = "none";

    const payments = await apiRequest("/payments/");

    renderPayments(payments);
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  } finally {
    loading.style.display = "none";
  }
}

function renderPayments(payments) {
  tableBody.innerHTML = "";

  paymentCount.textContent = `${payments.length} payment${payments.length === 1 ? "" : "s"}`;

  if (payments.length === 0) {
    emptyState.style.display = "block";

    return;
  }

  emptyState.style.display = "none";

  payments.forEach((payment) => {
    const row = document.createElement("tr");

    const memberName = payment.member_name || "Unknown member";
    const memberNumber = payment.member_number || "—";
    const planName = payment.plan_name || "—";

    const date = payment.payment_date
      ? new Date(payment.payment_date).toLocaleDateString()
      : "—";

    row.innerHTML = `
      <td>
        <div class="member-name">${memberName}</div>
        <div class="member-number">${memberNumber}</div>
      </td>

      <td>${planName}</td>

      <td>${Number(payment.amount).toLocaleString()} ETB</td>

      <td>${payment.payment_method}</td>

      <td>${payment.reference_number || "—"}</td>

      <td>${date}</td>

      <td>
        <div class="action-group">
          <button
            class="btn btn-danger btn-sm delete-btn"
            data-id="${payment.id}"
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
  const button = event.target.closest(".delete-btn");

  if (!button) {
    return;
  }

  await deletePayment(button.dataset.id);
});

async function deletePayment(id) {
  const confirmed = confirm("Are you sure you want to delete this payment?");

  if (!confirmed) {
    return;
  }

  try {
    await apiRequest(`/payments/${id}/`, {
      method: "DELETE",
    });

    await loadPayments();
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  }
}

logoutButton.addEventListener("click", logout);

loadPayments();
