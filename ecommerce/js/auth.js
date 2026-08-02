const USERS_KEY = "merkato-users";
const CURRENT_USER_KEY = "merkato-current-user";

function getUsers() {
  const users = localStorage.getItem(USERS_KEY);

  if (users === null) {
    return [];
  }

  return JSON.parse(users);
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function registerUser(name, email, password) {
  const users = getUsers();

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return false;
  }

  const user = {
    id: Date.now(),
    name: name,
    email: email,
    password: password,
  };

  users.push(user);

  saveUsers(users);

  return true;
}

function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    return false;
  }

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
    }),
  );

  return true;
}

function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);

  if (user === null) {
    return null;
  }

  return JSON.parse(user);
}

function isLoggedIn() {
  return getCurrentUser() !== null;
}

function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
