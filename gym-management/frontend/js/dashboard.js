requireAuthentication();

const totalMembers = document.getElementById("total-members");

const activeMembers = document.getElementById("active-members");

const expiredMembers = document.getElementById("expired-members");

const monthlyRevenue = document.getElementById("monthly-revenue");

const expiringMemberships = document.getElementById("expiring-memberships");

const errorMessage = document.getElementById("error-message");

async function loadDashboard() {
  try {
    const data = await apiRequest("/dashboard/");

    totalMembers.textContent = data.total_members;

    activeMembers.textContent = data.active_members;

    expiredMembers.textContent = data.expired_members;

    monthlyRevenue.textContent = `${Number(data.monthly_revenue).toLocaleString()} ETB`;

    expiringMemberships.textContent = data.expiring_memberships;
  } catch (error) {
    errorMessage.textContent = error.message;

    errorMessage.style.display = "block";
  }
}

const logoutButton = document.getElementById("logout-btn");

if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}

loadDashboard();
