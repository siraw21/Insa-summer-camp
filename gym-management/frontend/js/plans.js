requireAuthentication();

const planForm = document.getElementById("plan-form");
const plansList = document.getElementById("plans-list");
const errorMessage = document.getElementById("error-message");

document.getElementById("logout-btn").addEventListener("click", logout);

async function loadPlans() {
  try {
    const plans = await apiRequest("/memberships/plans/");

    if (plans.length === 0) {
      plansList.innerHTML = `
        <div class="empty-state">
          No membership plans have been created.
        </div>
      `;
      return;
    }

    plansList.innerHTML = plans
      .map(
        (plan) => `
          <article class="plan-card">
            <div>
              <h3>${plan.name}</h3>
              <p>
                ${plan.description || "No description"}
              </p>
            </div>

            <div class="plan-meta">
              <span>${plan.duration_days} days</span>
              <strong>${plan.price} ETB</strong>
            </div>

            <span
              class="badge ${
                plan.is_active ? "badge-active" : "badge-inactive"
              }"
            >
              ${plan.is_active ? "Active" : "Inactive"}
            </span>
          </article>
        `,
      )
      .join("");
  } catch (error) {
    plansList.innerHTML = `
      <p class="alert alert-error">${error.message}</p>
    `;
  }
}

planForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  errorMessage.textContent = "";
  errorMessage.style.display = "none";

  const plan = {
    name: document.getElementById("plan-name").value.trim(),

    duration_days: Number(document.getElementById("duration-days").value),

    price: document.getElementById("price").value,

    description: document.getElementById("description").value.trim(),
  };

  try {
    await apiRequest("/memberships/plans/", {
      method: "POST",
      body: JSON.stringify(plan),
    });

    planForm.reset();
    await loadPlans();
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  }
});

loadPlans();
