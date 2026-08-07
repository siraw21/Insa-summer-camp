// const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// function getAccessToken() {
//   return localStorage.getItem("access_token");
// }

// async function apiRequest(endpoint, options = {}) {
//   const token = getAccessToken();

//   const headers = {
//     "Content-Type": "application/json",
//     ...options.headers,
//   };

//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...options,
//     headers,
//   });

//   const data = await response.json().catch(() => null);

//   if (!response.ok) {
//     throw new Error(data?.detail || "Something went wrong");
//   }

//   return data;
// }

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

function getAccessToken() {
  return localStorage.getItem("access_token");
}

function requireAuthentication() {
  const token = getAccessToken();

  if (!token) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  window.location.href = "login.html";
}

async function apiRequest(endpoint, options = {}) {
  const token = getAccessToken();

  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    logout();
    throw new Error("Your session expired.");
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data;
}

function getErrorMessage(data) {
  if (!data) {
    return "Something went wrong.";
  }

  if (data.detail) {
    return data.detail;
  }

  const firstField = Object.keys(data)[0];

  if (Array.isArray(data[firstField])) {
    return `${firstField}: ${data[firstField][0]}`;
  }

  return "Please check the submitted information.";
}
